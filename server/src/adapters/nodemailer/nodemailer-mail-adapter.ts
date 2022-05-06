import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e4010d230be13f",
    pass: "d27c0fe26c9819"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedback <oi@feedget.com>",
      to: "Walison Miranda <walison190@gmail.com>",
      subject,
      html: body,
    });
  }
}
