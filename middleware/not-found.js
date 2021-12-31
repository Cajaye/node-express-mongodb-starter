const notFoundMiddleware = (req, res) => {
    res.status(404).json({ message: 'Cannot find the requested resource' })
}

module.exports = notFoundMiddleware