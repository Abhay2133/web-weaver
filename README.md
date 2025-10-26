# 🕸️ WebWeaver

**A modern no-code full stack website builder**

WebWeaver is a powerful platform that enables you to create, manage, and deploy full-stack websites without writing a single line of code. Built with cutting-edge technologies like NestJS, Prisma, and TypeScript, it combines ease of use with enterprise-grade performance and security.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![NestJS](https://img.shields.io/badge/NestJS-11.0-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![Prisma](https://img.shields.io/badge/Prisma-5.9-2D3748.svg)

## ✨ Features

- 🎨 **Visual Builder** - Drag and drop interface for intuitive website creation
- ⚡ **Lightning Fast** - Built on NestJS for optimal performance
- 🔒 **Secure by Default** - Session management and authentication built-in
- 📱 **Responsive Design** - Mobile-first approach for all devices
- 🗄️ **Database Integration** - Powered by Prisma ORM with PostgreSQL/MySQL support
- 🚀 **Easy Deployment** - Docker support and one-click deployment
- 🎯 **Production Ready** - Enterprise-grade architecture and best practices
- 🔄 **Session Tracking** - Built-in session and view tracking
- 📊 **Analytics Ready** - Track user interactions and page views

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL or MySQL database
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhay2133/web-weaver.git
   cd web-weaver
   ```

2. **Navigate to the API directory**
   ```bash
   cd webweaver-api
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure your database connection:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/webweaver"
   PORT=3000
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

6. **Start the development server**
   ```bash
   npm run start:dev
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:3000` to see the landing page!

## 🏗️ Project Structure

```
web-weaver/
├── webweaver-api/          # NestJS API Backend
│   ├── src/
│   │   ├── main.ts         # Application entry point
│   │   ├── app.module.ts   # Root module
│   │   ├── app.controller.ts   # Landing page controller
│   │   ├── app.service.ts      # Landing page service
│   │   ├── views.controller.ts # Views API controller
│   │   ├── views.service.ts    # Views service
│   │   ├── session.middleware.ts # Session middleware
│   │   ├── prisma.service.ts   # Prisma service
│   │   └── entities/           # Database entities
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/     # Database migrations
│   ├── test/               # Test files
│   └── package.json        # Dependencies
├── docker-compose.yml      # Docker configuration
└── README.md              # This file
```

## 📚 API Documentation

### Endpoints

#### `GET /`
Returns the modern landing page with project information.

#### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-26T12:00:00.000Z"
}
```

#### Views API
Additional endpoints for tracking views and sessions are available in the `/views` controller.

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start in debug mode

# Production
npm run build              # Build the application
npm run start:prod         # Start in production mode

# Testing
npm test                   # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Generate coverage report
npm run test:e2e           # Run end-to-end tests

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations
npm run prisma:studio      # Open Prisma Studio
npm run prisma:seed        # Seed the database
npm run prisma:reset       # Reset database

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

## 🗄️ Database Schema

WebWeaver uses Prisma ORM with the following models:

- **View** - Tracks page views
- **Session** - Manages user sessions

See `webweaver-api/prisma/schema.prisma` for the complete schema definition.

## 🐳 Docker Deployment

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | - |
| `PORT` | Application port | `3000` |

## 📖 Documentation

- [Session Tracking](webweaver-api/SESSION_TRACKING.md) - Details about session management
- [API Documentation](webweaver-api/README.md) - API-specific documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Abhay Kumar**
- GitHub: [@Abhay2133](https://github.com/Abhay2133)
- Repository: [web-weaver](https://github.com/Abhay2133/web-weaver)

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/) - A progressive Node.js framework
- Database management by [Prisma](https://www.prisma.io/) - Next-generation ORM
- Powered by [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

## 📊 Tech Stack

- **Backend Framework:** NestJS 11.0
- **Language:** TypeScript 5.7
- **ORM:** Prisma 5.9
- **Database:** PostgreSQL/MySQL
- **Session Management:** express-session
- **Testing:** Jest
- **Linting:** ESLint + Prettier

## 🚦 Roadmap

- [ ] Visual drag-and-drop editor
- [ ] Component library
- [ ] Template marketplace
- [ ] User authentication system
- [ ] Admin dashboard
- [ ] Real-time collaboration
- [ ] Export to static HTML
- [ ] Custom domain support
- [ ] SEO optimization tools
- [ ] Analytics dashboard

## 💡 Support

If you encounter any issues or have questions:

1. Check the [documentation](webweaver-api/README.md)
2. Search [existing issues](https://github.com/Abhay2133/web-weaver/issues)
3. Create a [new issue](https://github.com/Abhay2133/web-weaver/issues/new)

---

Made with ❤️ by [Abhay Kumar](https://github.com/Abhay2133)