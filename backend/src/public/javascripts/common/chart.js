// const ctx = document.getElementById('myChart').getContext('2d')
// const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Gia Hưng'],
//         datasets: [{
//             label: 'Bác sĩ theo chuyên khoa',
//             data: [12, 19, 3, 5, 2, 2],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// })



// --------------------------------------------------------------------------------------------------------------------------------------------------------------------

const ctx3 = document.getElementById('specialtyChart').getContext('2d')

const data2 = {
    labels: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61+'], // Các nhóm độ tuổi
    datasets: [
        {
            label: 'Bệnh nhân nữ',
            data: [10, 15, 25, 33, 18, 5, 3],
            backgroundColor: 'rgba(254, 112, 73, .5)',
            barThickness: 20
        },
        {
            label: 'Bệnh nhân nam',
            data: [12, 18, 22, 29, 20, 8, 6],
            backgroundColor: 'rgba(139, 53, 254, .5)',
            barThickness: 20
        }
    ]
};


const config2 = {
    type: 'bar',
    data: data2,
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Độ tuổi'
                }
            },
            y: {
                beginAtZero: true,
                stacked: true
            }
        },
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: 'Thống kê độ tuổi và giới tính của bệnh nhân'
            }
        }
    },
};


const specialtyChart = new Chart(ctx3, config2)


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------
const ctxx = document.getElementById('monthlyChart').getContext('2d');

// Dữ liệu mẫu theo tháng
const datax = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
        {
            label: 'Số lượng bệnh nhân', // Dữ liệu biểu đồ cột 1
            data: [170, 179, 182, 250, 123, 229, 117, 100, 160, 241, 159, 198],
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Màu cột
        },
        {
            label: 'Trung bình bệnh nhân', // Dữ liệu biểu đồ cột 2
            data: [160, 165, 170, 155, 150, 180, 175, 140, 165, 170, 160, 155],
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Màu cột thứ hai
        }
    ]
};

// Thiết lập cấu hình cho biểu đồ
const configx = {
    type: 'bar', // Loại biểu đồ chính là bar (cột)
    data: datax,
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tháng' // Text cho trục X
                }
            },
            y: {
                beginAtZero: true, // Bắt đầu từ 0
                title: {
                    display: true,
                    text: 'Bệnh nhân' // Text cho trục Y
                }
            }
        },
        plugins: {
            legend: {
                display: true
            },
            title: {
                display: true,
                text: 'Thống kê bệnh nhân theo tháng và trung bình mỗi tháng trong năm'
            }
        }
    }
};


// Khởi tạo biểu đồ với cấu hình
const monthlyChart = new Chart(ctxx, configx);




const datae = {
    labels: ['Bác sĩ chuyên khoa', 'Bác sĩ đa khoa', 'Bác sĩ nội trú', 'Bác sĩ phẫu thuật', 'Bác sĩ sản khoa'],
    datasets: [{
      label: 'Số lượng bác sĩ có bằng cấp',
      data: [50, 30, 15, 40, 25], // Dữ liệu số lượng bác sĩ cho từng loại bằng cấp
      backgroundColor: [
        'rgba(54, 162, 235, 0.3)', // Màu cho Bác sĩ chuyên khoa
        'rgba(75, 192, 192, 0.3)', // Màu cho Bác sĩ đa khoa
        'rgba(255, 206, 86, 0.3)', // Màu cho Bác sĩ nội trú
        'rgba(255, 99, 132, 0.3)', // Màu cho Bác sĩ phẫu thuật
        'rgba(153, 102, 255, 0.3)' // Màu cho Bác sĩ sản khoa
      ]
    }]
  };
  
  const confige = {
    type: 'doughnut',
    data: datae,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Thống ke số lượng bác sĩ theo bằng cấp'
        }
      }
    },
  };
  
  // Khởi tạo biểu đồ
  const eduChart = new Chart(document.getElementById('eduChart'), confige);
  