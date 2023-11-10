import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      tap(() => console.log(`After... ${Date.now() - now}ms`)),
    );
  }
}
