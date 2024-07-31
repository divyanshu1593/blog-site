import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Blog } from './entities/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'web-security',
      password: 'password',
      username: 'postgres',
      port: 5432,
      entities: [User, Blog],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class DatabaseModule {}
