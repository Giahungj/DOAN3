// models/userModel.js
import { Sequelize, DataTypes } from 'sequelize'
import config from '../config/config.json'

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

// Định nghĩa model Doctor
const Users = sequelize.define('Users', {
    user_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    citizen_id_card: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    day_of_birth: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: 'users',
});

// Xuất model
export default Users
