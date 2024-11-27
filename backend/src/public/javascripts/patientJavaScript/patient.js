const loadPatientData = async() => {
    try {
        const response = await fetch('http://localhost:6969/api/benh-nhan')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const patients = await response.json()

        const patientTable = document.getElementById('patientTable')
        if (!patientTable) return
        patientTable.innerHTML = ''

        let i = 1
        patients.forEach(patient => {
            const row = `
                <tr>
                    <td>${i}</td>
                    <td>${patient.name}</td>
                    <td>${patient.health_insurance_code}</td>
                    <td>
                        ${patient.avatar}
                    </td>
                    <td>
                        <a href="/admin/benh-nhan/thong-tin/${patient.patient_id}"><i class="fas fa-eye fs-5 text-indigo-400 me-2" title="Xem"></i></a>
                        <a href="#"><i class="fas fa-edit fs-5 text-teal-300 me-2" title="Sửa"></i></a>
                        <a href="#"><i class="fas fa-trash fs-5 text-red-400" title="Xóa"></i></a>
                    </td>
                </tr>
            `
            i++
            patientTable.innerHTML += row
        })

        const response2 = await fetch('http://localhost:6969/api/benh-nhan/so-luong')
        if (!response2.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalPatientsCount } = await response2.json()

        const totalFacilities = document.getElementById('totalPatients')
        totalFacilities.innerText = totalPatientsCount
    } catch (error) {
        console.error(error)
    }
}


const getPatientsPage = async () => {
    try {
        const response = await fetch('http://localhost:6969/admin/benh-nhan')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        
        const html = await response.text()
        document.getElementById('contentArea').innerHTML = html
    } catch (error) {
        console.error(error)
    }
}
