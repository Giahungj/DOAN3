const getMedicalFacilities = (req, res) => {
    return res.render('medicalServices/medicalFacilitiesPage.ejs', { title: 'Cơ sở y tế uy tín' })
}

export default { getMedicalFacilities };