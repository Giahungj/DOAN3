import { Sequelize, DataTypes } from 'sequelize'
import config from '../config/config.json'

import Doctor from './doctorModel'
import MedicalFacility from './medicalFacilityModel'
import DoctorSpecialty from './doctorSpecialtyModel'
import TimeSlot from './timeSlotModel'
import Appointment from './appointmentModel'
import Patient from './patientModel'
import Specialty from './specialtyModel'
import Users from './usersModel'

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

const setupAssociations =() => {
    // Liên kết Doctor và Specialty qua DoctorSpecialty
    Doctor.belongsToMany(Specialty, {
        through: DoctorSpecialty,
        foreignKey: 'doctor_id',
        as: 'specialties'
    })
    Specialty.belongsToMany(Doctor, {
        through: DoctorSpecialty,
        foreignKey: 'special_id',
        as: 'doctors'
    })

    // Liên kết giữa MedicalFacility và Doctor
    MedicalFacility.hasMany(Doctor, { 
        foreignKey: 'medical_facility_id',
        as: 'doctors' 
    })

    Doctor.belongsTo(MedicalFacility, { 
        foreignKey: 'medical_facility_id',
        as: 'facility'
    })

    // Liên kết Patient với Appointment
    Patient.hasMany(Appointment, {
        foreignKey: 'patient_id',
        as: 'appointments'
    })
    Appointment.belongsTo(Patient, {
        foreignKey: 'patient_id',
        as: 'patient'
    })

    // Liên kết Doctor với Users
    Doctor.belongsTo(Users, { 
        foreignKey: 'user_id',
        as: 'user'
     })
    Patient.belongsTo(Users, { 
        foreignKey: 'user_id', 
        as: 'user' 
    })

    // Liên kết Doctor với Appointment
    Doctor.hasMany(Appointment, {
        foreignKey: 'doctor_id',
        as: 'appointments'
    })
    Appointment.belongsTo(Doctor, {
        foreignKey: 'doctor_id',
        as: 'doctor'
    })

    // Liên kết Appointment với TimeSlot
    TimeSlot.hasMany(Appointment, {
        foreignKey: 'slot_id',
        as: 'appointments'
    })
    Appointment.belongsTo(TimeSlot, {
        foreignKey: 'slot_id',
        as: 'timeSlot'
    })
}

sequelize.sync()
    .then(() => {
        console.log('Cơ sở dữ liệu đã được đồng bộ hóa thành công.');
    })
    .catch(err => {
        console.error('Lỗi khi đồng bộ hóa cơ sở dữ liệu:', err);
    });

export default setupAssociations