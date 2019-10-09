const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor() {
        super()
    }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
    console.log('The sale is on!');
})
myEmitter.on('newSale', stock => {
    console.log(`There are ${stock} items on sale right now`);
})
myEmitter.emit('newSale', 7);

/////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('Request received');
})

server.on('close', () => {
    console.log("request closed")
})

server.listen(8000, "127.0.0.1", () => console.log("Waiting for requests"))