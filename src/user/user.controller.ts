import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  HttpCode,
  Headers,
  Param,
  ForbiddenException,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { of } from 'rxjs';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';
import { Observable } from 'rxjs';
import { TestService } from 'src/test/test.service';
// import { AllExceptionFilter } from 'src/filters/any-exception.filter';

// 守卫
import { RolesGuard } from 'src/guard/roles.guard';

// 拦截器
import { LogginInterceptor } from 'src/interceptor/loggin.interceptor';
import { TimeoutInterceptor } from 'src/interceptor/timeout.interceptor';

export class UserBaseDot {
  page: number;
}

const sleep = (time) => {
  console.log('sleep');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('aaa');
    }, time);
  });
};

@Controller({ path: 'user', version: '1' })
// @UseFilters(new AllExceptionFilter()) // 控制器范围异常过滤器
@UseGuards(RolesGuard) // 控制器范围的守卫
@UseInterceptors(LogginInterceptor, TimeoutInterceptor) // 控制器范围的拦截器
export class UserController {
  constructor(
    private userService: UserService,
    private readonly testService: TestService,
  ) {}

  // 用户登录
  @Post('login')
  @HttpCode(200)
  userLogin(@Body() body, @Req() req): any {
    console.log(body);
    console.log(req);
    console.log(req.session.code);

    if (!body.code) {
      return { code: 400, message: '验证码为空' };
    }
    if (
      req.session.code.toLocaleLowerCase() === body?.code?.toLocaleLowerCase()
    ) {
      return {
        code: 200,
        message: '登录成功',
        result: { token: 'xxx', userInfo: {} },
      };
    } else {
      return { code: 400, message: '验证码错误' };
    }
  }

  // 获取图形验证码
  // 图形验证码插件 svgCaptcha
  @Get('code')
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966',
    });

    req.session.code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Get('test')
  findAll(): Observable<any[]> {
    console.log(this.testService);
    console.log(this.testService.findAll());
    return of([{ aaa: 'accc' }]);
  }

  @Post()
  @HttpCode(200)
  getUserInfo(@Body() params: UserBaseDot): any {
    console.log(params);
    // console.log(@Body())
    return { code: 200, data: params };
  }

  @Get()
  // @UseFilters(new HttpExceptionFilter()) // 方法范围异常过滤器
  async getUser1(@Query() query) {
    console.log(query);
    if (query.page == 1) {
      throw new ForbiddenException();
    }
    await sleep(4000);

    return { code: 200, m: 'aaa' };
  }

  @Get(':id')
  getUser(
    @Req() request: Request,
    @Query() baseDot: UserBaseDot,
    @Param('id', ParseIntPipe) id,
    @Headers() header,
  ) {
    console.log(baseDot);
    console.log(id);
    console.log(header);
    return { code: 200 };
  }
}
