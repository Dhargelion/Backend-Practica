import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  allUsers(): string {
    return 'List Users!';
  }
  
  
}
