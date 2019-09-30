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
const replaceTemplate = (template, product) =>{
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%NUTRI%}/g, product.nutrients);
    output = output.replace(/{%ORIGIN%}/g, product.from);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    //if boolean is fase then it replaces placeholder with class 'not-organic'
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const tempOverview =  fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct=  fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempCard=  fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

const http = require('http');
const url = require('url');
const server = http.createServer((req, res)=>{
    //console.log(url.parse(req.url, true));
    const {query, pathname} = url.parse(req.url, true)


//Overview page
    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
            'content-type':'text/html'
        })
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output);
//Product page
    } else if(pathname === '/product'){
        res.writeHead(200, {
            'content-type':'text/html'
        })
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
//API      
    } else if(pathname === '/api'){
        //async method
    
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) =>{
        //     const productData = JSON.parse(data);
            res.writeHead(200, {
                'content-type':'application/json'
            })
            res.end(data);
        // })
//Not found  
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