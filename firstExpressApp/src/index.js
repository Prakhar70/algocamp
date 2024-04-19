const express = require('express')

//when we call the function express we create a new express server object
const app = express();//http server object

const PORT = 3000;

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

    console.log("/home called");
    return res.json ({msg:'ok'});
})

app.listen(PORT, ()=>{

    console.log(`Server is listening on PORT ${PORT}`)
})