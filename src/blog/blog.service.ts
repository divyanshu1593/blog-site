import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Blog } from '../database/entities/blog.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UUID } from 'crypto';
import { SearchBlogDto } from './dto/search-blog.dto';
import { User } from '../database/entities/user.entity';

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

  async getBlogs(searchDetails: SearchBlogDto) {
    const { title } = searchDetails;

    return await this.blogRepo
      .createQueryBuilder('blog')
      .where(`blog.title like '%${title ?? ''}%'`)
      .innerJoinAndSelect(User, 'user', 'blog.user.id = user.id')
      .getRawMany();
  }
}
