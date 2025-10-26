import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ViewsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Track a page view for a session and URL
   * Only creates a new PageView if this session hasn't viewed this URL before
   */
  async trackPageView(sessionId: string, url: string): Promise<void> {
    try {
      await this.prisma.pageView.create({
        data: {
          url,
          sessionId,
        },
      });
    } catch (error) {
      // If the unique constraint fails, it means this session already viewed this page
      // We can safely ignore this error
    }
  }

  /**
   * Get unique view count for a specific URL
   */
  async getUniqueViewCount(url: string): Promise<number> {
    return this.prisma.pageView.count({
      where: { url },
    });
  }

  /**
   * Get all URLs with their unique view counts
   */
  async getAllViewCounts(): Promise<{ url: string; uniqueViews: number }[]> {
    const groupedViews = await this.prisma.pageView.groupBy({
      by: ['url'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    return groupedViews.map((view) => ({
      url: view.url,
      uniqueViews: view._count.id,
    }));
  }

  /**
   * Get view details for a specific URL including recent views
   */
  async getViewDetails(url: string) {
    const uniqueViews = await this.getUniqueViewCount(url);
    
    const recentViews = await this.prisma.pageView.findMany({
      where: { url },
      orderBy: { viewedAt: 'desc' },
      take: 10,
      select: {
        viewedAt: true,
        sessionId: true,
      },
    });

    return {
      url,
      uniqueViews,
      recentViews: recentViews.map(v => ({
        viewedAt: v.viewedAt,
        sessionId: v.sessionId.substring(0, 8) + '...', // Partial session ID for privacy
      })),
    };
  }
}
