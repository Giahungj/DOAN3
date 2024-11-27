const getHomePage = (req, res) => {
    return res.render('homePage.ejs', { title:' Home Page' })
}

const getHealthServices = (req, res) => {
    return res.render('healthcareServicesPage.ejs', { title: 'Dành cho bạn' })
}

const getQuickCareSuggestions = (req, res) => {
    return res.render('quickCareSuggestionsPage.ejs', { services })
}

const getMentalHealth = (req, res) => {
    return res.render('mentalHealthPage.ejs', { services })
}

const get404Page = (req, res) => {
    return res.render('404.ejs', { title: 'Page Not Found' })
}

export default {
    getHomePage,
    getHealthServices,
    getQuickCareSuggestions,
    getMentalHealth,

    get404Page
}