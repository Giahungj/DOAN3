// Load dữ liệu của toàn bộ chuyên khoa
const loadSpecialData = async (page) => {
    try {
        const response = await fetch(`http://localhost:6969/api/chuyen-khoa/?page=${page}`)
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { specialtiesData, currentPage, totalPages } = await response.json()

        const specialTable = document.getElementById('specialTable')
        const paginationArea = document.getElementById('paginationArea')

        if (!specialTable) return

        specialTable.innerHTML = ''
        paginationArea.innerHTML = ''

        const itemsPerPage = 10
        let i = (currentPage - 1) * itemsPerPage + 1

        specialtiesData.forEach(special => {
            const card = `
            <tr class="cursor-pointer" onclick="window.location='/admin/chuyen-khoa/thong-tin/${special.special_id}'">
                <td class="text-center">${i}</td>
                <td class="text-start">${special.special_name}</td>
                <td class="text-center">${special.created_at}</td>
                <td class="text-start">${special.doctors.length}</td>
                <td>
                    <a href="/admin/chuyen-khoa/thong-tin/${special.special_id}">
                        Xem chi tiết
                    </a>
                </td>
            </tr>
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