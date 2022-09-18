const imaps = require('imap-simple');
const nodemailer = require("nodemailer");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const simpleParser = require('mailparser').simpleParser;
const appRootDir = require('app-root-dir').get();
const _ = require('lodash');
const fs = require('fs');

class IMAPEmail {
    public async getEmailWithSubject(emailId:string,emailPassword: string,subject: string, markSeen?: boolean) {
        let config = {
            imap: {
                user:emailId,
                password: emailPassword,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                tlsOptions: { rejectUnauthorized: false },
                authTimeout: 90000
            }
        };
        let connection = await imaps.connect(config);
        let seen = markSeen ? markSeen : false;
        return new Promise((resolve, reject) => {
            connection.openBox('Inbox').then(async function() {
                let searchCriteria = [
                    'UNSEEN',['SUBJECT',subject]
                ];
                let fetchOptions = {
                    bodies: ['HEADER', 'TEXT',''],
                    markSeen: markSeen
                }
                let res = await connection.search(searchCriteria, fetchOptions);
                let out = '';
                
                if(res.length !== 0) {
                    console.log('Lenght:' + res.length);
                    let all = _.find(res[0].parts, { "which": "" })
                    let id = res[0].attributes.uid;
                    let idHeader = "Imap-Id: "+id+"\r\n";
                    let sdata = await simpleParser(idHeader+all.body);
                    console.log(sdata.html);
                    connection.end();
                    resolve(sdata.html);
                    
                } else {
                    connection.end();
                    resolve('');
                }
                
            }).catch(function(error:any) {
                console.log(error);
                connection.end();
                resolve('');
            })
            
        });
    }

    public async getEmailContentUsingSubject(emailId:string,emailPassword:string,subject:string) {
        let config = {
            imap: {
                user:emailId,
                password: emailPassword,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                tlsOptions: { rejectUnauthorized: false },
                authTimeout: 9000
            }
        };
        let connection = await imaps.connect(config);
        return new Promise((resolve, reject) => {
            connection.openBox('Inbox').then(async function() {
                let searchCriteria = [
                    'UNSEEN',['SUBJECT',subject]
                ];
                let fetchOptions = {
                    bodies: ['HEADER', 'TEXT'],
                    markSeen: false
                }
                let res = await connection.search(searchCriteria, fetchOptions);
                let out = res.length !== 0 ? res[0].parts[1].body.from[0]:'';
                connection.end();
                resolve(out);
            }).catch(function(error:any) {
                console.log(error);
                connection.end();
                resolve('');
            })
            
        });
    }

    public async waitTime(seconds: number) {
        const start = new Date().getTime();
        let end = start;
        while (end < start + seconds * 1000) {
            end = new Date().getTime();
        }
    }

    public async waitFromEmailAndReturnHtml(emailId: string,emailPassword: string,subject: string, markSeen?: boolean) {
        let seen = markSeen ? markSeen : false;
        let res = await this.getEmailWithSubject(emailId,emailPassword,subject,seen);
        for(let iCount = 0; iCount < 10; iCount++) {
            if(res !== '') {
                return res;
            }
            await this.waitTime(12);
            res = await this.getEmailWithSubject(emailId,emailPassword,subject,seen);
        }
        return res;
    }

    public async waitAndGetEmaiContent(emailId:string,emailPassword: string,subject:string) {
        let res = await this.getEmailContentUsingSubject(emailId,emailPassword,subject);
        for(let iCount = 0; iCount < 10; iCount++) {
            if(res !== '') {
                return res;
            }
            await this.waitTime(12);
            res = await this.getEmailContentUsingSubject(emailId,emailPassword,subject);
        }
        return res;
    }
    

    public async sendSmtpEmail(fromEmail: string,password:string, toEmail:string,subject:string,EmailContent:string){

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: fromEmail, // generated ethereal user
              pass: password, // generated ethereal password
            },
          });

          let info = await transporter.sendMail({
            from: fromEmail, // sender address
            to: toEmail, // list of receivers
            subject:subject, // Subject line
            text: EmailContent, // plain text body
            // html: "<b>Hello world?</b>", // html body
          });
          console.log(info.accepted.join(','))
          return info.accepted.join(',');
    }

    async verifyEmail(emailId: string,emailPassword: string,subject: string) {
        let htmlData = await this.waitFromEmailAndReturnHtml(emailId, emailPassword,subject,true);
        const fileName = appRootDir + '/file12.html';
        await fs.writeFileSync(fileName, htmlData);
        console.log("done");
        // get link using cheerio
        // let resFile: string = fs.readFileSync(fileName);
        let link = await this.getLinkFromHtml(htmlData, 'Verify Email');
        console.log(link);
        // click link using puppeteer
        await this.clickLinkPupeeter(link);
        await this.waitTime(2);
    }

    public async getLinkFromHtml1(html:any,linkText: string) {
        
        let link = '';
        const htmlData = await cheerio.load(html, {
            normalizeWhitespace: true,
            decodeEntities: true,
        });
        return new Promise((resolve, reject) =>{
            htmlData("a").each((i:any, link:any) => {
                const href = link.attribs["href"];
                if (link.childNodes[0].data) {
                    console.log('Link Data');
                    console.log(link.childNodes[0].data);
                    if (link.childNodes[0].data.includes(linkText)){
                        link = href;
                        console.log('Found');
                        resolve(link);
                    }
                }
            });
        });
        // let obj = await htmlData("a");
        
        
    }

    public async getLinkFromHtml(html:any,linkText: string) {
        const htmlData = await cheerio.load(html, {
            normalizeWhitespace: true,
            decodeEntities: true,
        });
        let data = await htmlData("a");
        let href = ''
        for(let i=0 ; i < data.length; i++) {
            href = await data[i].attribs["href"];
            console.log('href:' + href);
            if(await data[i].childNodes[0].data.includes(linkText)){
                console.log('Found');
                break;
            }
        }
        return href;
    }

    public async clickLinkPupeeter(link: any) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(link);
    }
}

export default new IMAPEmail();
