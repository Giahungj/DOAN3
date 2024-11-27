import { Sequelize, DataTypes } from 'sequelize'
import config from '../config/config.json'

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

// Định nghĩa model Doctor
const Doctor = sequelize.define('Doctor', {
    doctor_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    licence_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    introduction: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    working_schedule: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    price_vietnamese: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price_foreigners: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    work_experience: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    education: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    user_id: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: true,
    },
    medical_facility_id: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
}, {
        timestamps: false,
        tableName: 'doctor',
})

// Xuất model
export default Doctor
