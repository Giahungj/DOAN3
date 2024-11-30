// Load dữ liệu của toàn bộ bác sĩ
const loadDoctorData = async (page) => {
    try {
        const response = await fetch(`http://localhost:6969/api/bac-si/?page=${page}`)
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { doctorsData, currentPage, totalPages } = await response.json()
        const paginationArea = document.getElementById('paginationArea')
        const doctorTable = document.getElementById('doctorTable')
        if (!doctorTable) return

        doctorTable.innerHTML = ''
        paginationArea.innerHTML = ''
        doctorsData.forEach(doctor => {
            const specialties = doctor.specialties.map(specialty => specialty.special_name).join(', ')
            const card = `
                <a class="text-decoration-none nav-link cursor-pointer" onclick="submitDoctorForm('form-${doctor.doctor_id}')">
                <form method="GET" id="form-${doctor.doctor_id}">
                    <input type="hidden" name="doctor_id" value="${doctor.doctor_id}"></input>
                </form>
                    <div class="col">
                        <div class="card h-100">
                            <div class="overflow-hidden" style="height: 15rem">
                                <img class="doctor-card-img" src="/images/${doctor.doctor_avatar || 'anh-mau.jpg'}" class="card-img-top" alt="${doctor.doctor_name}">
                            </div>
                            <div class="card-body p-1">
                                <h5 class="card-title">${doctor.doctor_name}</h5>

                                <div class="row g-0">
                                    <div class="col-2 text-center">
                                        <i class="fas fa-user-md text-blue-200"></i>
                                    </div>
                                    <div class="col">
                                        <p class="card-text m-0 text-start">Chuyên khoa: ${specialties}</p>                            
                                    </div>
                                </div>
                                <div class="row g-0">
                                    <div class="col-2 text-center">
                                        <i class="fa-solid fa-school text-green-200"></i>
                                    </div>
                                    <div class="col">
                                        <p class="card-text m-0 text-start">Học vấn: ${doctor.education}</p>                            
                                    </div>
                                </div>
                                <div class="row g-0">
                                    <div class="col-2 text-center">
                                        <i class="fas fa-briefcase text-orange-200"></i>
                                    </div>
                                    <div class="col">
                                        <p class="card-text m-0 text-start">Kinh nghiệm: ${doctor.work_experience}</p>                           
                                    </div>
                                </div>
                                <div class="row g-0">
                                    <div class="col-2 text-center">
                                        <i class="fas fa-hospital text-purple-200"></i>
                                    </div>
                                    <div class="col">
                                        <p class="card-text m-0 text-start">Cơ sở: <span class="fst-italic">*Cơ sở làm việc*</span></p>                            
                                    </div>
                                </div>
                                <div class="row g-0">
                                    <div class="col-2 text-center">
                                        <i class="fas fa-id-card text-red-200"></i>
                                    </div>
                                    <div class="col">
                                        <p class="card-text m-0 text-start">Số giấy phép: ${doctor.licence_number}</p>                            
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `
            doctorTable.innerHTML += card
        })

        paginationArea.innerHTML = `
            <ul class="pagination justify-content-end">
                ${currentPage > 1 ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadDoctorData(${currentPage - 1})" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                : `
                    <li class="page-item disabled">
                        <a class="page-link" onclick="loadDoctorData(${currentPage})" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>`
                }

                ${Array.from({ length: totalPages }, (_, i) => i + 1).map(page => `
                    <li class="page-item ${page === currentPage ? 'active' : ''}">
                        <a class="page-link" onclick="loadDoctorData(${page})" href="#">${page}</a>
                    </li>
                `).join('')}

                ${currentPage < totalPages ? `
                    <li class="page-item">
                        <a class="page-link" onclick="loadDoctorData(${currentPage + 1})" href="#" aria-label="Next">
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

        // Bắt tất cả các thẻ doctor-card
        const allDoctorCards = document.querySelectorAll('.doctor-card-img');
        allDoctorCards.forEach(card => {
            card.onmouseover = function() {
                card.style.transform = 'scale(1.1)'
                card.style.transition = 'transform 0.3s ease'
            }
            card.onmouseout = function() {
                card.style.transform = 'scale(1)'
            }
        })

        const doctorStatistics = await fetch('http://localhost:6969/api/bac-si/so-luong')
        if (!doctorStatistics.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalDoctorsCount, totalAppointmentToDayCount, approvedCount } = await doctorStatistics.json()

        const totalDoctors = document.getElementById('totalDoctors')
        const totalAppointmentsToday = document.getElementById('totalAppointmentsToday')
        const totalApprovedAppointments = document.getElementById('totalApprovedAppointments')

        totalDoctors.innerText = totalDoctorsCount
        totalAppointmentsToday.innerText = totalAppointmentToDayCount
        totalApprovedAppointments.innerText = approvedCount
    } catch (error) {
        console.error('Error fetching doctors:', error)
    }
}

// Lấy dữ liệu bác sĩ thông kê
const loadDoctorStatistics = async() => {
    try {
        const response = await fetch('http://localhost:6969/api/bac-si/so-luong')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalDoctorsCount, femalePercentage, malePercentage, otherPercentage } = await response.json()

        const totalDoctors = document.getElementById('totalDoctors')
        const femaleDoctorPercentage = document.getElementById('femaleDoctorPercentage')
        const maleDoctorPercentage = document.getElementById('maleDoctorPercentage')
        const otherDoctorPercentage = document.getElementById('otherDoctorPercentage')

        totalDoctors.innerText = totalDoctorsCount
        femaleDoctorPercentage.innerText = femalePercentage + ' %'
        maleDoctorPercentage.innerText = malePercentage + ' %'
        otherDoctorPercentage.innerText = otherPercentage + ' %'

        
    } catch (error) {
        console.error('Error fetching doctors:', error)
    }
}

// Lấy trang danh sách bác sĩ
const getDoctorsPage = async () => {
    try {
        const response = await fetch('http://localhost:6969/admin/bac-si')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        
        const html = await response.text()
        document.getElementById('contentArea').innerHTML = html
    } catch (error) {
        console.error(error)
    }
}

loadDoctorStatistics()
