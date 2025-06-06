import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateUserRepositoryDto } from './dtos/create-user-repository.dto';
import { UserRepositoriesModel } from './models/user-repositories.model';
import { CreateUserRepositoryUseCase } from './use-cases/create-user-repository.use-case';

@Resolver()
export class UserRepositoriesResolver {
  @Inject(CreateUserRepositoryUseCase)
  private readonly $create: CreateUserRepositoryUseCase;

  @UseGuards(JwtGuard)
  @Mutation(() => UserRepositoriesModel, { name: 'createUserRepository' })
  public async createUserRepository(
    @Args('data', { type: () => CreateUserRepositoryDto })
    data: CreateUserRepositoryDto,
  ): Promise<UserRepositoriesModel> {
    return this.$create.execute(data);
  }
}
