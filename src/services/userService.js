import db from '../models/index';
import bcrypt from 'bcryptjs';

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExits = await checkEmail(email);
            if (isExits) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId'],
                    where: { email: email },
                    raw: true,

                });
                if (user) {
                    // comparepassword
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 5;
                        userData.errMessage = 'ok fen';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'wrong password';
                        userData.user = user;
                    }
                }
                else {
                    userData.errCode = 2,
                        userData.errMessage = `User's not found`
                }
            }
            else {
                // return error
                userData.errCode = 1;
                userData.errMessage = `Your's email orther`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}


let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
}