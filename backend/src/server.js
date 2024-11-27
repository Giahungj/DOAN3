// ---------------------------------------
// Nhập các module tích hợp sẵn của Node.js
// ---------------------------------------
import path from 'path'; 
import dotenv from 'dotenv';

// ---------------------------------------
// Nhập các thư viện bên ngoài
// ---------------------------------------
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import { Sequelize } from 'sequelize';

// ---------------------------------------
// Nhập cấu hình và các module nội bộ
// ---------------------------------------
import config from './config/config.json';
import viewEngine from './config/viewEngine';
import initWebRoutes from './routes/mainRoutes';

// ---------------------------------------
// Khởi động biến môi trường từ tệp .env
// ---------------------------------------
dotenv.config()

const app = express();
//config app
const environment = process.env.NODE_ENV || 'test';
const dbConfig = config[environment];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        logging: dbConfig.logging,
    }
)

// Kiểm tra kết nối
sequelize.authenticate()
    .then(() => {
        console.log('Đã kết nối cơ sỡ dữ liệu.');
    })
    .catch(err => {
        console.error('Chưa kết nối đựơc cơ sở dữ liệu:', err);
    });

// Sử dụng express-ejs-layouts
app.use(expressLayouts);
// Thiết lập layout mặc định
app.set('layout', 'layouts/mainLayout.ejs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;
app.listen(port, () => {
    console.log("Server is runing on port ", port);
})

export default app;