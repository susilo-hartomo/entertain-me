const ValidationMoviesCollection = (db, callback) => {
    db.createCollection("Movies", {
        'validator': {
            $jsonSchema: {
                bsonType: "object",
                required: ["title", "overview", "poster_path", "popularity", "tag"],
                properties: {
                    'title': {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    'overview': {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    'poster_path': {
                        bsonType: "string",
                        description: "must be a string and is required"
                    },
                    'popularity': {
                        bsonType: "double",
                        description: "must be a string and is required"
                    },
                    'tag': {
                        bsonType: "array",
                        description: "must be a string and is required"
                    },
                }
            },
            
        }
    },
        function (err) {
            console.log('err: ', err);
            console.log("Collection created.");
            callback(err);
        }
    )
};

module.exports = {
    ValidationMoviesCollection
};