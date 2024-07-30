import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDetails: LoginDto) {
    const { email, password } = loginDetails;

    const user = await this.userRepo
      .createQueryBuilder('user')
      .where(`user.email = '${email}'`)
      .getOne();

    if (!user) {
      throw new UnauthorizedException('incorrect email or password');
    }

    const { password_hash, ...userWithoutPasswordHash } = user;
    const isMatched = await bcrypt.compare(password, password_hash);

    if (!isMatched) {
      throw new UnauthorizedException('incorrect email or password');
    }

    const token = jwt.sign(
      userWithoutPasswordHash,
      this.configService.get('JWT_SECRET'),
      {
        expiresIn: '1d',
      },
    );

    return {
      token,
      userWithoutPasswordHash,
    };
  }

  async changePassword(
    changePasswordDetails: ChangePasswordDto & { email: string },
  ) {
    const { newPassword, email } = changePasswordDetails;
    const password_hash = await bcrypt.hash(newPassword, 10);

    return await this.userRepo.update({ email }, { password_hash });
  }
}
