// Submit chuyên khoa Form
const submitSpecialtyForm = (formId) => {
    const form = document.getElementById(formId)
    
    form.action = ''
    form.action = '/admin/chuyen-khoa/thong-tin'
    form ? form.submit() : console.error(`Form không tồn tại: ${formId}`);
}

// Submit cơ sở Form
const submitFacilityForm = (formId) => {
    const form = document.getElementById(formId)

    form.action = ''
    form.action = '/admin/co-so-y-te/thong-tin'
    form ? form.submit() : console.error(`Form không tồn tại: ${formId}`);
}

// Submit bác sĩ Form
const submitDoctorForm = (formId) => {
    const form = document.getElementById(formId)
    form.action = ''
    form.action = '/admin/bac-si/thong-tin'
    form ? form.submit() : console.error(`Form không tồn tại: ${formId}`)
}