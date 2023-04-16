const fs = require('fs');
const express = require('express');
const app = express ();

app.use (express.json()); // middleware

const port = 3000;

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    if (id > tours.length){
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }

    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: 'Success',
        data : {
            tour
        }
    });
};
const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id:newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status:'Success',
            data: {
                tour: newTour
            }
        });

    })
};

const deleteTour = (req,res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json ({
            status: 'Failed',
            message: 'Invalid ID'
        });
    }

    res.status(204).json({
        status: 'Success',
        data: null
            
        
    })

};

app.get ('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTour);
app.post ('/api/v1/tours', createTour);
app.delete('/api/v1/tours/:id',deleteTour);



app.listen(port, ()=>{
    console.log(`App Running on port ${port}...`);
});