# Backend Routes API Documentation

## Authentication Routes

### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": { ... }
}
```

### Get Profile
```
GET /api/auth/profile
Authorization: Bearer jwt_token
```

### Update Profile
```
PUT /api/auth/profile
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

## Product Routes

### Get All Products
```
GET /api/products?page=1&limit=10&category=Electronics&search=laptop
```

### Get Single Product
```
GET /api/products/:productId
```

### Create Product (Admin)
```
POST /api/products
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "originalPrice": 129.99,
  "category": "Electronics",
  "sku": "PROD-001",
  "stock": 50,
  "images": ["image_url"]
}
```

### Update Product (Admin)
```
PUT /api/products/:productId
Authorization: Bearer jwt_token
Content-Type: application/json
```

### Delete Product (Admin)
```
DELETE /api/products/:productId
Authorization: Bearer jwt_token
```

## Cart Routes

### Get Cart
```
GET /api/cart
Authorization: Bearer jwt_token
```

### Add to Cart
```
POST /api/cart/add
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 1
}
```

### Update Cart Item
```
PUT /api/cart/:productId
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "quantity": 2
}
```

### Remove from Cart
```
DELETE /api/cart/:productId
Authorization: Bearer jwt_token
```

### Clear Cart
```
DELETE /api/cart
Authorization: Bearer jwt_token
```

## Order Routes

### Create Order
```
POST /api/orders
Authorization: Bearer jwt_token
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

### Get User Orders
```
GET /api/orders
Authorization: Bearer jwt_token
```

### Get Order Details
```
GET /api/orders/:orderId
Authorization: Bearer jwt_token
```

### Cancel Order
```
PUT /api/orders/:orderId/cancel
Authorization: Bearer jwt_token
```

## Admin Routes

### Get Dashboard Stats
```
GET /api/admin/dashboard/stats
Authorization: Bearer jwt_token (Admin required)
```

### Get All Orders
```
GET /api/admin/orders?page=1&limit=10
Authorization: Bearer jwt_token (Admin required)
```

### Get All Users
```
GET /api/admin/users?page=1&limit=10
Authorization: Bearer jwt_token (Admin required)
```

### Update Order Status
```
PUT /api/admin/orders/:orderId/status
Authorization: Bearer jwt_token (Admin required)
Content-Type: application/json

{
  "status": "shipped"
}
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
