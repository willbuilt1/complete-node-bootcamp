const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getTours = (req, res) => {
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

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
    //console.log(req.body);

    const newID = tours[tours.length - 1].id + 1
    const newTour = Object.assign({
        id: newID
    }, req.body)

    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
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

exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        res.status(400).json({
            status: "Creation Faled",
            message: "No body or name"
        })
    }
    next();
}

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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