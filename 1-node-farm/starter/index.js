const fs = require('fs');

//Blocking, synchronous

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `Fact 1 : ${textIn}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File created sucessfully');

//Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err,data1)=> {
//     if (err) {
//         console.log("ERROR");
//         return
//     }
    
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2)=> {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err,data3)=> {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8',err => {
//                 console.log("File created");
//             })
//         })

//     })
// })


//SERVER

//sync method this does not block other lines as only executed once on load
const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const productData = JSON.parse(data);

const http = require('http');
// const url = require('url');
const server = http.createServer((req, res)=>{
    const pathName = req.url;

    if (pathName === '/' || pathName === '/overview'){
        res.end('This is the overview')
    } else if(pathName === '/product'){
        res.end('This is the product')
    } else if(pathName === '/api'){
        //async method
    
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) =>{
        //     const productData = JSON.parse(data);
            res.writeHead(200, {
                'content-type':'application/json'
            })
            res.end(data);
        // })
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end('<h2>Page not found</h2>')
    }
});

server.listen(8000, '127.0.0.1', () =>{
    console.log('listening to requests on port 8000');
});