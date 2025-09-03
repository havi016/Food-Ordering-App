const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const app = require('./app'); // your Express app
const os = require('os');

const PORT = 3000;

// Function to get the local IP address
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const ip = getLocalIp();

const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://${ip}:${PORT}`);
        });
    })
    .catch(err => console.error(err));