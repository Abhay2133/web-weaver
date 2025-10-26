import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ViewsService } from './views.service';

@Controller()
export class ViewsController {
  constructor(private viewsService: ViewsService) {}

  /**
   * API endpoint that returns view counts in JSON format
   * GET /api/views?url=/page-name
   */
  @Get('api/views')
  async getViewsJson(
    @Query('url') url: string,
    @Req() req: Request,
  ) {
    const sessionId = (req as any).sessionId;

    // Default to current path if no URL specified
    const targetUrl = url || req.path;

    // Track this page view
    await this.viewsService.trackPageView(sessionId, targetUrl);

    if (url) {
      // Get specific URL details
      const details = await this.viewsService.getViewDetails(url);
      return details;
    } else {
      // Get all view counts
      const allViews = await this.viewsService.getAllViewCounts();
      return {
        totalUrls: allViews.length,
        views: allViews,
      };
    }
  }

  /**
   * HTML endpoint that renders a simple page showing view counts
   * GET /views?url=/page-name
   */
  @Get('views')
  async getViewsHtml(
    @Query('url') url: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const sessionId = (req as any).sessionId;

    // Track this page view
    await this.viewsService.trackPageView(sessionId, '/views');

    let html = '';

    if (url) {
      // Show details for specific URL
      const details = await this.viewsService.getViewDetails(url);
      
      html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>View Stats - ${details.url}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              color: #333;
              margin-top: 0;
            }
            .stat {
              font-size: 48px;
              font-weight: bold;
              color: #007bff;
              margin: 20px 0;
            }
            .url {
              color: #666;
              font-family: monospace;
              background: #f8f9fa;
              padding: 10px;
              border-radius: 4px;
              word-break: break-all;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              text-align: left;
              padding: 12px;
              border-bottom: 1px solid #ddd;
            }
            th {
              background: #f8f9fa;
              font-weight: 600;
            }
            .back-link {
              display: inline-block;
              margin-top: 20px;
              color: #007bff;
              text-decoration: none;
            }
            .back-link:hover {
              text-decoration: underline;
            }
            .session-id {
              font-family: monospace;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📊 Page View Statistics</h1>
            <div class="url">${details.url}</div>
            <div class="stat">${details.uniqueViews}</div>
            <p>Unique ${details.uniqueViews === 1 ? 'View' : 'Views'}</p>
            
            <h2>Recent Views</h2>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Session</th>
                </tr>
              </thead>
              <tbody>
                ${details.recentViews.map(view => `
                  <tr>
                    <td>${new Date(view.viewedAt).toLocaleString()}</td>
                    <td class="session-id">${view.sessionId}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <a href="/views" class="back-link">← Back to all pages</a>
          </div>
        </body>
        </html>
      `;
    } else {
      // Show all URLs and their view counts
      const allViews = await this.viewsService.getAllViewCounts();
      
      html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>All Page Views</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              max-width: 900px;
              margin: 0 auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              color: #333;
              margin-top: 0;
            }
            .stats {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 20px;
              margin: 20px 0;
            }
            .stat-card {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 6px;
              text-align: center;
            }
            .stat-number {
              font-size: 36px;
              font-weight: bold;
              color: #007bff;
            }
            .stat-label {
              color: #666;
              margin-top: 5px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              text-align: left;
              padding: 12px;
              border-bottom: 1px solid #ddd;
            }
            th {
              background: #f8f9fa;
              font-weight: 600;
            }
            .url-link {
              color: #007bff;
              text-decoration: none;
              font-family: monospace;
            }
            .url-link:hover {
              text-decoration: underline;
            }
            .view-count {
              font-weight: 600;
              color: #28a745;
            }
            .empty-state {
              text-align: center;
              padding: 40px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📊 All Page Views</h1>
            
            <div class="stats">
              <div class="stat-card">
                <div class="stat-number">${allViews.length}</div>
                <div class="stat-label">Total Pages</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">${allViews.reduce((sum, v) => sum + v.uniqueViews, 0)}</div>
                <div class="stat-label">Total Unique Views</div>
              </div>
            </div>
            
            ${allViews.length > 0 ? `
              <table>
                <thead>
                  <tr>
                    <th>Page URL</th>
                    <th>Unique Views</th>
                  </tr>
                </thead>
                <tbody>
                  ${allViews.map(view => `
                    <tr>
                      <td>
                        <a href="/views?url=${encodeURIComponent(view.url)}" class="url-link">
                          ${view.url}
                        </a>
                      </td>
                      <td class="view-count">${view.uniqueViews}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            ` : `
              <div class="empty-state">
                <p>No page views recorded yet.</p>
                <p>Visit some pages with <code>?url=/page-name</code> to track views!</p>
              </div>
            `}
          </div>
        </body>
        </html>
      `;
    }

    res.type('text/html').send(html);
  }
}
