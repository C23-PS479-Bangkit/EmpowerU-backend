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

**Method**: POST

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

<details>
           <summary>List Location</summary>
Endpoint to display the list location on the EmpowerU App

**URL/Query**   : https://empoweru-backend-vyxkms4tbq-et.a.run.app/get_list_location

**Method**: GET

**Success Response** (JSON)
```
{
    "status": 200,
    "listLocation": [
        {
            "address": "94XR+3X8, Turida, Sandubaya, Mataram City, West Nusa Tenggara 83233, Indonesia",
            "name": "Aqshal Garage",
            "type": [
                "cafe",
                "food",
                "point_of_interest",
                "establishment"
            ],
            "rating": 0,
            "GMapsID": "ChIJS6x1ERq5zS0RmuaiugTZ6yI",
            "impression": "Netral",
            "urlPhoto": "No Photos"
        },
        {
            "address": "Jl. Raya Kuta, Kuta, Kec. Kuta, Kabupaten Badung, Bali 80361, Indonesia",
            "name": "Pabrik Kata-Kata Joger",
            "type": [
                "shopping_mall",
                "point_of_interest",
                "store",
                "establishment"
            ],
            "rating": 0,
            "GMapsID": "ChIJ3QOhiqVG0i0RsSH9KdWoZlM",
            "impression": "Netral",
            "urlPhoto": "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AZose0lrJlUJGI8RMXaArEojiNlcroH-tHftdrtAY-RqI6y-z9f9bwEALC8wNf0JZjJ524oBxHk8-dbmsiInY5IMMqH2u5HSPcYoXKP7fdneyz9f2iFdcB57lkHcAiGKgqJSQkS15tAlQb2Zo4e2DidS14ge-WTveJxglhLs5jeqgmwwZtsz&key=INSERT_GMAPS_API_KEY"
        }
    ]
}
```

**Failed Response** (JSON)
```
{
    "error": {
        "address": ""
    }
}
```
</details>

<details>
           <summary>Create Location</summary>
Endpoint for Creating Location data in EmpowerU App

**URL**   : https://empoweru-backend-vyxkms4tbq-et.a.run.app/create_location

**Method**: POST

**Body** (JSON)
```
{ 
    "gmapsID":"ChIJjfWrPQnsaS4RL74uCjVlMw0"
}
```

**Success Response** (JSON)
```
{
    "locationID": "ChIJjfWrPQnsaS4RL74uCjVlMw0"
}
```

**Failed Response** (JSON)
```
{
    "error": {
        "location": ""
    }
}
```
</details>

<details>
           <summary>Create Comment</summary>
Endpoint for Creatingin Comment/Review in EmpowerU App

**URL**   : https://empoweru-backend-vyxkms4tbq-et.a.run.app/create_comment

**Method**: POST

**Body** (JSON)
```
{ 
	"locationID": "yourlocationid",
	"userID": "youruserid", 
	"starRating": "",
	"comment": "this is so amazing"
}
```

**Success Response** (JSON)
```
{
    "GMapsID": "ChIJjfWrPQnsaS4RL74uCjVlMw0"
}
```

**Failed Response** (JSON)
```
{
    "error": "comment validation failed: userID: Please enter a User ID, starRating: Path `starRating` is required., comment: Path `comment` is required."
}
```
</details>

<details>
           <summary>Get Location</summary>
GET Endpoint for retrieving location data in EmpowerU App

**URL**   : https://empoweru-backend-vyxkms4tbq-et.a.run.app/get_location

**Method**: GET

**Query** (JSON)
```
https://empoweru-backend-vyxkms4tbq-et.a.run.app/get_location?GMapsID=<Input your GMapsID Here>   
```

**Success Response** (JSON)
```
{
    "address": "Jl. Margonda Raya No.358, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16423, Indonesia",
    "name": "MargoCity",
    "type":[
            "shopping_mall",
            "point_of_interest",
            "establishment"
            ],
    "rating": 7.235294117647059,
    "impression": "Netral"
}
```

**Failed Response** (JSON)
```
{
    "error": "Cannot destructure property 'formatted_address' of 'location' as it is undefined."
}
```
</details>
