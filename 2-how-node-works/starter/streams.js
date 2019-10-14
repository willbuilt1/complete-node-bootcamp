const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 1, only good for personal use cases as if file too big or too many requests the application will freeze
    // fs.readFile("test-file.txt", (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // })

    //solution 2: Streams
    // const readable = fs.createReadStream('test-file.txt')
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not found')
    // })

    //solution 3
    //This solves 'back-pressure' of data being read quicker than it can be written.
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);


})

server.listen(8000, '127.0.0.1', () => {
    console.log("Server on...");
})