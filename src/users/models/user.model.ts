import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserStatusEnum } from '@prisma/client';
import { UserRepositoriesModel } from '../user-repositories/models/user-repositories.model';
import { UserSocialMediasModel } from '../user-social-media/models/user-social-medias.model';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => UserStatusEnum)
  status: UserStatusEnum;

  @Field(() => String, { nullable: true })
  phone: string | null;

  @Field(() => String, { nullable: true })
  address: string | null;

  @Field(() => String)
  cpf: string;

  @Field(() => Date)
  createdAt: Date;

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
