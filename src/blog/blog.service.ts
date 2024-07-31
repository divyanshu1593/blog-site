import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Blog } from '../database/entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UUID } from 'crypto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly blogRepo: Repository<Blog>,
  ) {}

  async createBlog(createBlogDetails: CreateBlogDto & { id: UUID }) {
    const { id, title, content } = createBlogDetails;
    const blog = this.blogRepo.create({
      title,
      content,
      user: { id },
    });

    return await this.blogRepo.save(blog);
  }

  async getBlogs() {
    return this.blogRepo.find({
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          email: true,
        },
      },
    });
  }
}
