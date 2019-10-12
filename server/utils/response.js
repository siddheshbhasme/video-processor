var HttpStatus = require('http-status-codes');

const messages = {
    GET_SUCCESS: "Succeesully fetched item(s)",
    NOT_FOUND: "Item not found or you are not authorized to access it",
    UPLOAD_SUCCESS: "Successfully uploaded video file",
    POST_SUCCESS: "Successfully saved details",
    DELETE_SUCCESS: "Successfully deleted item",
    NO_DELETE: "Could not delete item, as id is invalid or user not authorized",
    AUTH_ERROR: "Authorization failed, please check Authorization header value",
    ERROR_OCCURED: "Some error occured during processing request"
}

const success = (code, data, message) => {
    return {
        statusCode: code || HttpStatus.OK,
        data,
        message
    }
}

const error = (code, data, message) => {
    return {
        statusCode: code || HttpStatus.INTERNAL_SERVER_ERROR,
        details: data,
        message
    }
}

module.exports = {
    success,
    error,
    messages
}