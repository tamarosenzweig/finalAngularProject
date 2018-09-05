const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
// app.get(`/`, (req, res) => {
//     let linkList = "";
//     let resPage=fs.readFileSync("links.html","utf-8");
//    console.log(resPage);
//     fs.readdir(basePath, (err, files) => {
//         files.forEach((file) => {
//             linkList += `<li><a href="/${file}" target="blank">${file}</a></li>`;
//         })
//         res.send(resPage.replace("placeHolder", linkList));
//     });

// });
// fs.readdir(basePath, (err, files) => {
//     files.forEach((file) => {
//         app.use(express.static(`${basePath}/${file}`));
//         app.get(`/${file}`, (req, res) => {
//             res.sendFile(`${basePath}/${file}/index.html`);
//         });
//     })
// });
app.post("/api/login", (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    if (isValidLogin(userName, password)) {
        console.log('valid');
        let currentList = require("./user.json");
        let user = currentList.find(user =>
            user.userName.toLowerCase() == userName.toLowerCase() &&
            user.password.toLowerCase() == password.toLowerCase());
        if (user != null)
            res.status(201).send(user);
        else
            res.status(201).send(null);
    }
    else {
        console.log("bad");
        res.status(400);
    }
})

app.post("/api/register", (req, res) => {
    console.log('aaa');
    let currentUser = req.body;
    console.log(currentUser);
    if (isValidRegister(currentUser)) {
        console.log('valid');
        let currentList = require("./user.json");
        console.log(currentList);
        let user1 = currentList.find(user => user.userName.toLowerCase() == currentUser.userName.toLowerCase());
        if (user1 != null) {
            console.log(-1);
            return;
        }
        let user2 = currentList.find(user => user.password.toLowerCase() == currentUser.password.toLowerCase());
        if (user2 != null) {
            console.log(-2);
            return;
        }
        currentList.push(currentUser);
        fs.writeFileSync("user.json", JSON.stringify(currentList));
        res.status(201).send({ userName: currentUser.userName });
    }
    else {
        console.log("bad");
        res.status(400);
    }

})

isValidLogin = (userName, password) => {
    return isValidUserName(userName) && isValidPassword(password);
}
isValidRegister = (user) => {
    return isValidFirstName(user.firstName) &&
        isValidLastName(user.lastName) &&
        isValidUserName(user.userName) &&
        isValidPassword(user.password) 
}
isValidFirstName = (firstName) => {
    return isValidString(firstName) && isValidLength(firstName, 2, 15) && firstName.match(/^[A-Za-z]+$/);
}
isValidLastName = (lastName) => {
    return isValidString(lastName) && isValidLength(lastName, 2, 15) && lastName.match(/^[A-Za-z]+$/);
}
isValidUserName = (userName) => {
    return isValidString(userName) && isValidLength(userName, 3, 15) && userName.match(/^[A-Za-z]+$/);
}

isValidPassword = (password) => {
    return isValidString(password) && isValidLength(password, 5, 10);
}

isValidString = (str) => {
    return str != null && str != undefined && typeof str == 'string';
}

isValidLength = (str, min, max) => {
    return str.length >= min && str.length <= max;
}
const port = process.env.PORT || 3500;
app.listen(port, () => { console.log(`OK`); });