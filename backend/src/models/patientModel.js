// models/userModel.js
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.json';

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

// Định nghĩa model Patient
const Patient = sequelize.define('Patient', {
    patient_id: {
        type: DataTypes.STRING(10), // tương ứng với varchar(10)
        allowNull: false,
        primaryKey: true, // nếu patient_id là khóa chính
    },
    health_insurance_code: {
        type: DataTypes.STRING(10), // tương ứng với varchar(10)
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING(10), // tương ứng với varchar(10)
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER, // tương ứng với varchar(10)
        allowNull: true,
    },
    medical_facility_id: {
        type: DataTypes.STRING(10), // tương ứng với varchar(10)
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: 'patient',
});


// Xuất model
export default Patient;
