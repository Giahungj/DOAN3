import { Sequelize, DataTypes } from 'sequelize';

import Doctor from '../../models/doctorModel'
import Patient from '../../models/patientModel'
import Specialty from '../../models/specialtyModel'
import MedicalFacility from '../../models/medicalFacilityModel'
import DoctorSpecialty from '../../models/doctorSpecialtyModel'
import Appointment from '../../models/appointmentModel'
import Users from '../../models/usersModel'
import TimeSlot from '../../models/timeSlotModel'

import timeSlotController from '../../controllers/timeSlotController'

// -----------------------------------------
const getAppointmentsPage = (req, res) => {
  res.render('pages/appointment.ejs', { title: 'Trang lịch hẹn' })
}

// -----------------------------------------
const getAppointmentInfoPage = (req, res, title, appointmentData, timeSlotData) => {
  return res.render('pages/appointmentInfo.ejs', { title: title, appointmentData, timeSlotData })
}

// ========================================================= API =========================================================
// -----------------------------------------
const getAppointments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit
    const appointments = await Appointment.findAll({
      limit: limit,
      offset: offset,
      include: [
        {
          model: Doctor,
          as: 'doctor',
          include: [
            { model: Users, as: 'user' },
            { model: MedicalFacility, as: 'facility' }
          ]
        },
        {
          model: Patient,
          as: 'patient',
          include: [{ model: Users, as: 'user' }]
        },
        { model: TimeSlot, as: 'timeSlot' }
      ],
      order: [['updatedAt', 'DESC']],
      attributes: {
        include: [
          [
            Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-%d %H:%i:%s'),
            'createdAt'
          ],
          [
            Sequelize.fn('DATE_FORMAT', Sequelize.col('updatedAt'), '%Y-%m-%d %H:%i:%s'),
            'updatedAt'
          ]
        ]
      }
    })

    const totalAppointments = await Appointment.count()
    const totalPages = Math.ceil(totalAppointments / limit)

    const appointmentsData = appointments.map(app => ({
      appointment_id: app.appointment_id,
      doctor_name: app.doctor.user.name,
      approval_status: app.approval_status,
      appointment_time: app.appointment_time,
      facility_address: app.doctor.facility.address,
    }))

    res.json({ appointmentsData, currentPage: page, totalPages })
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getAppointment = async(req, res, app_id) => {
  try {
    const appointment_id = req.params.appointment_id || app_id;
    const appointmentData = await Appointment.findOne({
      where: { appointment_id },
      include: [
        {
          model: Doctor,
          as: 'doctor',
          include: [
            { model: Users, as: 'user' },
            { model: MedicalFacility, as: 'facility' }
          ]
        },
        {
          model: Patient,
          as: 'patient',
          include: [{ model: Users, as: 'user' }]
        },
        { model: TimeSlot, as: 'timeSlot' }
      ],
      attributes: {
        include: [
          [
            Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%H:%i %d-%m-%Y'),
            'createdAt'
          ],
          [
            Sequelize.fn('DATE_FORMAT', Sequelize.col('updatedAt'), '%H:%i %d-%m-%Y'),
            'updatedAt'
          ]
        ]
      }
    })
    const timeSlotData = await timeSlotController.getTimeSlotList()
    // Kiểm tra nếu không tìm thấy dữ liệu
    if (!appointmentData) {
      return getAppointmentInfoPage(req, res, 'Không tìm thấy lịch hẹn', '', '')
    }

    return getAppointmentInfoPage(req, res, 'Thông tin lịch hẹn', appointmentData, timeSlotData)
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const updateAppointment = async(req, res) => {
  try {
    const app = req.body

    const update = await Appointment.update(
      {
        appointment_time: app.appointmentDate,
        slot_id: app.appointmentTimeSlot,
        approval_status: app.appointmentStatus,
      },
      {
        where: { appointment_id: app.appointment_id }, // Điều kiện để cập nhật
      }
    )
    const timeSlotData = await timeSlotController.getTimeSlotList()
    const appointmentData = await getAppointment(req, res, app.appointment_id)
    return getAppointmentInfoPage(req, res, 'Thông tin lịch hẹn', appointmentData, timeSlotData)
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getAppointmentStatistics = async (req, res) => {
  try {
    const totalCount = await Appointment.count()
    const approvedCount = await Appointment.count({ where: { approval_status: 'approved' } })
    const pendingCount = await Appointment.count({ where: { approval_status: 'pending' } })
    const rejectedCount = await Appointment.count({ where: { approval_status: 'rejected' } })

    res.json({
      totalAppCount: totalCount,
      approvedCount,
      pendingCount,
      rejectedCount
  })
  } catch (error) {
    console.error(error)
  }
}
// ===========================================================================================================================
export default { 
  getAppointmentsPage,
  getAppointmentInfoPage,

  getAppointments,
  getAppointment,
  updateAppointment,
  getAppointmentStatistics
}