const getServiceAtHomePage = (req, res) => {
    return res.render('serviceAtHome.ejs', { title: 'Tại nhà' })
}

const getServiceAtHospitalPage = (req, res) => {
    return res.render('serviceAtHospital.ejs', { title: 'Tại viện' })
}

const getServiceHealthPage = (req, res) => {
    return res.render('serviceHealth.ejs', { title: 'Sức khỏe' })
}

export default {
    getServiceAtHomePage,
    getServiceAtHospitalPage,
    getServiceHealthPage
};