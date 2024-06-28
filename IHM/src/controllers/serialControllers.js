const { addData } = require('../views/ui');
const { connectAndSendMessage } = require('./serialInit');

let currentSpeed = 100;

async function sendMessage(message) {
    try {
        const port = await connectAndSendMessage();
        if (port) {
            port.write(`${message},${currentSpeed}e`, (err) => {
                if (err) {
                    console.error('Error on write:', err.message);
                }
            });
        } else {
            console.error('Serial port is not connected.');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

function setCurrentSpeed(speed) {
    currentSpeed = speed;
}

module.exports = { sendMessage, setCurrentSpeed };
