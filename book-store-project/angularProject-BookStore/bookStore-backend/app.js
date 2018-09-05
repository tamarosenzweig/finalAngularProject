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
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));

// var multer = require('multer')
// var upload = multer({ dest: 'uploads/' })
// const uuidv4 = require('uuid/v4');

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
          //  removeImage(currentUser.profileImageUrl)
          //  res.send({ userId: -1 });
            return;
        }
        let user2 = currentList.find(user => user.password.toLowerCase() == currentUser.password.toLowerCase());
        if (user2 != null) {
            console.log(-2);
          //  removeImage(currentUser.profileImageUrl)
           // res.send({ userId: -2 });
            return;
        }
      //  currentUser.id = currentList.length == 0 ? 1 : Math.max(...currentList.map(user => user.id)) + 1;
        currentList.push(currentUser);
        fs.writeFileSync("user.json", JSON.stringify(currentList));
        res.status(201).send({ userName: currentUser.userName });
    }
    else {
        console.log("bad");
        res.status(400);
    }

})
// const handleError = (err, res) => {
//     console.log("handle err");
//     res
//         .status(500)
//         .contentType("text/plain")
//         .end("Oops! Something went wrong!");
// };

// app.post("/api/upload", upload.single("file" /* name attribute of <file> element in your form */),
//     (req, res) => {
//         console.log("upload");
//         console.log(__dirname);  
//         const tempPath = req.file.path;
//         console.log(tempPath);
//         const newFilename = `${uuidv4()}.JPG`;
//         console.log(newFilename);
//         const targetPath = path.join(__dirname, `./uploads/${newFilename}`);
//         console.log(targetPath);
//         fs.rename(tempPath, targetPath, err => {
//             if (err)
//                 return handleError(err, res);
//             console.log("rename");

//             res.status(200).send({ newFilename: newFilename });
//         });
//     });

// const basePath = path.join(__dirname);

// app.get(`/uploads`, (req, res) => {
//     let fileName = req.query.fileName;
//     res.sendFile(`${basePath}/uploads/${fileName}`);
// });

// // Assuming that 'path/file.txt' is a regular file.
// removeImage=(fileName)=>{
//     fs.unlink(`${basePath}/uploads/${fileName}`, (err) => {
//         if (err) throw err;
//         console.log('path/file.txt was deleted');
//       });
// }


isValidLogin = (userName, password) => {
    return isValidUserName(userName) && isValidPassword(password);
}
isValidRegister = (user) => {
    return isValidFirstName(user.firstName) &&
        isValidLastName(user.lastName) &&
        isValidUserName(user.userName) &&
        isValidPassword(user.password) 
       // isValidImage(user.profileImageUrl);
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

// isValidImage = (profileImageUrl) => {
//     return isValidString(profileImageUrl);
// }
isValidString = (str) => {
    return str != null && str != undefined && typeof str == 'string';
}

isValidLength = (str, min, max) => {
    return str.length >= min && str.length <= max;
}
const port = process.env.PORT || 3500;
app.listen(port, () => { console.log(`OK`); });