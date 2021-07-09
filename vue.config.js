const fs = require('fs')

module.exports = {
    devServer: {
        https: {
            key: fs.readFileSync('./certificates/end-key.pem'),
            cert: fs.readFileSync('./certificates/end-cert.pem'),
        },
        public: 'https://localhost:8086/'
    }
}
