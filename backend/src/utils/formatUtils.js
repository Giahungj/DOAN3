// utils/formatUtils.js
export const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');  // Đảm bảo ngày luôn có 2 chữ số
    const month = String(d.getMonth() + 1).padStart(2, '0');  // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};

export const formatCurrency = (amount, currency = 'VND') => {
    const options = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    };

    return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'vi-VN', options).format(amount)
}