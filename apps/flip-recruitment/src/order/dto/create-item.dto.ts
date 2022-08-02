import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  public productId: string;

  @IsInt()
  public quantity: number;
}
