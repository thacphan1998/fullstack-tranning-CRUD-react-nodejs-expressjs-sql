import { reject } from "lodash";
import patientService from "../services/patientService";

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch (e) {
        reject(e);
    }
}

module.exports = {
    postBookAppointment: postBookAppointment
}