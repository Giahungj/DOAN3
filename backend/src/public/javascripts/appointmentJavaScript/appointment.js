// Load dữ liệu của toàn bộ bác sĩ
const loadAppointmentData = async (page) => {
    try {
        const page = page || 1
        const response = await fetch('http://localhost:6969/api/lich-hen')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { appointmentsData, currentPage, totalPages } = await response.json();

        const appointmentTable = document.getElementById('appointmentTable')
        const paginationArea = document.getElementById('paginationArea')

        if (!appointmentTable) return

        appointmentTable.innerHTML = ''
        paginationArea.innerHTML = ''

        let i = 1
        appointmentsData.forEach(appointment => {
            const row = `
            <tr class="appointment-row" onclick="window.location='/admin/lich-hen/thong-tin/${appointment.appointment_id}'">
                <td>${i}</td>
                <td class="${
                    appointment.approval_status === 'pending'
                        ? 'text-warning'
                        : appointment.approval_status === 'approved'
                        ? 'text-success'
                        : 'text-danger'
                }">
                ${
                    appointment.approval_status === 'approved'
                        ? '<i class="fas fa-check-circle me-1"></i> <strong>Duyệt</strong>'
                        : appointment.approval_status === 'rejected'
                        ? '<i class="fas fa-times-circle me-1"></i> <strong>Từ chối</strong>'
                        : '<i class="fas fa-hourglass-start me-1"></i> <strong>Đang chờ</strong>'
                }</td>
                <td class="text-start">${appointment.appointment_time}</td>
                <td class="text-start">${appointment.facility_address}</td>
                <td class="text-start">${appointment.doctor_name}</td>
                <td colspan="5">
                    <a href="/admin/lich-hen/cap-nhat/${ appointment.appointment_id }" class="text-decoration-none" title="Cập nhật thêm">
                        <i class="fas fa-edit fs-5 text-teal-300 me-2"></i>
                    </a>
                    <a href="/admin/lich-hen/xoa/${ appointment.appointment_id }" class="text-decoration-none" title="Xóa" onclick="if(confirm('Bạn có chắc chắn muốn xóa lịch này không?'))">
                        <i class="fas fa-trash fs-5 text-red-400"></i>
                    </a>
                </td>
            </tr>
            `
            i++
            appointmentTable.innerHTML += row
        })

        paginationArea.innerHTML = `
            <ul class="pagination justify-content-end">
                ${currentPage > 1 ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadAppointmentData(${currentPage - 1})" href="/admin/lich-hen?page=${currentPage - 1}" aria-label="Previous" page-title="appointment-manager" data-target-id="appointmentTable">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>` 
                : `
                    <li class="page-item disabled">
                        <a class="page-link" href="#" aria-label="Previous" page-title="appointment-manager" -target-id="appointmentTable">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                }

                <!-- Loop through page numbers -->
                ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                    <li class="page-item ${page === currentPage ? 'active' : ''}">
                        <a class="page-link" href="/admin/lich-hen?page=${page}" page-title="appointment-manager" data-target-id="appointmentTable">${page}</a>
                    </li>
                `).join('')}

                ${currentPage < totalPages ? `
                    <li class="page-item">
                        <a class="page-link" href="/admin/lich-hen?page=${currentPage + 1}" aria-label="Next"page-title="appointment-manager" data-target-id="appointmentTable">
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
        return
        const responseDoctorCount = await fetch('http://localhost:6969/api/bac-si/so-luong')
        if (!responseDoctorCount.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalDoctorsCount } = await responseDoctorCount.json()

        const totalDoctors = document.getElementById('totalDoctors')
        totalDoctors.innerText = totalDoctorsCount
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
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
}