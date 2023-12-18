const express = require("express");
const multer = require("multer");
const app = express();
const fs = require('fs')
const port = process.env.port || 7890;
let user_filename=""

app.use(express.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
        let path = `uploads/${file.originalname.substring(0,file.originalname.indexOf("."))}_${Date.now()}`;
        fs.mkdirSync(path)
      cb(null, path);
        user_filename=path+"/"+file.originalname
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
}).single("user_file");

app.get("/test", (req, resp) => {

  resp.status(200).send("Test successful");
});

app.post("/uploadImg",upload, (req, resp) => {
  console.log(req.body);
  resp.send(user_filename)
});
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});


//lets see if this is reflected after commit