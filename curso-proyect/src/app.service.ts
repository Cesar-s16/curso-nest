import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! Estamos aprendiendo!';
  }

  getError(){
    return 'Error 404. Not Found';
  }
}
