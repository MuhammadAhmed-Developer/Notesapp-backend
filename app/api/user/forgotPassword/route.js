import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"
export  async function POST(req){
    const body =await req.json()
        const {email, code} = body

        const updatedUserWithCode =  await db.user.update({
          where: { email:email },
          data:{
            verifyKey:code
          }
            

        })

        if(updatedUserWithCode){
          
                  const transporter = nodemailer.createTransport({
                      service: 'gmail',
                      auth: {
                        user: "ahmad6600575@gmail.com",
                        pass: "erkuojlcjnxsxjms",
                      },
                    });
                    
          
                    let mailOptions ={
                      from: 'ahmad6600575@gmail.com', // sender address
                      to: email, // list of receivers
                      subject: "Email Varification", // Subject line
                      text: `Hi your verification code is ${code}`, // plain text body
                    }
          
                    await transporter.sendMail(mailOptions)

        }


      return  NextResponse.json({message:"email Send"}, {status:201})
}