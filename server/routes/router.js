const express=require('express');
const route = express.Router(); 
const controller = require('../controller/controller')
const internship = require('../model/model');

route.get('/',async (req,res)=>{
    try {
        const response = await internship.find();
        res.render('index',{users:response});
    } catch(err) {
        res.send(err);
    }  
})

route.get('/add_user',(req,res)=>{
    res.render('add_user');
})

route.get('/update_user/:id',async(req,res)=>{
    const response = await internship.findById(req.params.id);
    console.log(response);
    res.render('update_user', {data: response});
})

route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.post('/api/user/:id',controller.update);
route.delete('/api/users/:id',controller.deleteUser);

module.exports = route