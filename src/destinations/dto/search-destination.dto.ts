import { IsNotEmpty, MinLength } from 'class-validator';

export class SearchDto {
  @IsNotEmpty({ message: '검색어를 입력해주세요.' })
  @MinLength(2, { message: '검색어는 최소 2글자 이상이어야 합니다.' })
  q: string;
}
