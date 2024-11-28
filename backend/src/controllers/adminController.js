const getAdminPage = (req, res) => {
    return res.render('adminHomePage.ejs', { title: 'Trang quản trị' })
}

const getTest = (req, res) => {
    return res.render('test.ejs', { title: 'Trang Test' })
}

export default { 
    getAdminPage,
    getTest
}