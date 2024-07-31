import { IsOptional, IsString } from 'class-validator';

export class SearchBlogDto {
  @IsString()
  @IsOptional()
  title?: string;
}
