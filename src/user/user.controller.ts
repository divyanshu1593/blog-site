import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { AllowUnauthorized } from '../core/decorators/allow-unauthorized.decorator';

@Controller('user')
export class UserController {
  authService: any;
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @AllowUnauthorized()
  register(@Body() registerDetails: RegisterDto) {
    return this.userService.register({
      ...registerDetails,
    });
  }
}
