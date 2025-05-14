import { IsString, IsNotEmpty, IsArray, IsOptional, IsDate } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly tags: string[];

  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;
}
