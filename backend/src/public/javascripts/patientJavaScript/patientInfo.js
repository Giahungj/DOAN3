const submitPatienForm = (formId) => {
    const form = document.getElementById(formId)
    form.action = ''
    form.action = '/admin/benh-nhan/thong-tin'
    form ? form.submit() : console.error(`Form không tồn tại: ${formId}`)
}
