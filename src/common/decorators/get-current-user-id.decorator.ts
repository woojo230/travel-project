import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    return request.user['sub']; // Passport가 담아준 sub(id) 반환
  },
);

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user; // 인자가 없으면 user 객체 전체 반환
    return request.user[data]; // 인자가 있으면(예: 'refreshToken') 해당 필드만 반환
  },
);
