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

let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.editUserById(userId);
        console.log(userData)
        return res.render('editCRUD.ejs', {
            user: userData,
        });
    }
    else {
        return res.send('blabla')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUser(data);
    return res.render('showAllUsers.ejs', {
        dataTable: allUsers,
    });
}



module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,

}