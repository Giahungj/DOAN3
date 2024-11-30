// Load dữ liệu của toàn bộ bác sĩ
const loadAppointmentData = async (page) => {
    try {
        const response = await fetch(`http://localhost:6969/api/lich-hen/?page=${page}`)
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { appointmentsData, currentPage, totalPages } = await response.json();

        const appointmentTable = document.getElementById('appointmentTable')
        const paginationArea = document.getElementById('paginationArea')

        if (!appointmentTable) return

        appointmentTable.innerHTML = ''
        paginationArea.innerHTML = ''

        const itemsPerPage = 10
        let i = (currentPage - 1) * itemsPerPage + 1

        if (appointmentsData.length === 0) {
            const noAppointmentsRow = `
                <tr>
                    <td colspan="6" class="fs-4 text-center">Không có lịch hẹn</td>
                </tr>
            `;
            appointmentTable.innerHTML = noAppointmentsRow;
        } else {
            appointmentsData.forEach(appointment => {
            const row = `
                <tr class="cursor-pointer" onclick="window.location='/admin/lich-hen/thong-tin/${appointment.appointment_id}'">
                    <td>${i}</td>
                    <td class="text-start ${
                        appointment.approval_status === 'pending'
                            ? 'text-warning'
                            : appointment.approval_status === 'approved'
                            ? 'text-success'
                            : 'text-danger'
                    }">
                    ${
                        appointment.approval_status === 'approved'
                            ? '<i class="fas fa-check-circle me-1"></i> <strong>Duyệt </strong>'
                            : appointment.approval_status === 'rejected'
                            ? '<i class="fas fa-times-circle me-1"></i> <strong>Từ chối </strong>'
                            : '<i class="fas fa-hourglass-start me-1"></i> <strong>Đang chờ </strong>'
                    }
                        <span>[ ${appointment.updatedAt} ]</span>
                    </td>
                    <td class="text-start">${appointment.appointment_time}</td>
                    <td class="text-start">${appointment.facility_address}</td>
                    <td class="text-start">${appointment.doctor_name}</td>
                    <td>
                        <a href="/admin/lich-hen/thong-tin/${ appointment.appointment_id }">
                            Xem chi tiết
                        </a>
                    </td>
                </tr>
                `
                i++
                appointmentTable.innerHTML += row
            })
        }

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
        const appointmentStatistics = await fetch('http://localhost:6969/api/lich-hen/thong-ke')
        if (!appointmentStatistics.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalAppCount, approvedCount, pendingCount, rejectedCount } = await appointmentStatistics.json()
        const totalAppointments = document.getElementById('totalAppointments')
        const approvedAppointments = document.getElementById('approvedAppointments')
        const pendingAppointments = document.getElementById('pendingAppointments')
        const canceledAppointments = document.getElementById('canceledAppointments')

        totalAppointments.innerText = ''
        approvedAppointments.innerText = ''
        pendingAppointments.innerText = ''
        canceledAppointments.innerText = ''

        totalAppointments.innerText = totalAppCount
        approvedAppointments.innerText = approvedCount
        pendingAppointments.innerText = pendingCount
        canceledAppointments.innerText = rejectedCount
    } catch (error) {
        console.error('Error fetching appointments:', error)
    }
}

// Lấy trang danh sách lịch hẹn
const getAppointmentsPage = async () => {
    try {
        const response = await fetch('http://localhost:6969/admin/lich-hen')
        const html = await response.text()
        document.getElementById('contentArea').innerHTML = html
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
    }
}

// Định dạng giá trị Ngày tháng cho input cập nhật
const date = '23/11/2024'
const [day, month, year] = date.split('/')
const formattedDate = `${year}-${month}-${day}`

document.querySelector('input[type="date"]').value = formattedDate
document.querySelector('input[type="date"]').min = formattedDate