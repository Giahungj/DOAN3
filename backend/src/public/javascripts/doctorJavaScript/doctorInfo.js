// Hàm để submit form (ES6)
const submitDoctorForm = (formId) => {
    console.log('Gọi')
    const form = document.getElementById(formId)
    if (form) {
        form.action = '/admin/bac-si/thong-tin'
        form.submit()
    } else {
        console.error(`Form không tồn tại: ${formId}`)
    }
}