import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface data<T> {
  data: T;
}

@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<data<T>> {
    console.log('response');
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          success: true,
          message: '请求成功',
        };
      }),
    );
  }
}
