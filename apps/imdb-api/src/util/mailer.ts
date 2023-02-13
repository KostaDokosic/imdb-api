import * as nodemailer from 'nodemailer';
import { existsSync } from 'fs';
import { join } from 'path';
import { renderFile } from 'ejs';

const transporter = nodemailer.createTransport({
  host: process.env.NX_MAIL_HOST || 'sandbox.smtp.mailtrap.io',
  port: Number(process.env.NX_MAIL_PORT),
  auth: {
    user: process.env.NX_MAIL_USER,
    pass: process.env.NX_MAIL_PASSWORD,
  },
});

const sendEmail = async (
  to: string,
  subject: string,
  fileName: string,
  data: object = {}
) => {
  const path = join(__dirname, `./assets/mails/${fileName}.ejs`);
  if (!existsSync(path))
    throw new Error(`Email template (${fileName}.ejs) not found`);

  const html = await renderFile(path, data, {
    async: true,
  });

  const mailPack = {
    from: process.env.NX_MAIL_ADDRESS,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailPack);
};

export default sendEmail;
