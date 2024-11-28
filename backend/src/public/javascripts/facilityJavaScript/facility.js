const loadFacilityData = async(page) => {
    try {
        console.log('Bắt đầu fetch các data')
        const response = await fetch(`http://localhost:6969/api/co-so-y-te/?page=${page}`)
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { facilityData, currentPage, totalPages } = await response.json()
        const facilityTable = document.getElementById('facilityTable')
        const paginationArea = document.getElementById('paginationArea')

        if (!facilityData) return console.log('Lỗi rồi ní')

        facilityTable.innerHTML = ''
        paginationArea.innerHTML = ''
        const itemsPerPage = 10
        let i = (currentPage - 1) * itemsPerPage + 1
        facilityData.forEach(facility => {
            const card = `
                <tr class="text-start cursor-pointer" onclick="window.location='/admin/co-so-y-te/thong-tin/${facility.medical_facility_id}'">
                    <td class="text-center">${i}</td>
                    <td>${facility.facility_name}</td>
                    <td>${facility.facility_address}</td>
                    <td>${facility.facility_contact_number}</td>
                    <td>${facility.facility_category}</td>
                    <td class="text-center"><a href="/admin/co-so-y-te/thong-tin/${facility.medical_facility_id}">Xem thêm</a></td>
                </tr>
            `
            facilityTable.innerHTML += card
            i += 1
        })

        const response2 = await fetch('http://localhost:6969/api/co-so-y-te/so-luong')
        if (!response2.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalFacCount } = await response2.json()

        const totalFacilities = document.getElementById('totalFacilities')
        totalFacilities.innerText = totalFacCount

        paginationArea.innerHTML = `
            <ul class="pagination justify-content-end">
                ${currentPage > 1 ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadFacilityData(${currentPage - 1})" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                : `
                    <li class="page-item disabled">
                        <a class="page-link" onclick="loadFacilityData(${currentPage})" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                }

                ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                    <li class="page-item ${page === currentPage ? 'active' : ''}">
                        <a class="page-link" onclick="loadFacilityData(${page})" href="#">${page}</a>
                    </li>
                `).join('')}

                ${currentPage < totalPages ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadFacilityData(${currentPage + 1})" href="#" aria-label="Next">
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
    } catch (error) {
        console.error('Error fetching facilities:', error)
    }
}

// Lấy trang danh sách cơ sở y tế
const getFacilitiesPage = async () => {
    try {
        console.log('Bắt đầu fetch cái trang')
        const response = await fetch('http://localhost:6969/admin/co-so-y-te')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }

        const html = await response.text()
        document.getElementById('contentArea').innerHTML = html
    } catch (error) {
        console.error(error)
    }
}