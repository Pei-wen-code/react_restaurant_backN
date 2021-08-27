const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer');
const path = require('path');
const { verifyToken } = require('./utils');
const port = process.env.PORT || 5000;

const app = express();
const storage = multer.diskStorage({
	destination: './public/upload',
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
})
const upload = multer({storage: storage});

const usersController = require('./controllers/users');
const reserveController = require('./controllers/reserve');
const productsController = require('./controllers/products');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'https://reactrestaurantfn.herokuapp.com');
	res.header(
	  'Access-Control-Allow-Headers',
	  'Origin, X-Request-With, Content-Type, Accept, Authorization'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
	next();
});


app.get('/getme', usersController.getMe)
app.post('/register', usersController.register);
app.post('/login', usersController.login);

app.get('/reserve/:date', reserveController.getReserve);
app.post('/reserve', verifyToken, reserveController.createReserve);
app.post('/payment',reserveController.bookingFee);
app.get('/userbooking/:username', reserveController.getUserBooking);
app.get('/userinfo/:username', reserveController.getUserInfo);
app.patch('/updatemail/:id', verifyToken,reserveController.updateMail);
app.patch('/ispaid/:id', verifyToken,reserveController.isPaid);

app.delete('/cancel/:id', verifyToken,reserveController.cancelReserve);
app.patch('/update/:id', verifyToken,reserveController.updateReserve);

app.post('/product', verifyToken, upload.single('file'), productsController.addProduct);
app.get('/product/:type', productsController.getProducts);
app.delete('/product/:id', verifyToken,productsController.deleteProduct);
app.put('/product/update/:id', verifyToken, upload.single('file'), productsController.updateProduct);
app.patch('/product/updatetext/:id', verifyToken,productsController.updateProductText);

app.listen(port, () => {
    console.log(`You are listening at port ${port}`)
});