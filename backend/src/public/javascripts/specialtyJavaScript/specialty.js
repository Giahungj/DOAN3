// Load dữ liệu của toàn bộ chuyên khoa
const loadSpecialData = async () => {
    try {
        const response = await fetch('http://localhost:6969/api/chuyen-khoa')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const specialties = await response.json()

        const specialTable = document.getElementById('specialTable')
        if (!specialTable) return
        specialTable.innerHTML = ''
        let i = 1
        specialties.specialtiesData.forEach(special => {
            const card = `
            <form method="POST" id="form-${special.special_id}" style="display: none;">
                <input type="hidden" name="special_id" value="${special.special_id}">
            </form>
            <div class="col">
                <div class="card h-100">
                    <div class="card-body">
                        <h6 class="card-title">${special.special_name}</h6>
                        <p class="card-text">${special.description}</p>
                        <p class="card-text">${special.created_at}</p>
                        <p class="card-text">${special.updated_at}</p>
                    </div>
                    <div class="card-footer">
                        <a class="text-decoration-none nav-link cursor-pointer" onclick="submitSpecialtyForm('form-${special.special_id}')">Xem</a>
                    </div>
                </div>
            </div>
            `
            specialTable.innerHTML += card
            i += 1
        })

        const response2 = await fetch('http://localhost:6969/api/chuyen-khoa/so-luong')
        if (!response2.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalSpecialtiesCount } = await response2.json()

        const totalSpecialties = document.getElementById('totalSpecialties')
        totalSpecialties.innerText = totalSpecialtiesCount
    } catch (error) {
        console.error('Error fetching doctors:', error)
    }
}

// Lấy trang danh sách bác sĩ
const getSpecialtiesPage = async () => {
    try {
        const response = await fetch('http://localhost:6969/admin/chuyen-khoa')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        
        const html = await response.text()
        document.getElementById('contentArea').innerHTML = html
    } catch (error) {
        console.error(error)
    }
}