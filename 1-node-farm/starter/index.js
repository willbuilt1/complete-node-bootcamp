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

//funtion that takes the template and the array object. Then replaces the {%placeholder%} with the relevant piece of data 
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate')

//sync method this does not block other lines as only executed once on load
//returns file as a string
const tempOverview =  fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct=  fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempCard=  fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');

//data returns as a string, this is parsed so that it can be accessed by javascript
const data =  fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, {lower:true}));
dataObj.forEach((el, i) => el['slug'] = slugs[i]);
const server = http.createServer((req, res)=>{
    // Destructures returned object and creates consts query and pathname with values equal from the object
    const {query, pathname} = url.parse(req.url, true)

    console.log(url.parse(req.url, true));
//Overview page
    if (pathname === '/' || pathname === '/overview'){
        //gives response code of 200 which is a success and says that html will be output
        res.writeHead(200, {
            'content-type':'text/html'
        })
        //Firstly returns an array with template card with placeholders replaced with info from el(dataobj[i])
        //This is then joined to return one string with all html
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
        // cards then put into temp overview
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output);
//Product page
    } else if(pathname === '/product'){
        res.writeHead(200, {
            'content-type':'text/html'
        })
        const id = dataObj.findIndex(el => el.slug === query.id);
        //gets item that has been clicked on 
        const product = dataObj[id];
        //uses this to put data into product card
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
//API      
    } else if(pathname === '/api'){
        //async method
    
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) =>{
        //     const productData = JSON.parse(data);
        //to show api data
            res.writeHead(200, {
                'content-type':'application/json'
            })
            res.end(data);
        // })
//Not found  
// outputs 404 code and not found message to page
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