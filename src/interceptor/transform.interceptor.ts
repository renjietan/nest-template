import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
  data: T;
}
@Injectable()
class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const url:string = context.switchToHttp().getRequest().url
        return {
          status: 200,
          data,
          message: '请求成功',
          time: new Date().getTime(),
          url,
        };
      }),
    );
  }
}

export default new TransformInterceptor();
