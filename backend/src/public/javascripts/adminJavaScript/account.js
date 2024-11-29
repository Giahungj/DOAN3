const loadAccountData = async (page) => {
    try {
        const response = await fetch(`http://localhost:6969/api/tai-khoan/?page=${page}`)
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { accountsData, currentPage, totalPages } = await response.json();

        const accountTable = document.getElementById('accountTable')
        const paginationArea = document.getElementById('paginationArea')

        if (!accountTable) return

        accountTable.innerHTML = ''
        paginationArea.innerHTML = ''

        const itemsPerPage = 10
        let i = (currentPage - 1) * itemsPerPage + 1
        
        accountsData.forEach(account => {
            console.log(account)
            const row = `
            <tr class="cursor-pointer" onclick="window.location='/admin/tai-khoan/thong-tin/${account.user.user_id}'">
                <td>${i}</td>
                <td class="text-start">${account.user.user_id}</td>
                <td class="text-start">${account.user.user_id}</td>
                <td class="text-start">${account.user.user_id}</td>
                <td class="text-start">${account.user.user_id}</td>
            </tr>
            `
            i++
            accountTable.innerHTML += row
        })

        paginationArea.innerHTML = `
            <ul class="pagination justify-content-end">
                ${currentPage > 1 ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadAppointmentData(${currentPage - 1})" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                : `
                    <li class="page-item disabled">
                        <a class="page-link" onclick="loadAppointmentData(${currentPage})" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                }

                ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                    <li class="page-item ${page === currentPage ? 'active' : ''}">
                        <a class="page-link" onclick="loadAppointmentData(${page})" href="#">${page}</a>
                    </li>
                `).join('')}

                ${currentPage < totalPages ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadAppointmentData(${currentPage + 1})" href="#" aria-label="Next">
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
        const accountStatistics = await fetch('http://localhost:6969/api/tai-khoan/thong-ke')
        if (!accountStatistics.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalAccCount, doctorCount, patientCount, adminCount } = await accountStatistics.json()
        const totalAccounts = document.getElementById('totalAccounts')
        const accountDoctors = document.getElementById('accountDoctors')
        const accountPatiens = document.getElementById('accountPatiens')
        const accountAdmins = document.getElementById('accountAdmins')

        totalAccounts.innerText = ''
        accountDoctors.innerText = ''
        accountPatiens.innerText = ''
        accountAdmins.innerText = ''

        totalAccounts.innerText = totalAccCount
        accountDoctors.innerText = doctorCount
        accountPatiens.innerText = patientCount
        accountAdmins.innerText = adminCount
    } catch (error) {
        console.error('Error fetching accounts:', error)
    }
}

// Lấy trang danh sách lịch hẹn
const getAccountsPage = async () => {
    try {
        const response = await fetch('http://localhost:6969/admin/tai-khoan')
        const html = await response.text()
        document.getElementById('contentArea').innerHTML = html
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
    }
}