# EmpowerU-backend
Backend service for EmpowerU mobile app

## Checkout our deployed App
https://empoweru-backend-vyxkms4tbq-et.a.run.app

## EmpowerU Endpoint

<details>
           <summary>Login</summary>
Login Endpoint for Authorization in EmpowerU App

**URL**   : https://empoweru-backend-vyxkms4tbq-et.a.run.app/login

**Method**: POST

**Body** (JSON)
```
{
    "username" : "empower",
    "password" : "empowerpassword"
}
```

**Success Response** (JSON)
```
{
    "user": "646as21323das1231sd1wd1g1",
    "status": 200
}
```

**Failed Response** (JSON)
```
{
    "errors": {
        "username": "Username not registered!",
        "password": ""
    }
}
```
</details>
<details>
           <summary>Register</summary>
Register Endpoint for Authorization in EmpowerU App

**URL**: https://empoweru-backend-vyxkms4tbq-et.a.run.app/signup

**Method**: POST

**Body** (JSON)
```
{
    "username" : "empower",
    "password" : "empowerpassword",
    "email" :"empower@mail.com"
}
```

**Success Response** (JSON)
```
{
    "user": "646as21323das1231sd1wd1g1",
    "status": 200
}
```

**Failed Response** (JSON)

User didnt provide Email
```
{
    "errors": {
        "username": "",
        "password": "",
        "email": "Please enter an email"
    }
}
```
User didnt enter a valid Email
```
{
    "errors": {
        "username": "",
        "password": "",
        "email": "Email is not valid!"
    }
}
```
User didnt provide Password
```
{
    "errors": {
        "username": "",
        "password": "Please enter password"
    }
}
```
User didnt provide Username
```
{
    "errors": {
        "username": "Please enter a username",
        "password": ""
    }
}
```
</details>
<details>
           <summary>Get User Data</summary>
GET Endpoint for retrieving user data in EmpowerU App

**URL**   : https://empoweru-backend-vyxkms4tbq-et.a.run.app/datauser

**Method**: GET

**Body** (JSON)
```
{
    "id" : "646as21323das1231sd1wd1g1",
}
```

**Success Response** (JSON)
```
{
    "username": "empower",
    "email": "empower@mail.com",
    "status": 200
}
```

**Failed Response** (JSON)
```
{
    "error": "Invalid ID",
    "status": 400
}
```
</details>
