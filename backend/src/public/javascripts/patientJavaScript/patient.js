const loadPatientData = async(page) => {
    try {
        const response = await fetch(`http://localhost:6969/api/benh-nhan/?page=${page}`)
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { patientsData, currentPage, totalPages } = await response.json()
        
        const paginationArea = document.getElementById('paginationArea')
        const patientTable = document.getElementById('patientTable')
        if (!patientTable) return
        patientTable.innerHTML = ''
        paginationArea.innerHTML = ''

        const itemsPerPage = 10
        let i = (currentPage - 1) * itemsPerPage + 1
        
        patientsData.forEach(patient => {
            const row = `
                <tr class="cursor-pointer" onclick="window.location='/admin/benh-nhan/thong-tin/${patient.patient_id}'">
                    <td>${i}</td>
                    <td>${patient.name}</td>
                    <td>${patient.health_insurance_code}</td>
                    <td>
                        ${patient.avatar}
                    </td>
                    <td>
                        <a href="/admin/benh-nhan/thong-tin/${patient.patient_id}">Xem chi tiết</a>
                    </td>
                </tr>
            `
            i++
            patientTable.innerHTML += row
        })

        paginationArea.innerHTML = `
            <ul class="pagination justify-content-end">
                ${currentPage > 1 ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadPatientData(${currentPage - 1})" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                : `
                    <li class="page-item disabled">
                        <a class="page-link" onclick="loadPatientData(${currentPage})" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                }

                ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                    <li class="page-item ${page === currentPage ? 'active' : ''}">
                        <a class="page-link" onclick="loadPatientData(${page})" href="#">${page}</a>
                    </li>
                `).join('')}

                ${currentPage < totalPages ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadPatientData(${currentPage + 1})" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`
                : `
                    <li class="page-item disabled">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>`
                }
            </ul>
        `

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
