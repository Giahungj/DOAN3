import Patient from '../../models/patientModel'
import Users from '../../models/usersModel'
import Appointment from '../../models/appointmentModel'

const getPatientsPage = async(req, res) => {
    try {
        res.render('pages/patient.ejs', { title: 'Quản lý bệnh nhân'})
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
        
        res.json(patientsData)
    } catch (error) {
        res.status(500).json({ message: error.message })
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
      res.json({
          totalPatientsCount: totalCount,
      })
    } catch (error) {
      console.error(error)
    }
  }

// -----------------------------------------
const getPatientInfo = async(req, res, patient_id) => {
    try {
      const patientInfo = await Patient.findOne({
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

      if (!patientInfo) {
        return res.render('pages/patientInfo.ejs', { title: 'Không tìm thấy bệnh nhân' })
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