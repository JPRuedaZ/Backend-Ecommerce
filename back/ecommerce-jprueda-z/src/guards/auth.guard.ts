import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.header('Authorization');
    
    if (!auth) return false;

  const credentials = auth.split(' ')[1];
  const decodedCredentials = Buffer.from(credentials, 'base64').toString(
    'utf-8',
  );
  const [username, password] = decodedCredentials.split(':');

  if (!username || !password) return false;

  console.log(username, password);
  

    return true;
  }
}