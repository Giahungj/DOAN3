import { Sequelize, DataTypes } from 'sequelize'
import config from '../config/config.json'

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(config.test.database, config.test.username, config.test.password, {
    host: config.test.host,
    dialect: config.test.dialect,
});

const MedicalFacility = sequelize.define('MedicalFacility', {
    medical_facility_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    specialty: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    working_hours: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    contact_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'medicalfacility'
})

// Xuất model
export default MedicalFacility