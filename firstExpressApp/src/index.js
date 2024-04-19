const express = require('express');
const bodyParser = require('body-parser');

//when we call the function express we create a new express server object
const app = express();//http server object

const PORT = 3000;


app.use(bodyParser.json()); //now this is will act as middleware for all the request
//now every request body can be converted to json // support for json give
app.use(bodyParser.text());
app.use(bodyParser.urlencoded())

function m1(req, res, next){

    console.log('Inside middleware m1');
    console.log("request object",req.user);
    req.user = {
        id:1,
        email:"p@a.com"
    }
    next();
    console.log("after m1 send")
}


function m2(req, res, next){

    console.log('Inside middleware m1');
    console.log("request object",req.user);
    next();
    console.log("after m2 send")
}

app.get('/home', m1, m2, (req, res)=>{

    console.log(req.url," ", req.query)
    console.log("/home called");
    return res.json ({msg:'ok'});
})

app.listen(PORT, ()=>{

    console.log(`Server is listening on PORT ${PORT}`)
})

app.get('/product/:id/rating/:rating', (req, res)=>{
   //:id is variable and product is static
   //:id part is your url params and overall these kinds of routes are called as dynamic routes
    console.log(req.params);
    const pid = req.params.id;
    const rating = req.params.rating;
    return res.json(
        {
            productId : pid,
            rating: rating
        })
})

app.post('/data', (req, res)=>{

    console.log(req.body)
    return res.json({msg:"ok"});
})

//How client can send data to server
/*
1.URL Params -->
                /product/7

2.Request Body -->
                can send sensitive info

3.Query Params -->
                ?key1=value1&key2=value2&key3=value3 
                use res.query to get these params

*/