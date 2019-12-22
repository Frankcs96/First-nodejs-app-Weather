const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public'))); // Setup static directory
app.set('views', path.join(__dirname, '../templates/views')); //path for hbs
app.set('view engine', 'hbs'); // using hbs
hbs.registerPartials(path.join(__dirname, '../templates/partials')); //partials


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Frank Carmona'
    });

});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Frank Carmona'
    });

});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Frank Carmona'
    });

});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location: data.location,
                forecast: forecastData,
                address: req.query.address
            })

        });

    });

});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []


    });
});


app.get('/help/*', (req, res) => {

    res.render('error', {
        title: '404',
        name: 'Frank Carmona',
        error: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        error: '404 not found',
        name: 'Frank Carmona'
    });

});




app.listen(port, () => {
    console.log('Server running!');
});
