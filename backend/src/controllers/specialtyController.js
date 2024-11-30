import { Sequelize, DataTypes } from 'sequelize';

// Thiết lập Model
import Doctor from '../models/doctorModel'
import Specialty from '../models/specialtyModel'
import DoctorSpecialty from '../models/doctorSpecialtyModel'

// Định dạng
import { formatDate } from '../utils/formatUtils'
import { formatCurrency } from '../utils/formatUtils'
// -----------------------------------------
const getSpecialtiesPage = (req, res) => {
  return res.render('pages/special.ejs', { title: 'Trang chuyên khoa' })
}

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

// -----------------------------------------
const getSpecialtyStatistics = async (req, res) => {
  try {
    const totalCount = await Specialty.count()

    return res.json({
      totalSpecialtiesCount: totalCount,
  })
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getSpecialties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit
    const specialties = await Specialty.findAll({
      limit: 10,
      offset: offset,
      include: [
        {
        model: Doctor,
        through: DoctorSpecialty, 
        as: 'doctors'
        }
      ],
    })

    const totalSpecialties = await Specialty.count()
    const totalPages = Math.ceil(totalSpecialties / limit)

    const specialtiesData = specialties.map(special => ({
        special_id: special.special_id,
        special_name: special.special_name,
        description: special.description,
        special_image: special.special_image,
        created_at: formatDate(special.createdAt),
        updated_at: formatDate(special.updatedAt),
        doctors: special.doctors.map(doctor => ({
          doctor_id: doctor.doctor_id
        }))
    }))

    return res.json({ specialtiesData, currentPage: page, totalPages });
  } catch (error) {
      console.error(error)
  }
}

// -----------------------------------------
const getSpecialInfo = async(req, res, special_id) => {
  try {
    const special_id = req.params.special_id || special_id
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
      created_at: formatDate(specialtyInfo.createdAt),
      updated_at: formatDate(specialtyInfo.updatedAt),
    }
    console.log('Thông tin chi tiết chuyên khoa:', formattedSpecialtyInfo)
    return formattedSpecialtyInfo
  } catch (error) {
    console.error(error)
  }
}

const addSpecial = async(req, res) => {
  try {
    const { special_name, description, special_image } = req.body;
    if (!special_name || !description || !special_image) {
      return res.render('pages/addSpecial.ejs', { title: 'Thêm Chuyên Khoa', error: 'Vui lòng điền đầy đủ thông tin.' });
    }
    const newSpecialty = await Specialty.create({ special_name, description, special_image });
    res.redirect(`/admin/co-so-y-te/chuyen-khoa/${newSpecialty.special_id}`);
  } catch (error) {
    console.error(error);
    res.render('pages/addSpecial.ejs', { title: 'Thêm Chuyên Khoa', error: 'Đã có lỗi xảy ra, vui lòng thử lại.' });
  }
}

export default { 
    getSpecialtiesPage,
    getSpecialInfoPage,

    getSpecialtyStatistics,

    getSpecialties,
    getSpecialInfo,
    addSpecial
};