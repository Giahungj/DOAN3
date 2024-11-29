import Patient from '../models/patientModel'
import Users from '../models/usersModel'
import Appointment from '../models/appointmentModel'

// Định dạng
import { formatDate } from '../utils/formatUtils'
import { formatCurrency } from '../utils/formatUtils'

const getPatientsPage = async(req, res) => {
    try {
      return res.render('pages/patient.ejs', { title: 'Quản lý bệnh nhân'})
    } catch (error) {
        console.error(error)
        return res.status(500).send('Đã xảy ra lỗi')
    }
}

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            limit: 8,
            include: [
                {
                    model: Users,
                    attributes: ['name', 'avatar'],
                    as: 'user'
                }
            ]
        })
        const patientsData = patients.map(patient => {
            const bnhan = patient.toJSON()
            return {
                patient_id: bnhan.patient_id,
                health_insurance_code: bnhan.health_insurance_code,
                name: bnhan.user?.name,
                avatar: bnhan.user?.avatar
            }
        })
        
        return res.json(patientsData)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
}

// -----------------------------------------
const getPatientInfoPage = async (req, res) => {
    const patient_id = await req.params.patient_id
    const patientInfo = await getPatientInfo(req, res, patient_id)
    return res.render('pages/patientInfo.ejs', { title: 'Thông tin bệnh nhân', patientInfo })
}

// -----------------------------------------
const getPatientStatistics = async (req, res) => {
    try {
      const totalCount = await Patient.count()
      console.log(totalCount)
      return res.json({
          totalPatientsCount: totalCount,
      })
    } catch (error) {
      console.error(error)
    }
  }

// -----------------------------------------
const getPatientInfo = async(req, res, patient_id) => {
    try {
      const patient = await Patient.findOne({
        where: {
            patient_id: patient_id
        },
        include: [
          {
            model: Users,
            as: 'user'
          },
          {
            model: Appointment,
            as: 'appointments'
          },
        ]
      })

      if (!patient) {
        return res.render('pages/patientInfo.ejs', { title: 'Không tìm thấy bệnh nhân' })
      }

      const patientInfo = {
        patient_id: patient.patient_id,
        age: patient.age,
        gender: patient.gender,
        health_insurance_code: patient.health_insurance_code,
        user: {
          user_id: patient.user.user_id,
          role: patient.user.role,
          gender: patient.user.gender,
          user_id: patient.user.user_id,
          phone_number: patient.user.phone_number,
          address: patient.user.address,
          citizen_id_card: patient.user.citizen_id_card,
          day_of_birth: formatDate(patient.user.day_of_birth)
        },
        appointments: patient.appointments.map(app => ({
          appointment_id: app.appointment_id,
          appointment_time: formatDate(app.appointment_time),
          createdAt: formatDate(app.createdAt),
          updatedAt: formatDate(app.updatedAt)
        }))
      }

      return patientInfo
    } catch (error) {
      console.error(error)
    }
}
export default {
    getPatientsPage,
    getPatientInfoPage,

    getPatientStatistics,

    getPatientInfo,
    getPatients
}