import express from 'express'
import homeController from '../controllers/homeController'
import adminRoute from './adminRoute.js'

import APIRoute from './api/APIRoute'
// import { render } from 'ejs'

const router = express.Router()

let initWebRoutes = (app) => {
    // -----------------------------------------
    app.use("/", router)
    
    // -----------------------------------------
    router.use("/admin", adminRoute)

    // -----------------------------------------
    router.use("/api", APIRoute)

    // -----------------------------------------
    // router.get("/admin/*", homeController.get404Page)
    // router.get("/api/*", homeController.get404Page)

    // -----------------------------------------
}

export default initWebRoutes