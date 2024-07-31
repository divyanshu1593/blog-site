import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AllowUnauthorized } from '../core/decorators/allow-unauthorized.decorator';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  @AllowUnauthorized()
  async login(@Body() loginDetails: LoginDto, @Res() response) {
    const { token, userWithoutPasswordHash } =
      await this.authService.login(loginDetails);

    response
      .cookie(this.configService.get('JWT_COOKIE_NAME'), token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json({
        token,
        userWithoutPasswordHash,
      });
  }

  @Post('change-password')
  changePassword(
    @Body() changePasswordDetails: ChangePasswordDto,
    @Req() request,
  ) {
    return this.authService.changePassword({
      ...changePasswordDetails,
      email: request.user.email,
    });
  }

  @Post('logout')
  logout(@Res() response) {
    response.clearCookie(this.configService.get('JWT_COOKIE_NAME')).end();
  }
}
