import db from '../models/index';
require('dotenv').config();
import emailService from './emailService'

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })

            } else {

                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    patientName: 'Phan Thac FaTa',
                    time: '8:00 - 9:00 chủ nhật 10/03/2024',
                    doctorName: 'Quân',
                    redirectLink: 'https://www.facebook.com/thacphan.fata'
                })

                //update patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                });

                // create a booking record

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }

                    })
                }

                resolve({
                    errCode: 0,
                    message: 'Save infor patient succeed'
                })



            }


        } catch (e) {
            return res.status(200).json({
                errCode: -1,
                message: 'Error from the server'
            })
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}