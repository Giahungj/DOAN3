
const submitFacilityForm = (formId) => {
    const form = document.getElementById(formId)

    form.action = ''
    form.action = '/admin/co-so-y-te/thong-tin'
    form ? form.submit() : console.error(`Form không tồn tại: ${formId}`);
}

