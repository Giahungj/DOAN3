// models/specialtyModel.js
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.json';

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

// Định nghĩa model Specialty
const Specialty = sequelize.define('Specialty', {
    special_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    special_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    special_image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: 'Specialty',
});

// Xuất model
export default Specialty;
