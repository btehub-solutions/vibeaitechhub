import { NextResponse } from 'next/server';
import { authService } from '@/backend/auth/auth.service';

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const payload = await authService.verifyToken(token);

  if (!payload || !payload.sub) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const user = await authService.getUser(payload.sub);
  
  if (!user) {
     return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const { password, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword);
}
