module.exports = (err, req, res, next) => {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || "Server Error";

    if (Array.isArray(message)) {
        return res.status(status).json({ message: message });
    }

    res.status(status).json({ message: message });
};
