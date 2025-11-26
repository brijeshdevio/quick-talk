import type { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

const jwtService: JwtService = new JwtService({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '1h' },
});

export async function wsAuthGuard(socket: Socket): Promise<string | void> {
  const cookieToken = socket.handshake.headers.cookie?.split('=')[1];
  const authToken = socket.handshake.auth?.token as string;
  const token = extractTokenFromHeader(authToken) || cookieToken?.split(';')[0];

  if (!token) {
    socket.emit('error', 'Missing authorization token');
    return;
  }

  try {
    const payload = (await jwtService.verifyAsync(token)) as unknown as {
      sub: string;
    };
    return payload.sub;
  } catch {
    socket.emit('error', 'Invalid or expired token');
    return;
  }
}

function extractTokenFromHeader(request: string): string | undefined {
  const [type, token] = request?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}
