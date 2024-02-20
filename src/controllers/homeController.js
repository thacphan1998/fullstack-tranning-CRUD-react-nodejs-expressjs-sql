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

// Create CRUD 

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message);
    return res.send('okokok from server');
}

// Read CRUD
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render('showAllUsers.ejs', {
        dataTable: data,
    });
}



module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,

}