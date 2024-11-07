import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsNumber,
  Validate,
  IsEmpty,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { MatchPassword } from 'src/decorator/matchPassword.decorator';

export class CreateUserDto {
  @ApiProperty({
    example: "Agustin",
    description: 'El nombre del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres' })
  name: string;

  @ApiProperty({
    example: "agus@mail.com",
    description: 'El correo electrónico del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener un formato válido' },
  )
  email: string;

  @ApiProperty({
    example: "Agus&1234",
    description: 'La contraseña del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)
  password: string;

  @ApiProperty({
    example: "Agus&1234",
    description: 'La confirmación de la contraseña del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'La confirmación de contraseña es obligatoria' })
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    example: 5745784,
    description: 'El número de telefoono del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  @IsNumber({}, { message: 'El número de teléfono debe ser un número' })
  phone: number;

  @ApiProperty({
    example: "Argentina",
    description: 'La dirección del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'El país es obligatorio' })
  @IsString({ message: 'El país debe ser una cadena de texto' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres' }) // se puede poner @MaxLength(20) o @MinLength(5) pero de esta forma es mas facil
  country: string;

  @ApiProperty({
    example: "calle 2345",
    description: 'La dirección del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @Length(3, 80, { message: 'La dirección debe tener entre 3 y 80 caracteres' })
  address: string;
  
  @ApiProperty({
    example:" 16",
    description: 'la Edad del Usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'la edad no puede ser nula'})
  @IsNumber({ })
  Edad: Number;

  @ApiProperty({
    example: "Buenos Aires",
    description: 'La ciudad del usuario',
    required: true,
  })
  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres' })
  city: string;

  
  @IsEmpty()
  isAdmin?: boolean;

  @IsEmpty()
  IsSuperAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
