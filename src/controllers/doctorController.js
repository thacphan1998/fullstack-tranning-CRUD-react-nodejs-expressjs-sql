import db from '../models/index';
import doctorService from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10
    try {
        let response = await doctorService.getTopDoctorHomeApi(+limit); //dau '+' dung de convert from number to string
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from sever'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
}