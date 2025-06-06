import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User, UserStatusEnum } from '@prisma/client';
import { DbConnection } from 'src/shared/db/db.connection';

@Injectable()
export class UserRepository {
  @Inject(DbConnection)
  private $db: DbConnection;

  public async findUserById(id: string): Promise<User> {
    return this.$db.user.findUnique({
      where: { id },
      include: { userSocialMedias: true, repositories: true },
    });
  }

  public async findUserByFilter(
    filters: Partial<Prisma.UserWhereInput>,
  ): Promise<User> {
    return this.$db.user.findFirst({
      where: { ...filters },
      include: { userSocialMedias: true, repositories: true },
    });
  }
  public async findUsers(
    filters?: Partial<Prisma.UserWhereInput>,
  ): Promise<User[]> {
    const userFilters: Partial<Prisma.UserWhereInput> = filters ? filters : {};
    return this.$db.user.findMany({
      where: {
        ...userFilters,
        deletedAt: null,
      },
      include: { userSocialMedias: true, repositories: true },
    });
  }

  public async createUser(
    data: Prisma.UserUncheckedCreateInput,
  ): Promise<User> {
    return this.$db.user.create({
      data: { ...data },
      include: { userSocialMedias: true, repositories: true },
    });
  }

  public async updateUser(
    data: Partial<Prisma.UserUncheckedUpdateInput>,
  ): Promise<User> {
    return this.$db.user.update({
      where: { id: data.id as string },
      data: { ...data, deletedAt: null },
      include: { userSocialMedias: true, repositories: true },
    });
  }

  public async softDeleteUser(id: string): Promise<User> {
    return this.$db.user.update({
      where: { id },
      data: {
        status: UserStatusEnum.INACTIVE,
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
      include: { userSocialMedias: true, repositories: true },
    });
  }
}
