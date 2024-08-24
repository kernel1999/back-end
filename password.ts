import * as bcrypt from 'bcryptjs';
import { User } from 'users/entities/user.entity';

const saltRounds = 15;

export async function encryptPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function validatePassword(
  user: User,
  password: string,
): Promise<boolean> {
  const retorno = await bcrypt.compare(password, user.password);

  return retorno;
}
