var express = require("express");
const { engine } = require("express/lib/application");
var app     = express();

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))


//Set views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) =>{
    res.render('main')
})

app.listen(3000, () => console.info("listening to port 3000"))