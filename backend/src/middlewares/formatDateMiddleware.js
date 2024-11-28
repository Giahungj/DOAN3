const formatDateMiddleware = (req, res, next) => {
    const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
    next();
}