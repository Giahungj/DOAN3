// models/doctorSpecialtyModel.js
import { Sequelize, DataTypes } from 'sequelize'
import config from '../config/config.json'

import Doctor from './doctorModel'
import Specialty from './specialtyModel'
import Users from './usersModel'
import Patient from './patientModel'

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

// Định nghĩa model DoctorSpecialty
const DoctorSpecialty = sequelize.define('DoctorSpecialty', {
    doctor_id: {
        type: DataTypes.STRING(10),
        references: {
            model: 'Doctor',
            key: 'doctor_id',
        },
    },
    special_id: {
        type: DataTypes.STRING(10),
        references: {
            model: 'Specialty',
            key: 'special_id',
        },
    },
}, {
    timestamps: false,
    tableName: 'doctorspecialty',
})

// Xuất model
export default DoctorSpecialty;
