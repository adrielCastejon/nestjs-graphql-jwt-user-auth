import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserStatusEnum } from '@prisma/client';
import { UserRepositoriesModel } from '../user-repositories/models/user-repositories.model';
import { UserSocialMediasModel } from '../user-social-media/models/user-social-medias.model';

@ObjectType()
export class UserResponseModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  phone: string | null;

  @Field(() => String, { nullable: true })
  address: string | null;

  @Field(() => UserStatusEnum)
  status: UserStatusEnum;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  cpf: string;

  @Field(() => String, { nullable: true })
  photoUrl: string | null;

  @Field(() => Date, {
    nullable: true,
    description:
      'This field will only be available after the first record update',
  })
  updatedAt: Date | null;

  @Field(() => Date, {
    nullable: true,
  })
  deletedAt: Date | null;

  @Field(() => [UserSocialMediasModel], { nullable: true })
  userSocialMedias?: UserSocialMediasModel[];

  @Field(() => [UserRepositoriesModel], { nullable: true })
  repositories?: UserRepositoriesModel[];
}
