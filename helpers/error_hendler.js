const errorHandler = (res, error) => {
    res.status(400).send({ message: `xatolik ${error}` })
};

module.exports = {
    errorHandler
}