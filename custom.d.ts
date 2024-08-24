// custom.d.ts
import { User } from './users/user.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
