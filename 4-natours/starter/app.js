const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Testing writing own middleware
const timeRequested = (req, res, next) => {
    req.timeRequested = new Date().toISOString();

    next();
}

//Using middleware
// app.use(myConfirm);
app.use(express.json());
app.use(morgan('dev'))
app.use(timeRequested)

//Reading data from JSON file - READ 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        timeRequested: req.timeRequested,
        results: tours.length,
        data: {
            //key matches endpoint value is the data returned
            //tours: tours
            tours // this is equivalent as key and value are the same
        }
    })
}

const getTour = (req, res) => {
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
}

const createTour = (req, res) => {
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
}

const updateTour = (req, res) => {
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
            tour: "Updated tour goes here"
        }
    })
}

const deleteTour = (req, res) => {
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
    res.status(204).json({
        status: 'success',
        data: null
    })
}

// app.get('/api/v1/tours', getTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

app.route('/api/v1/tours')
    .get(getTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})