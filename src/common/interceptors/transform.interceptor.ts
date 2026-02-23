import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Las respuestas que ya tienen 'data' o 'meta' (paginadas) se pasan sin envolver
export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // Si es null/undefined (204) lo dejamos pasar
        if (data === null || data === undefined) return data;
        // Si ya tiene estructura paginada no envolvemos
        if (data && typeof data === 'object' && 'meta' in data) return data;
        return { data };
      }),
    );
  }
}
