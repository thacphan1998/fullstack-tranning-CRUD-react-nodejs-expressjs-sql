import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/about-us', homeController.getAboutPage);

    router.get('/crud', homeController.getCRUD);

    router.post('/post-crud', homeController.postCRUD);

    // get CRUD (read)
    router.get('/get-crud', homeController.displayGetCRUD);
    // edit CRUD
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);
    // Delete CRUD
    router.get('/delete-crud', homeController.deleteCRUD);

    return app.use("/", router);
}

module.exports = initWebRoutes;