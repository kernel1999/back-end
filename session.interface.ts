// session.interface.ts
import { SessionData } from 'express-session';

export interface CustomSession extends SessionData {
  userId?: number;
  credits?: number;
}
