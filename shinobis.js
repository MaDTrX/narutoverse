
const multer = require('multer');
const fs  = require('fs')
var path = require('path');
const Shinobi = require('./models/shinobi')


module.exports ={
    index,
    new: newNinja,
    create,
    show,
    edit,
    update
}

function index(req, res) {
    Shinobi.find({}, function(err, shinobis) {
        res.render('shinobis', {shinobis})
    })
}

function newNinja(req, res) {
    res.render('shinobis/new', {title: 'Add Ninja'})
}

function create(req, res) {
    //const shinobi = new Shinobi(req.body)
    var obj = {
       name: req.body.name,
       village: req.body.village,
       age: req.body.age,
       jutsu: req.body.jutsu,
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType:'image/jpg'
        }
    
    console.log(obj.data)
    Shinobi.create(obj, (err, shinobis) => {
        if (err) {
            console.log(err);
            return res.redirect('/shinobis/new')
        }
        else {
             shinobis.save();
            res.redirect(`/shinobis`);
        }
    });
}
    //console.log(shinobi)
function show(req, res) {
    Shinobi.findById(req.params.id, function(err, shinobi) {
        res.render('shinobis/show', {title: `${shinobi.name}`, shinobi})
    })
}
function edit(req, res) {
    const shinobi = {id: req.params.id}
    console.log('HEY')
    res.render('shinobis/edit', {shinobi})
}
function update(req, res) {
    Shinobi.findOneAndUpdate({_id: req.params.id}, req.body, {new: true} , function(err, shinobi) {
        console.log(req.body)
        console.log(req.params.id)
        if (err)
        return res.redirect ('/shinobis/edit')
        res.redirect(`/shinobis/${shinobi._id}`)
    });
}   


