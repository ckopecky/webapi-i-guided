const express = require('express');
const Hubs = require('./data/hubs-model'); //import the database model
const server = express(); //invocation of express

server.use(express.json()); //this turns things into JSON

server.get('/', (req, res) => { //sanity check
    res.send({Success: "Sanity check..."});
})

// server.get('/api/hubs', (req, res) => { //GET request
//     Hubs.find()
//         .then(response => {
//             res.status(200).json(response);
//         })
//         .catch(err => {
//             res.status(500).json({Error: err.message});
//         })
// })

server.get('/api/hubs', async (req, res) => {
    try{
        const hubs = await Hubs.find();
        if(hubs) {
            res.status(200).json(hubs);
        } else {
            res.status(404).json({Error: "No hubs found"});
        }
    } catch (error) {
        res.status(500).json({Error: error});
    }
})

server.listen(5000, ()=> {
    console.log("Server listening on port 5000");
})