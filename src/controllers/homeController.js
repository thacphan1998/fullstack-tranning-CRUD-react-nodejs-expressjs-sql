import db from '../models/index';
import CRUDService, { createNewUser } from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data)

        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)

    }

}

let getAboutPage = (req, res) => {
    return res.render('aboutPage.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    await CRUDService.createNewUser(req.body)
    return res.send('okokok from server');
}



module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,

}