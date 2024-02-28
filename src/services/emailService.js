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
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
            <h3>Xin chào ${dataSend.patientName}!</h3>
            <p>Bạn nhận được email này từ thông tin đặt lịch khám bệnh SERN demo</p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Vui lòng xác nhận các thông tin đặt lịch khám bệnh trên là đúng.</p>
            <div><a href="${dataSend.redirectLink}" target="_blank">Nhấn vào đây</a></div>
            <div>Xin cám ơn</div>
            `
    }
    if (dataSend.language === 'en') {
        result = `
            <h3>Dear, ${dataSend.patientName}!</h3>
            <p>You received this email from SERN demo appointment information</p>
            <p>Information for scheduling medical examination:</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctors: ${dataSend.doctorName}</b></div>
            <p>Please confirm that the above medical appointment booking information is correct.</p>
            <div><a href="${dataSend.redirectLink}" target="_blank">Click here</a></div>
            <div>Thank you!</div>
            `
    }
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}