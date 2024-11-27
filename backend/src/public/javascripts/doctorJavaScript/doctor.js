// Load dữ liệu của toàn bộ bác sĩ
const loadDoctorData = async () => {
    try {
        const response = await fetch('http://localhost:6969/api/bac-si')
        if (!response.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const doctors = await response.json()

        const doctorTable = document.getElementById('doctorTable')
        if (!doctorTable) return
        doctorTable.innerHTML = ''
        doctors.doctorsData.forEach(doctor => {
            const specialties = doctor.specialties.map(specialty => specialty.special_name).join(', ')
            const card = `
                <form method="POST" style="display: none;" id="form-${doctor.doctor_id}">
                    <input type="hidden" name="doctor_id" value="${doctor.doctor_id}">
                </form>
                <a class="text-decoration-none nav-link cursor-pointer" onclick="submitDoctorForm('form-${doctor.doctor_id}')">
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

        const response2 = await fetch('http://localhost:6969/api/bac-si/so-luong')
        if (!response2.ok) {
            throw new Error('Phản hồi không ok cho lắm')
        }
        const { totalDoctorsCount } = await response2.json()

        const totalDoctors = document.getElementById('totalDoctors')
        totalDoctors.innerText = totalDoctorsCount
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
