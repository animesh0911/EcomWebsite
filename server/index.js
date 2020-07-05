const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const fs = require('fs');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const easyinvoice = require('easyinvoice');
const config = require("./config/key");
const {Payment} = require("./models/Payment");
// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
const connect = mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));
app.use('/api/comment', require('./routes/comment'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.post('/api/getPayment', (req, res) => {
  Payment.findOne({"data.paymentID" : req.body.paymentId})
  .exec((err, pay) => {
    res.json({success : true, pay});
  })
})

app.post('/api/invoice', (req, res) => {
  const userData = req.body.pay
  console.log(userData)
  var data = {
    //"documentTitle": "RECEIPT", //Defaults to INVOICE
    "currency": "INR",
    "taxNotation": "gst", //or gst
    "marginTop": 25,
    "marginRight": 25,
    "marginLeft": 25,
    "marginBottom": 25,
    "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
    //"logoExtension": "png", //only when logo is base64
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "client": {
       	"company": "Client Corp",
       	"address": "Clientstreet 456",
       	"zip": "4567 CD",
       	"city": "Clientcity",
       	"country": "Clientcountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    "invoiceNumber": "2020.0001",
    "invoiceDate": "05-01-2020",
    "products": [
        {
            "quantity": "2",
            "description": "Test1",
            "tax": 6,
            "price": 33.87
        },
        {
            "quantity": "4",
            "description": "Test2",
            "tax": 21,
            "price": 10.45
        }
    ],
    "bottomNotice": "Thanyou for shopping with us."
};
 
  //Create your invoice! Easy!
  easyinvoice.createInvoice(data, function (result) {
      //The response will contain a base64 encoded PDF file
      // fs.writeFileSync("invoice.pdf", result.pdf, 'base64', () => {
      // })
      res.json({success : true, result})
  });
  
});

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});