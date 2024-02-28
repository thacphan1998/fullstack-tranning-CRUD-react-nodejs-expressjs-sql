require('dotenv').config();
import nodemailer from 'nodemailer'


let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, //true for 465, false for other posts
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"React Node Demo 👻" <phandinhthac8798@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này từ thông tin đặt lịch khám bệnh SERN demo</p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Vui lòng xác nhận các thông tin đặt lịch khám bệnh trên là đúng.</p>
            <div><a href="${dataSend.redirectLink}" target="_blank">Click here</a></div>
            <div>Xin cám ơn</div>
            `, // html body
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}