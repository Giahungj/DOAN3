// Thiết lập Model
import Doctor from '../../models/doctorModel'
import Specialty from '../../models/specialtyModel'
import DoctorSpecialty from '../../models/doctorSpecialtyModel'

// -----------------------------------------

//          RENDER DANH SACH CHUYEN KHOA
// -----------------------------------------

const getSpecialtiesPage = (req, res) => {
  res.render('pages/special.ejs', { title: 'Trang chuyên khoa' })
}
// ===========================================================================================================================




// -----------------------------------------

//          RENDER CHI TIET CHUYEN KHOA
// -----------------------------------------

const getSpecialInfoPage = async (req, res) => {
  try {
    const special_id = req.body.special_id
    const specialInfo = await getSpecialInfo(req, res, special_id)
    return res.render('pages/specialInfo.ejs', { title: 'Thông tin chuyên khoa', specialInfo })
  } catch (error) {
    console.error(error)
  }
}
// ===========================================================================================================================




// -----------------------------------------

//          RES.JSON THONG KE CHUYEN KHOA
// -----------------------------------------

const getSpecialtyStatistics = async (req, res) => {
  try {
    const totalCount = await Specialty.count()

    res.json({
      totalSpecialtiesCount: totalCount,
  })
  } catch (error) {
    console.error(error)
  }
}
// ===========================================================================================================================




// -----------------------------------------

//          RES.JSON DANH SACH BAC SI
// -----------------------------------------

// Lấy danh sách chuyên khoa
const getSpecialties = async (req, res) => {
    try {
        const specialties = await Specialty.findAll({
            limit: 8,
            include: [
                {
                model: Doctor,
                through: DoctorSpecialty, 
                as: 'doctors'
                }
            ]
        })

        const specialtiesData = specialties.map(special => ({
            special_id: special.special_id,
            special_name: special.special_name,
            description: special.description,
            special_image: special.special_image,
            created_at: special.createdAt,
            updated_at: special.updatedAt
        }))


        res.json({ specialtiesData });
    } catch (error) {
        console.error(error)
    }
}
// ===========================================================================================================================




// -----------------------------------------

//          TRA VE CHI TIET BAC SI
// -----------------------------------------

const getSpecialInfo = async(req, res, special_id) => {
  try {
    const specialtyInfo = await Specialty.findOne({
      where: {
        special_id: special_id
      },
      include: [
        {
          model: Doctor,
          through: DoctorSpecialty,
          as: 'doctors'
        }
      ]
    })
    // Kiểm tra nếu không tìm thấy chuyên khoa
    if (!specialtyInfo) {
      return res.render('pages/specialInfo.ejs', { title: 'Không tìm thấy chuyên khoa' })
    }

    const formattedSpecialtyInfo = {
      special_id: specialtyInfo.special_id,
      special_name: specialtyInfo.special_name,
      description: specialtyInfo.description,
      special_image: specialtyInfo.special_image,
      created_at: specialtyInfo.createdAt,
      updated_at: specialtyInfo.updatedAt,
    }
    console.log('Thông tin chi tiết chuyên khoa:', formattedSpecialtyInfo)
    return formattedSpecialtyInfo
  } catch (error) {
    console.error(error)
  }
}
// ===========================================================================================================================




export default { 
    getSpecialtiesPage,
    getSpecialInfoPage,

    getSpecialtyStatistics,

    getSpecialties,
    getSpecialInfo,
};