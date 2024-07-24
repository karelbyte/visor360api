import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { UserChangePasswordDto } from '../dtos/user.dto';
import { AppMailerService } from '../services/mailer.service';
import { UsersService } from '../services/users.service';
import { Action } from 'src/decorators/actions.decorator';

@ApiTags('Mailer service')
@Controller('mailer')
export class MailerController {
  constructor(
    private readonly mailerService: AppMailerService,
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Action('ENVIO DE MAIL CAMBIO DE CONTRASEÑA (API MAILER)')
  @HttpCode(HttpStatus.OK)
  @Post('/change-password-mail')
  @ApiOperation({ summary: 'Sending email to update password' })
  @ApiResponse({ status: 202, description: 'Correo enviado correctamente.' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontro el correo proporcionado.',
  })
  async changePassword(@Body() body: UserChangePasswordDto): Promise<any> {
    const user = await this.userService.findOneByEmail(body.email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'No se encontro el correo proporcionado.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const payload = { userId: user.id, names: user.names, rol: user.rol.code };
    const token = await this.jwtService.signAsync(payload);

    const fileImg = join(__dirname, '..', 'templates') + '/logopng.png';
    const imageData = readFileSync(fileImg).toString('base64');

    const mailData = {
      to: user.email,
      subject: 'SIGC Recuperacion de contraseña',
      text: '',
      template: join(__dirname, '..', 'templates') + '/change.password.pug',
      dataTemplate: {
        img: imageData,
        name: user.names,
        url: `${process.env.FRONT_URL_RECOVER_PASSWORD}/auth/recover-password/${token}`,
      },
    };
    await this.userService.update({ id: user.id, token: token });
    try {
      await this.mailerService.sendMail(mailData);
      return {
        message: 'Correo enviado correctamente.',
      };
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: e,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
