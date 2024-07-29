import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async register(registerDetails: RegisterDto) {
    const { email, password } = registerDetails;

    const password_hash = await bcrypt.hash(password, 10);
    try {
      return await this.userRepo.insert({ email, password_hash });
    } catch (err) {
      if (
        err.message.startsWith(
          'SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email',
        )
      ) {
        throw new ConflictException('email already registered');
      }
    }
  }
}
