import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Blog } from '../database/entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { User } from '../database/entities/user.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
  ) {}

  async createBlog(createBlogDetails: CreateBlogDto & { email: string }) {
    const { email, title, content } = createBlogDetails;
    await this.blogRepo.save({
      title,
      content,
      user: { email },
    });
  }

  async getBlogs() {
    return this.blogRepo
      .createQueryBuilder('blog')
      .select('*')
      .innerJoinAndSelect(User, 'user', 'blog.user.id = user.id')
      .getRawMany();
  }
}
