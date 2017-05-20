    let apiUrl;

    if (process.env.NODE_ENV === 'production') {
        apiUrl = "115.159.26.94:3001/api"
    } else {
        apiUrl = "localhost:3001/api"
    }

    const config = {

        apiUrl: apiUrl
    }

    module.exports = config