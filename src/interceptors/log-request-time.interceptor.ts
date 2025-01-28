import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, lastValueFrom, map, tap } from 'rxjs';

export class LogRequestTimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let now = Date.now();
    let req: Request = context.switchToHttp().getRequest();
    console.log('Request started', req.baseUrl, req.method);

    return next.handle().pipe(
      tap((response) => {
        console.log(`Resquest has finished`, Date.now() - now, 'ms');
      }),
    );
  }
}
