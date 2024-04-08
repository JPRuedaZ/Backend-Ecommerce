import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class PasswordRemoveInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                if(Array.isArray(data)) {
                  data = data.map(item => {
                    delete item.password;
                    return item;
                });
              } else {
                if (data && typeof data === 'object') {
                  delete data.password; 
                }
              }
              return data;
            }),
        );
      }
    }