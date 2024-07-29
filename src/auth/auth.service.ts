import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async register(registerDetails: RegisterDto) {
    const { email, password } = registerDetails;

    const password_hash = await bcrypt.hash(password, 10);
    return await this.userRepo.insert({ email, password_hash });
  }
}
