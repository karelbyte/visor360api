import { Module } from '@nestjs/common';
import { MailerController } from '../controllers/mailer.controller';
import { AppMailerService } from '../services/mailer.service';
import { UsersModule } from './users.module';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '../config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: String(process.env.MAIL_HOST),
        port: Number(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          // pass: process.env.MAIL_PASSWORD,
        },
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter({ inlineCssEnabled: true }),
        options: {
          strict: true,
        },
      },
    }),
    JwtModule.register({
      global: true,
      secret: AppConfig().appKey,
      signOptions: { expiresIn: '3h' },
    }),
    UsersModule,
  ],
  controllers: [MailerController],
  providers: [AppMailerService],
  exports: [AppMailerService],
})
export class AppMailerModule {}
