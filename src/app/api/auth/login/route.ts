import { NextResponse } from 'next/server';
import { authService } from '@/backend/auth/auth.service';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body; // Frontend sends 'username' (which is email) and 'password'

    const user = await authService.validateUser(username, password);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const data = await authService.login(user);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
