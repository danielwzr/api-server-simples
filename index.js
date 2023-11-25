const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs')

app.use(express.urlencoded({ extended: true }));
app.listen(8080);

app.get("/", (req, res) => {
    res.send(`<form method="post" enctype="multipart/form-data" action="/upload">
    <input type="file" name="file">
    <input type="submit" value="Submit">
</form>`)
});

app.get("/api", (req, res) => {
    res.send("api")
});

app.post("/", (req, res) => {
    console.log(req)
    res.send("post realizado")
});

app.post("/api", (req, res) => {
    console.log(req)
    res.send("post realizado")
});






const multer = require("multer");

const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const uploadDir = path.join(__dirname, "uploads");

const upload = multer({
  dest: uploadDir
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    if (path.extname(req.file.originalname).toLowerCase() === ".png" || path.extname(req.file.originalname).toLowerCase() === ".jpg" || path.extname(req.file.originalname).toLowerCase() === ".jpeg"  ) {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);