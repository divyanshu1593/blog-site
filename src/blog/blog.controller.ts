import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { SearchBlogDto } from './dto/search-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  createBlog(@Body() createBlogDetails: CreateBlogDto, @Req() request) {
    return this.blogService.createBlog({
      ...createBlogDetails,
      id: request.user.id,
    });
  }

  @Get()
  getBlogs(@Query() searchDetails: SearchBlogDto) {
    return this.blogService.getBlogs(searchDetails);
  }
}
