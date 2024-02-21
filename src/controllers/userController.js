import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 0,
            message: 'error',
        })
    }
    let userData = await userService.handleLogin(email, password);
    // check email
    // return userInfo
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}

module.exports = {
    handleLogin: handleLogin,

}