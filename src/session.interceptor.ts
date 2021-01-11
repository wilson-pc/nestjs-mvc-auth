import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
export interface Response<T> {
  data: T;
}

@Injectable()
export class SessionInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const { session } = context.switchToHttp().getRequest();

    const user = session?.passport?.user;

    return next.handle().pipe(map((data) => ({ data, user: user })));
  }
}
