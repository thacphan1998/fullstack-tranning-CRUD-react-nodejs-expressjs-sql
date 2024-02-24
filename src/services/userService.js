import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);

        }
    })
}

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExits = await checkEmail(email);
            if (isExits) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,

                });
                if (user) {
                    // comparepassword
                    let checkPassword = await bcrypt.compareSync(password, user.password);
                    if (checkPassword) {
                        userData.errCode = 0;
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
                userData.errMessage = `Your's email isn't exist in your system. Try other email `;
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

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password'] //ko lay password
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password'] //ko lay password
                    }
                })
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUserApi = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'your email is already in used, Please try another email'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId
                })

                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'missing required'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds'
                });
            }
            else {
                resolve({
                    errCode: 1,
                    message: `User's not found`
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            let userIdDelete = await db.User;
            if (!userIdDelete) {
                resolve({
                    errCode: 2,
                    message: `the user isn't exist`
                })
            }

            await userIdDelete.destroy({
                where: { id: userId },
            });
            resolve({
                errCode: 0,
                message: `the user is delete`
            })
        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter'
                })
            } else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput },
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);

            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleLogin: handleLogin,
    getAllUsers: getAllUsers,
    createNewUserApi: createNewUserApi,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService,
}