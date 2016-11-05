var express = require('express');
var router = express.Router();

//Mail Section
var helper = require('sendgrid').mail;


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'KnightProgramming::Home'
    });
}).post('/contact', function(req, res) {
    var from_email = new helper.Email('noreply@knightprogramming.com');
    var to_email = new helper.Email('jacob.knight@knightprogramming.com');
    var subject = req.body.fromName + ":" + req.body.subject;
    var content = new helper.Content('text/plain', req.body.textbox + " Email " + req.body.fromEmail);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')("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");
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });

    res.redirect('/');
});

router.get('/projects/', function(req, res) {
    res.render('projects', {
        title: 'KnightProgramming::Projects'
    });
});

router.get('/people/', function(req, res) {
    res.render('people', {
        title: 'KnightProgramming::People'
    });
});

router.get('/about/', function(req, res) {
    res.render('about', {
        title: 'KnightProgramming::About'
    });
});
module.exports = router;
