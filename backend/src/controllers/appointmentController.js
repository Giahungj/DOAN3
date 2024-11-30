import { Sequelize, DataTypes } from 'sequelize';

import Doctor from '../models/doctorModel'
import Patient from '../models/patientModel'
import Specialty from '../models/specialtyModel'
import MedicalFacility from '../models/medicalFacilityModel'
import DoctorSpecialty from '../models/doctorSpecialtyModel'
import Appointment from '../models/appointmentModel'
import Users from '../models/usersModel'
import TimeSlot from '../models/timeSlotModel'

// Controller
import timeSlotController from './timeSlotController'

// Định dạng
import { formatDate } from '../utils/formatUtils'

// -----------------------------------------
const getAppointmentsPage = (req, res) => {
  return res.render('pages/appointment.ejs', { title: 'Trang lịch hẹn' })
}

// -----------------------------------------
const getAppointmentInfoPage = async(req, res) => {
  const appointment_id = await req.params.appointment_id
  const appointment = await getAppointment(appointment_id)
  return res.render('pages/appointmentInfo.ejs', { title: 'Thông tin lịch hẹn', appointmentData: appointment.appointmentData, timeSlotData: appointment.timeSlotData })
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
    })

    const totalAppointments = await Appointment.count()
    const totalPages = Math.ceil(totalAppointments / limit)

    const appointmentsData = appointments.map(app => ({
      appointment_id: app.appointment_id,
      doctor_name: app.doctor.user.name,
      approval_status: app.approval_status,
      appointment_time: formatDate(app.appointment_time),
      facility_address: app.doctor.facility.address,
      updatedAt: formatDate(app.updatedAt)
    }))

    return res.json({ appointmentsData, currentPage: page, totalPages })
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getAppointment = async(appointment_id) => {
  try {
    const appointment = await Appointment.findOne({
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
    })
    const timeSlotData = await timeSlotController.getTimeSlotList()
    // Kiểm tra nếu không tìm thấy dữ liệu
    if (!appointment) {
      return getAppointmentInfoPage()
    }
    const appointmentData = {
      ... appointment.dataValues,
      appointment_time: formatDate(appointment.appointment_time), 
      createdAt: formatDate(appointment.createdAt), 
      updatedAt: formatDate(appointment.updatedAt)
    }
    
    return { appointmentData, timeSlotData }
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
    res.redirect(`/admin/lich-hen/thong-tin/${app.appointment_id}`)
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

    return res.json({
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