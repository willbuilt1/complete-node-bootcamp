const fs = require('fs');

//Blocking, synchronous

// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `Fact 1 : ${textIn}`;

// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File created sucessfully');

//Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err,data1)=> {
    if (err) {
        console.log("ERROR");
        return
    }
    
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err,data2)=> {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err,data3)=> {
            console.log(data3);
            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8',err => {
                console.log("File created");
            })
        })

    })
})


