// models/timeSlotModel.js
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.json';

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

// Định nghĩa model TimeSlot
const TimeSlot = sequelize.define('TimeSlot', {
    slot_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'TimeSlots',
});

// Xuất model
export default TimeSlot;
