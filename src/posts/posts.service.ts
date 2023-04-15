import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { CreatedPostRequest } from './posts.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { UpdatedPostRequest } from './posts.dto';

@Injectable()
export class PostsService {
  public constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>
  ) {}

  public async getPosts() {
    return await this.postRepository.find();
  }

  public async getPost(id: string): Promise<Post> {
    return await this.postRepository.findOneBy({ id });
  }

  public async createPost(post: CreatedPostRequest) {
    try {
      return await this.postRepository.insert(post);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  public async updatePost(id: string, updatedPost: UpdatedPostRequest) {
    try {
      return await this.postRepository.update({ id }, updatedPost);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  public async deletePost(id: string) {
    try {
      return await this.postRepository.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
