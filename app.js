const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Blog  = require('./models/blog')

//  register view engine
app.set('view engine', 'ejs')


//connect to mongodb
const DBURI = "mongodb+srv://kemi:kemi123@cluster0.3jtd3.mongodb.net/kemi?retryWrites=true&w=majority";
mongoose.connect(DBURI, {useNewUrlParser:true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err))
//serving static files & middleware
app. use(express.static('public'))

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) =>{
    const blog = new Blog({
        title: "new blog 3  ",
        snippet: "about blog",
        body: "more about new blog"
    });
    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
     
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) =>{
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    });
})

//get single blog by id
app.get('/single-blog', (req, res) => {
    Blog.findById('606b7a864408dc1a008094fb')
    .then((result) =>{
        res.send(result);
    })
    .catch((err) => {
        console.log(err)
    })
})
//routing
app.get('/', (req, res) =>{
    const blogs = [
        {title: "fun stuff to learn", snippet: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem est similique ut reiciendis quo, maiores, corrupti culpa quaerat illo animi ullam dolorum fuga iusto labore at. Voluptatum officia quasi ipsam?`},
        {title: "fun places to visit", snippet: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem est similique ut reiciendis quo, maiores, corrupti culpa quaerat illo animi ullam dolorum fuga iusto labore at. Voluptatum officia quasi ipsam?`},
        {title: "food tourism locations", snippet: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem est similique ut reiciendis quo, maiores, corrupti culpa quaerat illo animi ullam dolorum fuga iusto labore at. Voluptatum officia quasi ipsam?`},
    ]
    res.render('index', { title: "home", blogs });
})

app.get('/about', (req, res) =>{ 
    res.render('about', { title: "about" });

})

app.get('/blogs/create', (req, res) =>{
    res.render('create', { title: "create blog" });
})

// redirect
app.get('/about-us', (req, res) =>{
    res.redirect('/about')
}) 

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: "404 page" }) ;
});  





