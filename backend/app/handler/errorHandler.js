class FieldException extends Error {
    constructor(value, message, param, data) {
        super(message)
        this.name = "FieldException"
        this.value = value
        this.param = param
        this.data = data
    }
}

const handleErrors = (err, req, res, next) => {

    if (err instanceof FieldException) {
        return res.status(Number.isNaN(err.value) ? 400 : err.value).json({
            errors: {...err, msg: err.message}
        });
    }

    return res.status(500).json({
        status: 500,
        message: err.message
    });
}

module.exports = {
    handleErrors,
    FieldException
};