const submitSpecialtyForm = (formId) => {
    const form = document.getElementById(formId)
    
    form.action = ''
    form.action = '/admin/chuyen-khoa/thong-tin'
    form ? form.submit() : console.error(`Form không tồn tại: ${formId}`);
}

