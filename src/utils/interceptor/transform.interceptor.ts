import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import CommonConfig from "../config/env/common";
import { parseTime } from 'src/utils';

interface Response<T> {
  data: T;
  status: number,
  message: string,
  time: string,
  url: string
}
@Injectable()
class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T> | any> {
    return next.handle().pipe(
      map((data) => {
        const url: string = context.switchToHttp().getRequest().url;
        if(url == CommonConfig.statusMonitorConfig.path) {
          return data
        }
        return {
          status: 200,
          data,
          message: '请求成功',
          time: parseTime(new Date().getTime()),
          url,
        };
      }),
    );
  }
}

export default new TransformInterceptor();
