import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TestModule } from 'src/test/test.module';
import { LoggerMiddleware } from '../middleware/logger.middlewarn';

@Module({
  controllers: [UserController],
  imports: [TestModule],
  providers: [UserService],
})
export class UserModule implements NestModule {
  // 局部中间件
  async configure(consumer: MiddlewareConsumer) {
    // const sleep = () => {
    //   console.log('sleep');
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('aaa');
    //     }, 5000);
    //   });
    // };
    // await sleep();
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/v1/user', method: RequestMethod.GET });
  }
}
