import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.json';

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

// Định nghĩa model Appointment
const Appointment = sequelize.define('Appointment', {
    appointment_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    doctor_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: 'Doctor', // Bảng Doctor
            key: 'doctor_id',
        },
    },
    patient_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: 'Patient',
            key: 'patient_id',
        },
    },
    slot_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        references: {
            model: 'TimeSlot',
            key: 'slot_id',
        },
    },
    appointment_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    approval_status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'Appointment',
});

// Xuất model Appointment
export default Appointment;
