const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser')
const path = require('path')
const dotenv = require('dotenv');
const shortid = require('shortid')
const Razorpay = require('razorpay')
const cors = require('cors')
const bodyParser = require('body-parser')
dotenv.config({path:path.join(__dirname,"config/config.env")});


app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname,'uploads') ) )

app.use(cors())
app.use(bodyParser.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_ayJezilwRTEPYG',
	key_secret: 'tDRtFM2leydH5czBHmIqB3Z0'
})

const auth = require('./routes/auth')
const publish = require('./routes/publish')
const payment = require('./routes/payment')
const myprofile = require("./routes/myprofile");
const viewers = require("./routes/viewers")
// const purchase = require("./routes/purchase");
const directorpayment = require("./routes/directorpayment");
const script = require("./routes/script");
const contact = require("./routes/contact");
const directorprofile = require("./routes/directorprofile");
const Adminlogin = require('../backend/Admin/routes/Adminlogin')
const AdminAlldetails = require('../backend/Admin/routes/Userdetails')

app.use('/api/v1/',auth);
app.use('/api/v1/',publish);
app.use("/api/v1/", myprofile );
app.use('/api/v1/', payment);
app.use("/api/v1/", viewers);
// app.use("/api/v1/", purchase);
app.use("/api/v1/", directorpayment);
app.use("/api/v1/", script);
app.use("/api/v1/", contact);
app.use("/api/v1/", directorprofile);
app.use("/Admin/api/v1/",Adminlogin)
app.use("/Admin/api/v1/",AdminAlldetails)




if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

app.use(errorMiddleware)

module.exports = app;