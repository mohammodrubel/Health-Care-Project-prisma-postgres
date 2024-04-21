
import nodemailer from 'nodemailer'

const email__sender = async(email:string,html:string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.FORGATE_EMAIL,
          pass: process.env.FORGATE_EMAIL_PASSWORD,
        },
        tls:{
            rejectUnauthorized:false
        }
      });
     
        const info = await transporter.sendMail({
          from: '"Health Care" <mohammodrubel007@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Password Rest Token", // Subject line
          html
        });
      
      
    
}

export default email__sender