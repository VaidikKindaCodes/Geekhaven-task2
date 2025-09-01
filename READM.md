ni hao <br>
vaidik kathal IIT2024005

frontend - https://geekhaven-task2.vercel.app/
backend - https://vercel.com/vaidik-kathals-projects/geekhaven-task2-bo82
<br>
📌 Auth Routes

POST /api/auth/signup
{ body: { username, email, password } } → registers a new user

POST /api/auth/signin
{ body: { email, password } } → logs in a user, returns token + user details

GET /api/auth/logout → logs out the user (clears session on client side)

📌 Product Routes

GET /api/products → fetches all products

POST /api/products
{ body: { ...productData } } → creates a new product and updates total products list

POST /api/products/remove
{ body: { productId } } → removes a product by ID, also removes it from all users’ carts/liked lists and total products

GET /api/products/populated → fetches total products populated with full product data

📌 Cart Routes

POST /api/cart/add
{ body: { userId, productId } } → adds a product to the user’s cart

POST /api/cart/remove
{ body: { userId, productId } } → removes a product from the user’s cart

GET /api/getcart?userId={userId} → fetches the user’s cart with populated product details

📌 Liked Products Routes

POST /api/liked/add
{ body: { userId, productId } } → adds a product to the user’s liked list

POST /api/liked/remove
{ body: { userId, productId } } → removes a product from the user’s liked list

GET /api/getliked?userId={userId} → fetches the user’s liked products with populated details

📌 Admin / Seeding Routes

Each user has a role attached to it the admin can only send a succesfull seed req to the backend 

POST /api/seed
{ body: { dataLink, userId } } → fetches product data from a link and seeds the database (admin only)

📌 Frontend Routes

/ → Home page (default landing page)

/about → About page

/auth

/auth/signin → Sign-in page

/auth/signup → Sign-up page

/auth/logout → Logout functionality

/cart → User’s shopping cart page

/checkout → Checkout page for placing orders

/dashboard → User dashboard

/logs → Logs or activity page

/products → Products listing page

/sellers → Sellers page


