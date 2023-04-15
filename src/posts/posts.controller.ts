import {
  Body,
  Header,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  ValidationPipe,
  NotFoundException
} from '@nestjs/common';
import { CreatedPostRequest } from './posts.dto';
import { PostsService } from './posts.service';
import { UpdatedPostRequest } from './posts.dto';

@Controller('posts')
export class PostsController {
  public constructor(private readonly postsService: PostsService) {}

  @Get()
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get(':post')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async getPost(@Param('post', ParseUUIDPipe) post: string) {
    const res = await this.postsService.getPost(post);
    if (!res) {
      throw new NotFoundException({
        success: false,
        message: 'Post not found'
      });
    }
    return res;
  }

  @Post()
  @HttpCode(201)
  @Header('X-School', 'ESGI')
  public async createPost(@Body(ValidationPipe) user: CreatedPostRequest) {
    await this.postsService.createPost(user);
    return { success: true, message: 'Post created' };
  }

  @Patch(':post')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async updatePost(
    @Param('post', ParseUUIDPipe) post: string,
    @Body(ValidationPipe) body: UpdatedPostRequest
  ) {
    const res = await this.postsService.updatePost(post, body);

    if (!res.affected) {
      throw new NotFoundException({
        success: false,
        message: 'Post not found'
      });
    }
    return { success: true, message: 'Post updated' };
  }

  @Delete(':post')
  @HttpCode(200)
  @Header('X-School', 'ESGI')
  public async deletePost(@Param('post', ParseUUIDPipe) post: string) {
    const res = await this.postsService.deletePost(post);
    if (!res.affected) {
      throw new NotFoundException({
        success: false,
        message: 'Post not found'
      });
    }

    return { success: true, message: 'Post deleted' };
  }
}
