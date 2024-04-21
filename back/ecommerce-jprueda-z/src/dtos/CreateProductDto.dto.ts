import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Category } from '../utils/categories.enums';

export class CreateProductDto {

  /**
   * @example 'iPhone 15'
   */

  @IsNotEmpty()
  @IsString()
  name: string;

  /**
   * @example 'celular alta gama'
   */
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * @example '200.00'
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  /**
   * @example '10'
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  /**
   * Debe ser una URL permitida
   * @example 'https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2023/12/iPhone15_Pink_PDP_Image_Position-1__MXLA.jpg'
   */
  @IsNotEmpty()
  @IsString()
  imgUrl?: string;

  /**
   * Debe ser una categoria permitida
   * @example 'smartphone'
   */
  @IsNotEmpty()
  @IsString()
  @IsEnum(Category, { message: 'Invalid category' })
  category: string;
}