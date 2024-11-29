import { Sequelize, DataTypes } from 'sequelize';

import Doctor from '../models/doctorModel'
import Patient from '../models/patientModel'
import Users from '../models/usersModel'
import setupAssociations from '../models/associations'

// Định dạng
import { formatDate } from '../utils/formatUtils'

// -----------------------------------------
const getAccountsPage = (req, res) => {
  return res.render('pages/account.ejs', { title: 'Trang quản lý tài khoản' })
}

// -----------------------------------------
const getAccountInfoPage = async(req, res) => {
  const user_id = await req.params.user_id
  const account = await getAccount(user_id)
  return res.render('pages/accountInfo.ejs', { title: 'Thông tin tài khoản', account: account })
}

// ========================================================= API =========================================================
// -----------------------------------------
const getAccounts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const offset = (page - 1) * limit
    const accounts = await Users.findAll({
      limit: limit,
      offset: offset
    })

    const totalAccounts = await Users.count()
    const totalPages = Math.ceil(totalAccounts / limit)

    const accountsData = accounts.map(user => ({
        user: user.dataValues
    }))

    console.log(accountsData)
    return res.json({ accountsData, currentPage: page, totalPages })
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getAccount = async(user_id) => {
  try {
    const account = await Users.findOne({
      where: { user_id },
    })
    const accountData = {
      ... account.dataValues,
      day_of_birth: formatDate(account.day_of_birth)
    }
    
    return accountData
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const updateAccount = async(req, res) => {
  try {
    const user = req.body

    const update = await Users.update(
      {
        name: user.name,
        address: user.address,
        avatar: user.avatar,
      },
      {
        where: { user_id: user.user_id }, // Điều kiện để cập nhật
      }
    )
    res.redirect(`/admin/tai-khoan/thong-tin/${user.user_id}`)
  } catch (error) {
    console.error(error)
  }
}

// -----------------------------------------
const getAccountStatistics = async (req, res) => {
  try {
    const totalCount = await Users.count()
    const doctorCount = await Users.count({ where: { role: 'Bác sĩ' } })
    const patientCount = await Users.count({ where: { role: 'Bệnh nhân' } })
    const adminCount = await Users.count({ where: { role: 'Admin' } })

    console.log(totalCount)
    console.log(doctorCount)
    console.log(patientCount)
    console.log(adminCount)
    return res.json({
      totalAccCount: totalCount,
      doctorCount,
      patientCount,
      adminCount
    })
  } catch (error) {
    console.error(error)
  }
}
// ===========================================================================================================================
export default { 
  getAccountsPage,
  getAccountInfoPage,

  getAccounts,
  getAccount,
  updateAccount,
  getAccountStatistics
}