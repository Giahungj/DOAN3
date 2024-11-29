import Doctor from '../models/doctorModel'
import Users from '../models/usersModel'
import MedicalFacility from '../models/medicalFacilityModel'

// -----------------------------------------
const getFacilitiesPage = (req, res) => {
  return res.render('pages/facility.ejs', { title: 'Trang chuyên khoa' })
}

// -----------------------------------------
const getFacilityInfoPage = async (req, res) => {
  try {
    const medical_facility_id = req.params.medical_facility_id	
    const facilityInfo = await getFacilityInfo(req, res, medical_facility_id)
    return res.render('pages/facilityInfo.ejs', { title: 'Thông tin cơ sở y tế', facilityInfo })
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getFacilityStatistics = async (req, res) => {
  try {
    const totalCount = await MedicalFacility.count()
    return res.json({
      totalFacCount: totalCount,
    })
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getFacilities = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      console.log('Đã gọi')
      const limit = 2
      const offset = (page - 1) * limit
      const facilities = await MedicalFacility.findAll({
          limit: limit,
          offset: offset,
          include: [
              {
              model: Doctor,
              as: 'doctors'
              }
          ]
      })
      const totalFacilities = await MedicalFacility.count()
      const totalPages = Math.ceil(totalFacilities / limit)
      const facilityData = facilities.map(facility => ({
          medical_facility_id: facility.medical_facility_id,
          facility_name: facility.name,
          facility_address: facility.address,
          facility_category: facility.category,
          facility_specialty: facility.specialty,
          facility_working_hours: facility.working_hours,
          facility_contact_number: facility.contact_number,
      }))

      return res.json({ facilityData, currentPage: page, totalPages });
    } catch (error) {
        console.error(error)
    }
}

// -----------------------------------------
const getFacilityInfo = async(req, res, medical_facility_id) => {
  try {
    const facilityInfo = await MedicalFacility.findOne({
      where: { medical_facility_id: medical_facility_id },
      include: [{ model: Doctor, as: 'doctors',
        include: [{ model: Users, as: 'user', }]
      }]
    })
    // Kiểm tra nếu không tìm thấy chuyên khoa
    if (!facilityInfo) {
      return res.render('pages/facilityInfo.ejs', { title: 'Không tìm thấy cơ sở' })
    }

    return facilityInfo
  } catch (error) {
    console.error(error)
  }
}

export default { 
    getFacilitiesPage,
    getFacilityInfoPage,

    // API ------------------
    getFacilities,
    getFacilityInfo,

    getFacilityStatistics,
  };