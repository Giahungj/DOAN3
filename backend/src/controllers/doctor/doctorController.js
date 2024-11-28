// Thiết lập Model
import Doctor from '../../models/doctorModel'
import Specialty from '../../models/specialtyModel'
import DoctorSpecialty from '../../models/doctorSpecialtyModel'
import Appointment from '../../models/appointmentModel'
import Facility from '../../models/medicalFacilityModel'
import Users from '../../models/usersModel'
import setupAssociations from '../../models/associations'

import { Sequelize, DataTypes } from 'sequelize'

// Thiết lập mối quan hệ
setupAssociations()

const getDoctorsPage = (req, res) => {
  res.render('pages/doctor.ejs', { title: 'Trang bác sĩ' })
}

// -----------------------------------------
const getDoctorInfoPage = async (req, res) => {
  const doctor_id = await req.params.doctor_id
  const docInfo = await getDoctorInfo(req, res, doctor_id)
  console.log(docInfo)
  return res.render('pages/doctorInfo.ejs', { title: 'Thông tin bác sĩ', docInfo })
}

// -----------------------------------------
const getDoctors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 8
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
    doctors.forEach(doctor => {
      if (doctor.appointments && doctor.appointments.length > 0) {
        console.log(doctor.doctor_id)
        doctor.appointments.forEach(appointment => {
          console.table([appointment.dataValues]);
        });
      }
    });

    const doctorsData = doctors.map(doctor => ({
      doctor_id: doctor.doctor_id,
      licence_number: doctor.licence_number,
      introduction: doctor.introduction,
      working_schedule: doctor.working_schedule,
      price_vietnamese: doctor.price_vietnamese,
      price_foreigners: doctor.price_foreigners,
      work_experience: doctor.work_experience,
      education: doctor.education,
      doctor_name: doctor.user.name,
      doctor_avatar: doctor.user.avatar,
      specialties: doctor.specialties.map(specialty => ({
        special_name: specialty.special_name
      })),
    }))

    res.json(
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
          attributes: {
            include: [
              [
                Sequelize.fn('DATE_FORMAT', Sequelize.col('user.day_of_birth'), '%d-%m-%Y'),
                'day_of_birth'
              ]
            ]
          }
        },
        {
          model: Appointment,
          as: 'appointments',
          attributes: {
            include: [
              [
                Sequelize.fn('DATE_FORMAT', Sequelize.col('appointments.createdAt'), '%d-%m-%Y'),
                'createdAt'
              ],
              [
                Sequelize.fn('DATE_FORMAT', Sequelize.col('appointments.updatedAt'), '%d-%m-%Y'),
                'updatedAt'
              ]
            ]
          }
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

    const formattedDocInfo = {
      doctor_id: docInfo.doctor_id,
      licence_number: docInfo.licence_number,
      introduction: docInfo.introduction,
      working_schedule: docInfo.working_schedule,
      price_vietnamese: docInfo.price_vietnamese,
      price_foreigners: docInfo.price_foreigners,
      work_experience: docInfo.work_experience,
      education: docInfo.education,
      gender: docInfo.gender,
      user: docInfo.user,
      specialties: docInfo.specialties.map(spec => spec.special_name),
      appointments: docInfo.appointments.map(app => ({
        appointment_id: app.appointment_id,
        appointment_time: app.appointment_time,
        createdAt: app.createdAt,
        updatedAt: app.updatedAt
      }))
    }

    console.table([docInfo.dataValues])
    
    return formattedDocInfo
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getDoctorStatistics = async (req, res) => {
  try {
    const totalCount = await Doctor.count()
    const femaleCount = await Doctor.count({ where: { gender: 'Female' } })
    const maleCount = await Doctor.count({ where: { gender: 'Male' } })
    const otherCount = await Doctor.count({ where: { gender: 'Other' } })

    const femalePercentage = totalCount > 0 ? ((femaleCount / totalCount) * 100) : 0;
    const malePercentage = totalCount > 0 ? ((maleCount / totalCount) * 100) : 0;
    const otherPercentage = totalCount > 0 ? ((otherCount / totalCount) * 100) : 0;
    res.json({
      totalDoctorsCount: totalCount,
      femalePercentage,
      malePercentage,
      otherPercentage,
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