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

module.exports.randomPassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialChars = '#$@!%&*?_-';

    while (true) {
        let password = '';
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        for (let i = 0; i < 4; i++) {
            password += digits[Math.floor(Math.random() * digits.length)];
        }
        password += specialChars[Math.floor(Math.random() * specialChars.length)];
        for (let i = 0; i < 3; i++) {
            const allCharacters = lowercase + uppercase + digits + specialChars;
            password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
        }

        // Shuffle the password characters
        password = password.split('').sort(() => Math.random() - 0.5).join('');

        // Check if the generated password matches the regex
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9].*[0-9].*[0-9].*[0-9])(?=.*[#$@!%&*?_-]).{8,30}$/;
        if (regex.test(password)) {
            return password;
        }
    }
}

