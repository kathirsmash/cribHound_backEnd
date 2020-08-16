var express = require('express');
var cors = require('cors');
var app = express();
var propertyLists = [
    {id: 1, name: 'Amygdala homes', img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&w=1000&q=80', location: 'Chennai'},
    {id: 2, name: 'Fairbanks Ltd', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&w=1000&q=80', location: 'Pondicherry'},
    {id: 3, name: 'Dale homes', img: 'https://i.pinimg.com/736x/2f/82/39/2f823993ba069d0aa966144e6f20d459.jpg', location: 'Trichy'},
    {id: 4, name: 'Triptico Properties', img: 'https://media.gettyimages.com/photos/idyllic-home-with-covered-porch-picture-id479767332?s=612x612', location: 'Madurai'},
    {id: 5, name: 'MC homes', img: 'https://images.livemint.com/img/2019/04/16/600x338/Kerala_1555430371601.jpg', location: 'Kanyakumari'}
];

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({origin: '*'}));

// gives an array of cribs
app.get('/api/cribs', function(req, res) {
    res.status(200).send(propertyLists);
});

// when a crib object is send to it, it is added to the list
app.post('/api/cribs', function(req, res) {
    req.body.id = parseInt(propertyLists.length) + 1;
    propertyLists.push(req.body);
    res.status(200).send({message: 'CRIB CREATED'});
});

// updates a crib (can change name, location and image url)
app.put('/api/cribs/:id', function(req, res) {
    var cribIndex = propertyLists.findIndex(x => x.id === parseInt(req.params.id));
    if(cribIndex > -1) {
        propertyLists[cribIndex] = req.body;
        propertyLists[cribIndex].id = parseInt(req.params.id);
        res.status(200).send({message: 'CRIB UPDATED'});
    } else {
        res.status(404).send({message: 'CRIB NOT FOUND'});
    }
});

// remove a crib from the list
app.delete('/api/cribs/:id', function(req, res) {
    var cribIndex = propertyLists.findIndex(x => x.id === parseInt(req.params.id));
    if(cribIndex > -1) {
        propertyLists.splice(cribIndex, 1);
        res.status(200).send({message: 'CRIB DELETED'});
    } else {
        res.status(404).send({message: 'CRIB NOT FOUND'});
    }
});

// get info of just one crib. You'll have to use this when clicking on a crib on the front end
app.get('/api/cribs/:id', function(req, res) {
    var cribObj = propertyLists.find(x => x.id === parseInt(req.params.id));
    if(cribObj) {
        res.status(200).send(cribObj);
    } else {
        res.status(404).send({message: 'CRIB NOT FOUND'});
    }
});

app.listen(5000, function() {
    console.log('server lesting at http://localhost:5000');
});