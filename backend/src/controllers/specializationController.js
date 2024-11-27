const getSpecializedCare = (req, res) => {
    return res.render('medicalServices/specializedCarePage.ejs', { title: 'Khám' })
}

const getRemoteConsultation = (req, res) => {
    return res.render('medicalServices/remoteConsultationPage.ejs', { title: 'Khám từ xa' })
}

export default {
    getSpecializedCare,
    getRemoteConsultation
}