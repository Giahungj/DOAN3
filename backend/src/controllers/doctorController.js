// Thiết lập Model
import Doctor from '../models/doctorModel'
import Specialty from '../models/specialtyModel'
import DoctorSpecialty from '../models/doctorSpecialtyModel'
import Appointment from '../models/appointmentModel'
import Facility from '../models/medicalFacilityModel'
import Users from '../models/usersModel'
import Patient from '../models/patientModel'
import setupAssociations from '../models/associations'

import { Sequelize, DataTypes } from 'sequelize'

// Định dạng
import { formatDate } from '../utils/formatUtils'
import { formatCurrency } from '../utils/formatUtils'

// Thiết lập mối quan hệ
setupAssociations()

const getDoctorsPage = (req, res) => {
  return res.render('pages/doctor.ejs', { title: 'Trang bác sĩ' })
}

// -----------------------------------------
const getDoctorInfoPage = async (req, res) => {
  const doctor_id = await req.query.doctor_id
  const docInfo = await getDoctorInfo(req, res, doctor_id)
  return res.render('pages/doctorInfo.ejs', { title: 'Thông tin bác sĩ', docInfo })
}

// -----------------------------------------
const getDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit
    const doctors = await Doctor.findAll({
      limit: limit,
      offset: offset,
      include: [
        {
          model: Specialty,
          through: DoctorSpecialty, 
          attributes: ['special_name'],
          as: 'specialties'
        },
        {
          model: Users,
          attributes: ['name', 'avatar'],
          as: 'user'
        },
        {
          model: Appointment,
          as: "appointments",
        }
      ]
    })

    const totalDoctors = await Doctor.count()
    const totalPages = Math.ceil(totalDoctors / limit)

    const doctorsData = doctors.map(doctor => ({
      doctor_id: doctor.doctor_id,
      licence_number: doctor.licence_number,
      introduction: doctor.introduction,
      working_schedule: doctor.working_schedule,
      price_vietnamese: formatCurrency(doctor.price_vietnamese, 'VND'),
      price_foreigners: formatCurrency(doctor.price_foreigners, 'USD'),
      work_experience: doctor.work_experience,
      education: doctor.education,
      doctor_name: doctor.user.name,
      doctor_avatar: doctor.user.avatar,
      specialties: doctor.specialties.map(specialty => ({
        special_name: specialty.special_name
      })),
    }))

    return res.json(
      {
        doctorsData,
        currentPage: page,
        totalPages
      }
    )
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getDoctorInfo = async(req, res, doctor_id) => {
  try {
    const docInfo = await Doctor.findOne({
      where: {
        doctor_id: doctor_id
      },
      include: [
        {
          model: Specialty,
          through: DoctorSpecialty,
          as: 'specialties'
        },
        {
          model: Users,
          as: 'user',
        },
        {
          model: Appointment,
          as: 'appointments',
          include: [{ 
            model: Patient, as: 'patient',
            include: [{ model: Users, as: 'user' }]
          }]
        },
        {
          model: Facility,
          as: 'facility'
        }
      ]
    })

    // Kiểm tra nếu không tìm thấy bác sĩ
    if (!docInfo) {
      return res.render('pages/doctorInfo.ejs', { title: 'Không tìm thấy bác sĩ' })
    }

    const formattedDocInfo = { ... docInfo.dataValues, 
      price_vietnamese: formatCurrency(docInfo.price_vietnamese, 'VND'),
      price_foreigners: formatCurrency(docInfo.price_foreigners, 'USD'),
      user: docInfo.user.dataValues,
      specialties: docInfo.specialties.map(spec => spec.special_name),
      appointments: docInfo.appointments.map(app => ({
        appointment_id: app.appointment_id,
        appointment_time: formatDate(app.appointment_time),
        createdAt: formatDate(app.createdAt),
        updatedAt: formatDate(app.updatedAt),
        patient: app.patient && app.patient.user && app.patient.user.name ? app.patient.user.name : ''
      }))
    }

    console.log(formattedDocInfo)

    return formattedDocInfo
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getDoctorStatistics = async (req, res) => {
  try {
    const currentDate = new Date()
    const currentDateString = currentDate.toISOString().split('T')[0]

    const totalAppointmentToDayCount = await Appointment.count({
      where: Sequelize.where(
          Sequelize.fn('DATE', Sequelize.col('appointment_time')), 
          '=', currentDateString
      ),
      approval_status: 'approved'
    })

    const approvedCount = await Appointment.count({ where: { approval_status: 'approved' } })
    const totalCount = await Doctor.count()
    const femaleCount = await Doctor.count({ where: { gender: 'Female' } })
    const maleCount = await Doctor.count({ where: { gender: 'Male' } })
    const otherCount = await Doctor.count({ where: { gender: 'Other' } })

    const femalePercentage = totalCount > 0 ? ((femaleCount / totalCount) * 100) : 0;
    const malePercentage = totalCount > 0 ? ((maleCount / totalCount) * 100) : 0;
    const otherPercentage = totalCount > 0 ? ((otherCount / totalCount) * 100) : 0;

    return res.json({
      totalDoctorsCount: totalCount,
      femalePercentage,
      malePercentage,
      otherPercentage,
      totalAppointmentToDayCount,
      approvedCount
  })
  } catch (error) {
    console.error(error)
  }
}

export default { 
    getDoctorsPage,
    getDoctorInfoPage,

    getDoctors,
    getDoctorInfo,
    getDoctorStatistics
};