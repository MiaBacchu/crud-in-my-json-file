let fakeData;
const fs = require('fs');
fs.readFile('fakeData/fakeData.json',(err,data)=>{   
    fakeData = JSON.parse(data);
})
// get all users
module.exports.allUserGet=(req,res)=>{
    res.send(fakeData);
}
// get random users
module.exports.randomUserGet=(req,res)=>{
    const newId = parseInt(Math.random()*fakeData.length);
    const randomUser = fakeData.find(user=>user.id=== newId);
    res.send(randomUser);
}
// save a random user
module.exports.randomUserPost=(req,res)=>{
    if (req.body.id && req.body.gender && req.body.name && req.body.contact && req.body.address && req.body.photoUrl && req.get('Content-Type') === 'application/json' && typeof req.body.id === 'number') {
        const randomUser = req.body;
        fakeData.push(randomUser);
        fs.writeFile('fakeData/fakeData.json',JSON.stringify(fakeData),(err,data)=>{
            res.end();
        })
    }else{
        res.send('please send a valid json file');
    }
}
// delete a random user
module.exports.randomUserDelete=(req,res)=>{
    const newId = req.body.id;
    if (newId && typeof newId === 'number' && req.get('Content-Type') === 'application/json') {
        const newUsers = fakeData.filter((user)=>Number(user.id) !== Number(newId));
        newUsers.map((user,index)=>{
            user.id = index;
        })
        fs.writeFile('fakeData/fakeData.json',JSON.stringify(newUsers),(err,data)=>{
            res.end();
        })
    }else{
        res.send('please send a valid id in json format')
    }
}
// update a random user
module.exports.randomUserUpdate=(req,res)=>{
    const newId = req.body.id;
    const newUser = fakeData.find((user)=>Number(user.id) === Number(newId));
    if (newId && newUser && typeof newId === 'number' && req.get('Content-Type') === 'application/json') {
    req.body.id ? newUser.id = req.body.id : null;
    req.body.gender ? newUser.gender = req.body.gender : null;
    req.body.name ? newUser.name = req.body.name : null;
    req.body.contact ? newUser.contact = req.body.contact : null;
    req.body.address ? newUser.address = req.body.address : null;
    req.body.photoUrl ? newUser.photoUrl = req.body.photoUrl : null;
    fs.writeFile('fakeData/fakeData.json',JSON.stringify(fakeData),(err,data)=>{
        res.end();
    })
    }else{
        res.send('please send a valid json format with id')
    }
}
// bulk-update random user
module.exports.bulkUserUpdate=(req,res)=>{
    const newUsers = req.body;
    console.log(newUsers instanceof Array);
    if (newUsers && newUsers instanceof Array && req.get('Content-Type') === 'application/json') {
        newUsers.map(user =>{
            const newUser = fakeData.find((data)=>Number(data.id) === Number(user.id));
            if (newUser) {
                user.id ? newUser.id = user.id : null;
                user.gender ? newUser.gender = user.gender : null;
                user.name ? newUser.name = user.name : null;
                user.contact ? newUser.contact = user.contact : null;
                user.address ? newUser.address = user.address : null;
                user.photoUrl ? newUser.photoUrl = user.photoUrl : null;
                fs.writeFile('fakeData/fakeData.json',JSON.stringify(fakeData),(err,data)=>{
                    res.end();
                });
            }else{
                res.send('please send a array of object with valid id')
            }
        });
    }else{
        res.send('please send a array of object with json format')
    }
}
