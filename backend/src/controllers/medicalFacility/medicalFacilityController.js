import Doctor from '../../models/doctorModel'
import MedicalFacility from '../../models/medicalFacilityModel'

// -----------------------------------------
const getFacilitiesPage = (req, res) => {
  res.render('pages/facility.ejs', { title: 'Trang chuyên khoa' })
}

// -----------------------------------------
const getFacilityInfoPage = async (req, res) => {
  try {
    const medical_facility_id = req.body.medical_facility_id	
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
    console.log(totalCount)
    res.json({
        totalFacilitiesCount: totalCount,
    })
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getFacilities = async (req, res) => {
    try {
        const facilities = await MedicalFacility.findAll({
            limit: 8,
            include: [
                {
                model: Doctor,
                as: 'doctors'
                }
            ]
        })

        const facilityData = facilities.map(facility => ({
            medical_facility_id: facility.medical_facility_id,
            facility_name: facility.name,
            facility_address: facility.address,
            facility_category: facility.category,
            facility_specialty: facility.specialty,
            facility_working_hours: facility.working_hours,
            facility_contact_number: facility.contact_number,
        }))

        return res.json( facilityData );
    } catch (error) {
        console.error(error)
    }
}

// -----------------------------------------
const getFacilityInfo = async(req, res, medical_facility_id) => {
  try {
    const facilityInfo = await MedicalFacility.findOne({
      where: {
        medical_facility_id: medical_facility_id
      },
      include: [
        {
          model: Doctor,
          as: 'doctors'
        }
      ]
    })
    // Kiểm tra nếu không tìm thấy chuyên khoa
    if (!facilityInfo) {
      return res.render('pages/facilityInfo.ejs', { title: 'Không tìm thấy cơ sở' })
    }

    console.log('Thông tin chi tiết cơ sở y tế:', facilityInfo.dataValues)
    return facilityInfo
  } catch (error) {
    console.error(error)
  }
}

export default { 
    getFacilitiesPage,
    getFacilityInfoPage,

    getFacilityStatistics,

    getFacilities,
    getFacilityInfo,
};