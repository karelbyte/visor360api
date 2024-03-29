import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as pug from 'pug';

@Injectable()
export class AppMailerService {
  constructor(private readonly mailerMain: MailerService) {}

  async sendMail(dataMailer: any): Promise<any> {
    const render = this._bodyTemplate(
      dataMailer.template,
      dataMailer.dataTemplate,
    );
    await this._processSendEmail(
      dataMailer.to,
      dataMailer.subject,
      dataMailer.text,
      render,
    );
  }

  _bodyTemplate(template: string, data: any) {
    return pug.renderFile(template, { data });
  }

  async _processSendEmail(
    to: string,
    subject: string,
    text: string,
    body: string,
  ): Promise<void> {
    await this.mailerMain.sendMail({
      to: to,
      cc: 'karelpuerto78@gmail.com',
      subject: subject,
      text: text,
      html: body,
    });
  }
}
