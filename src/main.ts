import { NestFactory } from '@nestjs/core';
import { HttpException, HttpStatus, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { Response } from './common/response';
import { AllExceptionFilter } from 'src/filters/any-exception.filter';
import 'reflect-metadata';

const whiteList = ['/api/v1/user/test'];

function middlewareAll(req, res, next) {
  // const url = req.originalUrl.
  // const urlSearchParams = new URL(req.originalUrl);
  // console.log(urlSearchParams);

  let requestUrl = req.originalUrl;
  if (req.originalUrl.includes('?')) {
    const index = requestUrl.indexOf('?');
    requestUrl = requestUrl.substring(0, index);
  }
  console.log('握手全局的', whiteList.includes(requestUrl));
  if (!whiteList.includes(requestUrl)) {
    next();
  } else {
    throw new HttpException(
      {
        message: '无权限操作',
        status: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/');

  // RESTful 版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    session({
      secret: 'XiaoLan',
      name: 'xm.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  // 全局中间件
  app.use(middlewareAll);

  // 全局范围异常过滤器
  app.useGlobalFilters(new AllExceptionFilter());

  // 规范响应参数格式
  app.useGlobalInterceptors(new Response());
  await app.listen(3000);
}
bootstrap();
