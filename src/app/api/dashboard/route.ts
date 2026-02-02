import { NextResponse } from 'next/server';
import { authService } from '@/backend/auth/auth.service';
import { dashboardService } from '@/backend/dashboard/dashboard.service';

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

  const userId = payload.sub;

  const stats = await dashboardService.getStats(userId);
  const active_enrollments = await dashboardService.getActiveEnrollments(userId);

  return NextResponse.json({
    stats,
    active_enrollments
  });
}
