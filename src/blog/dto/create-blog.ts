import { IsString, IsNotEmpty, IsOptional, IsDate } from "class-validator";

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  readonly author: string;

  @IsOptional()
  @IsDate()
  readonly createdAt: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt: Date;

  @IsNotEmpty()
   readonly userId:number
}
