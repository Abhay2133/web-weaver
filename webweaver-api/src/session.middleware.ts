import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from './prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Check if session cookie exists
    let sessionId = req.cookies?.['session_id'];

    if (!sessionId) {
      // Create new session
      sessionId = uuidv4();
      
      // Set session expiration to 30 days
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      // Store session in database
      await this.prisma.session.create({
        data: {
          id: sessionId,
          expiresAt,
        },
      });

      // Set cookie (expires in 30 days)
      res.cookie('session_id', sessionId, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        sameSite: 'lax',
      });
    } else {
      // Verify session exists in database
      const session = await this.prisma.session.findUnique({
        where: { id: sessionId },
      });

      // If session doesn't exist or expired, create new one
      if (!session || (session.expiresAt && session.expiresAt < new Date())) {
        sessionId = uuidv4();
        
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await this.prisma.session.create({
          data: {
            id: sessionId,
            expiresAt,
          },
        });

        res.cookie('session_id', sessionId, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
          sameSite: 'lax',
        });
      }
    }

    // Attach sessionId to request object for use in controllers
    (req as any).sessionId = sessionId;

    next();
  }
}
