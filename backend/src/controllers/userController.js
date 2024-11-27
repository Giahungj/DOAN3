import { get } from 'http'
import Users from '../models/usersModel'
const getUser = async(req, res) => {
    try {
        const users = await Users.findAll()
        let i = 1
        users.forEach(user => {
            console.log(i + ' ' + user.name)
            i++
        })
    } catch (error) {
        console.error(error)
    }
}

export default getUser