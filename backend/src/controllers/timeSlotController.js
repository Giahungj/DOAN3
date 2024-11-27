import TimeSlot from '../models/timeSlotModel'

// -----------------------------------------
const getTimeSlotList = async (req, res) => {
    try {
        const timeSlotData = await TimeSlot.findAll()
        const timeSlotDataArray = timeSlotData.map(timeSlot => timeSlot.dataValues)
        return timeSlotDataArray
    } catch (error) {
      console.error(error)
    }
}

export default {getTimeSlotList}