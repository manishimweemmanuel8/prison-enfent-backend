import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Stage } from 'src/adopt/application/entities/stage.enum';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async credentialEmail(email: string, password: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject:
        'Welcome to PRISON KIDS SUPPORT SYSTEM!Your Your account was created successful ',
      template: 'credential',
      // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        email,
        password,
      },
    });
  }

  async stageEmail(email: string, stage: Stage) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Thank you for using PKS ',
      template: 'stage',
      // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        email,
        stage,
      },
    });
  }

  async leadEmail(
    email: string,
    leadName: string,
    names: string,
    phone: string,
    district: string,
    sector: string,
    cell: string,
    village: string,
    applicationId: string,
  ) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'baby behind the bars ',
      template: 'leader',
      // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        email,
        leadName,
        names,
        phone,
        district,
        sector,
        cell,
        village,
        urlLink: `http://localhost:3000/verification/form/${applicationId}`,
      },
    });
  }

  async pendingDonation(email: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Thank you for using PKS ',
      template: 'pendingDonation',
      // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        email,
      },
    });
  }

  async donationAction(email: string, status: string) {
    await this.mailerService.sendMail({
      to: email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Thank you for using PKS ',
      template: 'donationAction',
      // `.hbs` extension is appended automatically

      context: {
        // ✏️ filling curly brackets with content
        email,
        status,
      },
    });
  }
}
