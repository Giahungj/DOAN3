// Hàm để submit form (ES6)
const submitDoctorForm = (formId) => {
    const form = document.getElementById(formId)
    form.action = ''
    form.action = '/admin/bac-si/thong-tin'
    form ? form.submit() : console.error(`Form không tồn tại: ${formId}`)
}

// const calendar = document.querySelector('.calendar');
// const monthYear = document.getElementById('monthYear');
// const dates = document.getElementById('dates');
// const prevButton = document.getElementById('prev');
// const nextButton = document.getElementById('next');

// const currentDate = new Date();

// const renderCalendar = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     monthYear.innerText = `${month + 1} / ${year}`;

//     // Loại bỏ các ngày đầu tiên
//     dates.innerHTML = '';

//     // Lấy ngày đầu của tháng
//     const firstDay = new Date(year, month, 1).getDay();
//     const lastDate = new Date(year, month + 1, 0).getDate();

//     console.log('Ngày đầu: ', firstDay)
//     for (let date = 1; date <= Math.floor(lastDate/7)+1; date++) {
//         const dateRow = document.createElement('div')
//         dateRow.classList.add('row')
//         dateRow.classList.add(`row${date}`)
//         dates.appendChild(dateRow)
//     }
//     // Fill empty cells before the first date
//     for (let i = 0; i < firstDay; i++) {
//         const emptyCell = document.createElement('div');
//         emptyCell.classList.add('col', 'date');
//         dates.appendChild(emptyCell);
//     }

//     const integerPart = Math.floor(lastDate / 7) + 1;
//     console.log(integerPart)
//     // Fill the calendar with dates
//     for(let date = 1; date <= lastDate; date++) {
//         const dateCell = document.createElement('div')
//         dateCell.classList.add('col')
//         dateCell.innerText = date;
        
//         // Add click event to each date cell
//         dateCell.addEventListener('click', () => {
//             const activeDate = dates.querySelector('.active');
//             if (activeDate) {
//                 activeDate.classList.remove('active');
//             }
//             dateCell.classList.add('active');
//             // Xử lý sự kiện khi nhấp vào ngày
//             console.log(`Ngày đã chọn: ${date}/${month + 1}/${year}`);
//         });

//         dates.appendChild(dateCell);
//     }

//     // for (let date = 1; date <= 7%lastDate-2; date++) {

//     //     const dateCell = document.createElement('div');
//     //     dateCell.classList.add('col', 'date');
//     //     dateCell.innerText = date;

//     //     // Add click event to each date cell
//     //     dateCell.addEventListener('click', () => {
//     //         const activeDate = dates.querySelector('.active');
//     //         if (activeDate) {
//     //             activeDate.classList.remove('active');
//     //         }
//     //         dateCell.classList.add('active');
//     //         // Xử lý sự kiện khi nhấp vào ngày
//     //         console.log(`Ngày đã chọn: ${date}/${month + 1}/${year}`);
//     //     });

//     //     dates.appendChild(dateCell);
//     // }
// };

// prevButton.addEventListener('click', () => {
//     currentDate.setMonth(currentDate.getMonth() - 1);
//     renderCalendar();
// });

// nextButton.addEventListener('click', () => {
//     currentDate.setMonth(currentDate.getMonth() + 1);
//     renderCalendar();
// });

// // Initial render
// renderCalendar();
