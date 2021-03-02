db.createUser(
    {
        user: "private_location_user",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "mydatabase"
            }
        ]
    }
);