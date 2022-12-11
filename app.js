var express = require("express");
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var nodeMailer = require('nodemailer');
const { engine } = require("express/lib/application");
var app     = express();

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))


//Set views
app.engine('.hbs', exphbs.engine({ extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views')
app.set('view engine', 'ejs')


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('', (req, res) =>{
    res.render('main')
})

app.get('/about', (req, res) =>{
    res.render('about')
})

app.get('/contact', (req, res) =>{
    res.render('contact')
})

app.post('/send', (req, res) =>{
    const output =`
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'reply.height@gmail.com',
          pass: 'Myp@ss123',
        },
        tls:{
            rejectUnauthorized:false
        }

      });

      let mailOption = {
        from: '"Nodemailer Contact" <reply.height@gmail.com>',
        to: 'vahid.ghsharaf@gmail.com',
        subject: 'Node Contact Request',
        html: output
      };

      transporter.sendMail(mailOption, (error, info) =>{
        if(error){
            return console.log(error)
        }
        console.log('Massage send: %s', info.messageId);
        console.log('Massage URL: %s', nodemailer.getTestMesageUrl(info));

        res.render('contact', {msg:'EMAIL has been sent'})
      })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`listening to port ${port}`))