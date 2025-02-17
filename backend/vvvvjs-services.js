
const fs = require('fs');

module.exports = {
  createSubpatch: function(req, res) {
    const match = /filename=(.+)$/.exec(decodeURIComponent(req.url));
    console.log(decodeURIComponent(req.url));
    const filename = VVVVContext.DocumentRoot+"/"+match[1];

    fs.open(filename, "wx", function(err, fd) {
      if (err) {
        console.log(err);
        let message = "An error occured."
        if (err.code==="EEXIST")
          message = "The file already exists."
        else if (err.code==="ENOENT")
          message = "Can't create that file. Is the path correct?";
        //res.statusCode = 405;
        res.write(JSON.stringify({status: "ERROR", message: message}));
        res.end();
        return;
      }
      res.write(JSON.stringify({status: "OK"}));
      res.end();
    })
  }
}
