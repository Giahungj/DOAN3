const loadFacilityData = async() => {
    try {
        console.log('Bắt đầu fetch các data')
        const response = await fetch('http://localhost:6969/api/co-so-y-te')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const facilities = await response.json()
        const facilityTable = document.getElementById('facilityTable')

        if (!facilities) return console.log('Lỗi rồi ní')

        facilityTable.innerHTML = ''
        let i = 1
        facilities.forEach(facility => {
            const card = `
            <form method="POST" id="form-${facility.medical_facility_id}" style="display: none;">
                <input type="hidden" name="medical_facility_id" value="${facility.medical_facility_id}">
            </form>
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h6 class="card-title">${facility.facility_name}</h6>
                        <p class="card-text text-start">
                            <i class="fas fa-map-marker-alt"></i> Địa chỉ: ${facility.facility_address}
                        </p>
                        <p class="card-text text-start">
                            <i class="fas fa-tags"></i> Danh mục: ${facility.facility_category}
                        </p>
                        <p class="card-text text-start">
                            <i class="fas fa-phone-alt"></i> Số điện thoại liên lạc: ${facility.facility_contact_number}
                        </p>
                    </div>
                    <div class="card-footer">
                        <a class="text-decoration-none nav-link cursor-pointer" onclick="submitFacilityForm('form-${facility.medical_facility_id}')">Xem</a>
                    </div>
                </div>
            </div>
            `
            facilityTable.innerHTML += card
            i += 1
        })

        const response2 = await fetch('http://localhost:6969/api/co-so-y-te/so-luong')
        if (!response2.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalFacilitiesCount } = await response2.json()

        const totalFacilities = document.getElementById('totalFacilities')
        totalFacilities.innerText = totalFacilitiesCount
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