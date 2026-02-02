import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-change-in-prod';
const key = new TextEncoder().encode(JWT_SECRET);

export class AuthService {
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const token = await new SignJWT({ sub: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(key);
      
    return {
      access_token: token,
      user
    };
  }

  async verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(token, key);
      return payload;
    } catch (e) {
      return null;
    }
  }

  async getUser(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async register(data: any) {
     const hashedPassword = await bcrypt.hash(data.password, 10);
     return prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            role: 'LEARNER'
        }
     });
  }
}

export const authService = new AuthService();
