const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location 
app.set('view engine',  'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


//Setup static directory to serve as public folder
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Okocha Ebube'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Okocha Ebube'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Okocha Ebube',
        helpText: 'This is a help text'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }


    geoCode(req.query.address, (error, {latitude, longitude, location} = {})=>{
         if(error){
            return res.send(error)
         }

         forcast(latitude, longitude, (forcasterror, forcastdata) =>{
            if(forcasterror){
                return res.send({forcasterror})
            }

            res.send({
                forcastdata,
                location,
                address: req.query.address
            })
         })
    })    

})

app.get('/help/*', (req, res)=>{
    res.render('404page', {
        title: '404 Page',
        errorMessage: 'Help article not found',
        name: 'Okocha Ebube'
    })
})


app.get('*', (req, res)=>{
    res.render('404page', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'Okocha Ebube'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})