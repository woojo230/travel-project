import { IsEmpty, IsString } from 'class-validator';

export class CreateBucketListDto {
  @IsString()
  @IsEmpty()
  name: string;
}
