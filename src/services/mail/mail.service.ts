import { Injectable, Logger } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';

@Injectable()
export class MailService {
  private client;
  private server;
  constructor() {
    this.initServer();
  }

  private initServer() {
    const SMTPServer = require('smtp-server').SMTPServer;
    const MailParser = require('mailparser').MailParser;
    const path = require('path');
    const fs = require('fs');
    this.server = new SMTPServer({
      // NOTE(2024-09-09 10:57:12 谭人杰): 禁用ssl协议
      secure: false,
      disabledCommands: ['STARTTLS'], // NOTE(2024-09-09 10:57:32 谭人杰): 禁用ssl协议  必须设置 否则会报错
      // NOTE(2024-09-09 11:27:18 谭人杰): 邮箱验证
      onAuth(auth, session, callback) {
        console.log(
          '登录授权',
          `username:${auth.username}', 'password:${auth.password}`,
        );
        callback(null, { user: 123 }); // where 123 is the user id or similar property
      },
      // NOTE(2024-09-09 11:27:40 谭人杰): 数据接收
      onData(stream, session, callback) {
        console.log('onData', session);
        try {
          // NOTE(2024-09-09 11:27:52 谭人杰): 邮件解析
          const parser = new MailParser();
          stream.pipe(parser);

          parser.on('data', (data) => {
            console.log('===============收到消息', data);
            try {
              if (data.type === 'attachment') {
                console.log('attachment start');
                const filename = `${data.filename}`;
                const saveFilename = path.join(
                  process.cwd(),
                  new Date().getTime() +
                    filename.substring(filename.lastIndexOf('.')),
                );
                console.log('saveFileName=====================', saveFilename);
                const writeStream = fs.createWriteStream(saveFilename);
                data.content.pipe(writeStream);
                data.content.on('end', () => {
                  data.release();
                  writeStream.end();
                  console.log(
                    `attachment [${filename}] is saved to [${saveFilename}].`,
                  );
                });
              } else {
                console.log('MessageText', data);
              }
            } catch (err) {
              console.log('Error=================', err);
            } finally {
              const response = session.envelope.rcptTo.map(
                (rcpt) => '<' + rcpt.address + '> Accepted',
              );
              callback(null, response);
            }
          });
          parser.on('headers', (headers) => {
            console.log('headers', headers);
          });
        } catch (err) {
          console.log('Error', err);
        }
      },
    });

    this.server.on('error', (err) => {
      console.log('Error', err.message);
    });
    this.server.listen(25, () => {
      console.log('SMTP server listening on port 25');
    });
  }

  async send(params: MailDto) {
    const nodemailer = require('nodemailer');
    this.client = nodemailer.createTransport({
      port: 25,
      secure: false,
      disabledCommands: ['STARTTLS'],
      auth: {
        user: '3333@10.104.3.79',
        pass: '12313',
      },
    });
    this.client.verify(async function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log('授权成功！');
        try {
          const send = await this.client.sendMail({
            from: '"Test Email" test@10.104.3.79', // sender address
            to: 'someone@10.104.3.79', // list of receivers
            subject: 'Hello!', // subject line
            text: 'Hello world!', // plain text body
            html: '<p>Hello world!</p>', // HTML body
            attachments: [{
              filename: '1.txt',
              path: 'http://localhost:3001/assets/1726125440364-.md'
            }]
          });
          console.log('=======client Send=========');
          console.dir(send, { depth: null, color: true });
          console.log('=======client Send=========');
        } catch (e) {
          console.dir(e, { depth: null, color: true });
        }
      }
    }.bind(this)); //
  }
}
