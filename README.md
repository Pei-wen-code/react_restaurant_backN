<p align="center">
<img alt="favicon" src="https://res.cloudinary.com/pei7pei8luobo/image/upload/v1630420930/vegetarian_gzpvzo.svg" width="200" height="200" >
</p>

# Restaurant project - backend
This is an SPA website for booking a table in an imagined vegan restanrant, using React as frontend and Node.js as backend. Foodies can simply browse the menu without login and they need to register as members if they want to make a reservation. On the other hand, admin can manage not only bookings from the customers but also content of the menu.

<img width="1425" alt="homepage" src="https://user-images.githubusercontent.com/58638019/131510974-315a3e5e-9c26-420e-baec-c861a585f06a.png">

# Demo
[Demo](https://reactrestaurantfn.herokuapp.com/#/).

You may use the admin's login. Username: admin, password: admin12345678.

:bangbang: I would be really appreciate if you just delete the picture you uploaded when you want to edit menu. This is due to the fact that I need those already-exist pictures to be displayed in the menu page. Thank you in advance. :smiley:


<img width="1417" alt="login" src="https://user-images.githubusercontent.com/58638019/131512764-b8afc0b4-489c-4c28-a6f1-3dd85c34b7f1.png">

Or simply create a new account by registration.

<img width="1419" alt="register" src="https://user-images.githubusercontent.com/58638019/131512782-56af10b9-534e-49fd-bb34-488ae5102bf0.png">

# About this project
This project is inspired by [one of my assignment](https://github.com/Lidemy/mentor-program-4th-Pei-wen-code/tree/master/homeworks/week6) when I was learning in a [coding mentorship programme](https://github.com/Lidemy/mentor-program-4th-Pei-wen-code) with Lidemy. That is a simple homepage of an imagined restaurant where only HTML and CSS are used. Having been learning React and Node.js, I decide to create a SPA website where customers can make reservation without spending time to call restaurants. On the other hand, restaurant owners can save time to look for the availability when customers phone in, meaning they will have more time to be creative in their cuisine.

# Fatures
BASE_URL: https://agile-taiga-49676.herokuapp.com

* User Authentication
  * get/getme // Verify the users with JWT
  * post/register // Register
  * post/login // Login
  
* Product
  * get/product/:type // Get items from database according to the choosen type
  * post/product // Create new items in the menu
  * delete/product/:id // Delete items based on id of items
  * put/product/update/:id // Update items's information (include file) based on id of items
  * patch/product/updatetext/:id // Update items's information (does NOT include file) based on id of items

* Reservation
  * get/reserve/:date // Get booking information according to the choosen date
  * post/reserve // Create new reservation
  * post/payment// Use Stripe API to create payment-related data made by customers
  * get/userbooking/:username // Get specific booking history according to the users logged in
  * get/userinfo/:username // Get specific user information according to the users logged in
  * patch/updatemail/:id // Update email according to the users logged in
  * patch/ispaid/:id // Update payment status once payment is made successfully via Stripe API
  * delete/cancel/:id // Delete existing booking according to the id choosen
  * patch//update/:id // Update existing booking according to the id choosen

# Technical skills
* Node.js // Backend environment
* Express // Fast and minimalist framework for Node.js to create APIs
* MySQL // Storing data including information about users, reservation and menu
* Sequelize // Using ORM to manage database like managing objects in JavaScript
* Sequelize-cli // Creating models easily with migration
* bcrypt // Hashing password and password authentication
* jsonwebtoken // User authentication using RSA
* multer // A middlewear for handling file upload
* cloudinary // A cloud service offering API for image management
* Stripe // An API handling payment made from customers
* uuid // Create idempotency key for safely retry payment request
* Heroku // Deployed to heroku


# Declaration
This website is only for prectice and learning, not for any business use.

# Installing
1. Clone this repository
```javascript
git clone https://github.com/Pei-wen-code/react_restaurant_backN
```

2.Install packages
```javascript
npm install
```

3.Run this project locally
```javascript
node index.js
```

