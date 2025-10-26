# Public Directory

This directory contains static assets that are served by the NestJS application.

## Files

- `index.html` - The main landing page for WebWeaver

## Usage

All files in this directory are automatically served as static assets by NestJS.

To access files:
- `http://localhost:3000/index.html` or just `http://localhost:3000/`
- Any other static files placed here will be accessible at their relative path

## Adding New Static Assets

You can add the following types of files here:
- HTML files
- CSS files
- JavaScript files
- Images (png, jpg, svg, etc.)
- Fonts
- Other static resources

The static file serving is configured in `src/main.ts` using:
```typescript
app.useStaticAssets(join(__dirname, '..', 'public'));
```
