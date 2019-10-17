const fs = require('fs');
const express = require('express');

const app = express();

//Testing writing own middleware
// const myConfirm = (req, res, next) => {
//     console.log('MIDDLEWARE!!');
//     next();
// }

//Using middleware
// app.use(myConfirm);
app.use(express.json())

// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Server on...',
//         app: 'natours'
//     })
// })

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint...')
// })
//Reading data from JSON file - READ 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
//Returning all data
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            //key matches endpoint value is the data returned
            //tours: tours
            tours // this is equivalent as key and value are the same
        }
    })
})
//returning a particular tour
app.get('/api/v1/tours/:id', (req, res) => {
    // Get the ID requested from the pram
    const id = parseInt(req.params.id); // alternatively * 1
    //find the tour with the id == id requested
    const tour = tours.find(el => el.id === id)

    //If no tour with that id (tour will be undefined) then return a fail
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    //Otherwise return requested data
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})

// Creating a new tour
app.post('/api/v1/tours', (req, res) => {
    //console.log(req.body);

    const newID = tours[tours.length - 1].id + 1
    const newTour = Object.assign({
        id: newID
    }, req.body)

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
        if (err) {
            console.log(err);
        }
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})