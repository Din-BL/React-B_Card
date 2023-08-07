module.exports.formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes} ${month}/${day}/${year}`;
}

module.exports.extractMsg = (msg) => {
    if (msg.includes('duplicate')) {
        const regex = /(?<=")([^"]+)(?=")/;
        const match = msg.match(regex);
        return `${match[1]} is already exists`
    } return msg
}

module.exports.JwtValidator = (document, response, msg) => {
    if (!document) return response.status(404).json(`${msg} doesn't exist`);
}
