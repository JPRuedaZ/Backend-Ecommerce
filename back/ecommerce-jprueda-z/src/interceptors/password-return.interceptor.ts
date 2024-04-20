import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class PasswordRemoveInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                if(Array.isArray(data)) {
                  data = data.map(item => {
                    this.removePasswords(item);
                    return item;
                });
              } else {
                if (data && typeof data === 'object') {
                  this.removePasswords(data); 
                }
              }
              return data;
            }),
        );
      }
      //Este es un método privado que elimina los campos sensibles (password y confirmPassword) del objeto proporcionado.
      private removePasswords(data: any): void {
        delete data.password;
        delete data.confirmPassword;
        delete data.isAdmin;
    }
  }
  

   