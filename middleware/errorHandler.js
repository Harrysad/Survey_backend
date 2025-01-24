const errorHandler = (err, req, res, next) => {
    console.error('Błąd:', err.message);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Jeśli status jest 200, ustaw 500
    res.status(statusCode).json({
        message: err.message || 'Wewnętrzny błąd serwera',
        stack: process.env.ERROR === 'production' ? null : err.stack, // W produkcji ukryj szczegóły błędu
    });
};

module.exports = errorHandler;
