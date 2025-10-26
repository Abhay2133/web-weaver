# Session Tracking & Page View Analytics

## Overview
This system tracks anonymous users using session cookies and provides unique page view counts.

## Features
- ✅ Anonymous user tracking with secure session cookies
- ✅ Unique page view counting (one view per session per URL)
- ✅ Session expiration (30 days)
- ✅ Two endpoints: JSON API and HTML interface
- ✅ Prisma-based data persistence (SQLite/PostgreSQL)

## Database Schema

### Session Model
Tracks anonymous user sessions with UUID identifiers.

```prisma
model Session {
  id        String     @id @default(uuid())
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  expiresAt DateTime?
  pageViews PageView[]
}
```

### PageView Model
Tracks unique page views with session association.

```prisma
model PageView {
  id        Int      @id @default(autoincrement())
  url       String
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  viewedAt  DateTime @default(now())

  @@unique([url, sessionId])  // Ensures one view per session per URL
  @@index([url])
}
```

## API Endpoints

### 1. JSON API Endpoint
**GET** `/api/views`

Returns view statistics in JSON format.

**Query Parameters:**
- `url` (optional): Specific URL to get details for

**Examples:**

Get all page views:
```bash
curl http://localhost:3000/api/views
```

Response:
```json
{
  "totalUrls": 3,
  "views": [
    { "url": "/home", "uniqueViews": 25 },
    { "url": "/about", "uniqueViews": 15 },
    { "url": "/contact", "uniqueViews": 8 }
  ]
}
```

Get specific page details:
```bash
curl http://localhost:3000/api/views?url=/home
```

Response:
```json
{
  "url": "/home",
  "uniqueViews": 25,
  "recentViews": [
    {
      "viewedAt": "2025-10-26T17:30:00.000Z",
      "sessionId": "abc12345..."
    }
  ]
}
```

### 2. HTML Interface Endpoint
**GET** `/views`

Renders a beautiful HTML page showing view statistics.

**Query Parameters:**
- `url` (optional): Specific URL to get details for

**Examples:**

View all pages:
```
http://localhost:3000/views
```

View specific page stats:
```
http://localhost:3000/views?url=/home
```

## How It Works

### 1. Session Cookie
When a user visits for the first time:
- A UUID session ID is generated
- Stored in database with 30-day expiration
- Set as httpOnly cookie for security

### 2. Page View Tracking
On each request:
- SessionMiddleware ensures valid session exists
- Controllers track page views via ViewsService
- Unique constraint prevents duplicate views per session

### 3. View Counting
- Each session can only view a URL once
- Total views = count of unique sessions per URL
- Provides accurate "unique visitor" metrics

## Testing

Start the server:
```bash
npm run start:dev
```

Test JSON API:
```bash
# Track a view
curl -c cookies.txt http://localhost:3000/api/views?url=/test-page

# Check the stats
curl -b cookies.txt http://localhost:3000/api/views?url=/test-page
```

Test HTML interface:
```
Open browser: http://localhost:3000/views
```

## Architecture

```
┌─────────────────────────────────────────┐
│          Incoming Request               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      SessionMiddleware                  │
│  - Check/create session cookie          │
│  - Validate session in DB               │
│  - Attach sessionId to request          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      ViewsController                    │
│  - /api/views (JSON)                    │
│  - /views (HTML)                        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      ViewsService                       │
│  - trackPageView()                      │
│  - getUniqueViewCount()                 │
│  - getAllViewCounts()                   │
│  - getViewDetails()                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      PrismaService                      │
│  - Database operations                  │
└─────────────────────────────────────────┘
```

## Files Created

- `prisma/schema.prisma` - Database schema with Session & PageView models
- `src/session.middleware.ts` - Session cookie management
- `src/views.service.ts` - Business logic for view tracking
- `src/views.controller.ts` - API endpoints (JSON & HTML)
- `src/app.module.ts` - Updated with middleware and providers
- `src/main.ts` - Added cookie-parser

## Privacy & Security

- ✅ Session IDs are UUIDs (not personally identifiable)
- ✅ Cookies are httpOnly (prevents XSS attacks)
- ✅ No personal data collected
- ✅ Sessions expire after 30 days
- ✅ Partial session IDs shown in UI for privacy

## Database Migration

The migration `20251026174413_add_sesions` was created and applied:
- Created `Session` table
- Created `PageView` table
- Set up foreign key relationship
- Added unique constraint for URL + Session
- Added index on URL for performance

## Next Steps

To track views on your pages, simply make requests to either endpoint with the URL you want to track:

```javascript
// Track a page view
fetch(`/api/views?url=${window.location.pathname}`);
```

The session cookie will be automatically handled by the middleware!
