const express = require('express');
const app = express();

//  register view engine
app.set('view engine', 'ejs')

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





app.listen(3000)