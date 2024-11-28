// utils/formatUtils.js
export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('vi-VN', options)
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