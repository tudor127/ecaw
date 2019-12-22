const common = require('./migrations_common');
const passwordHash = require('password-hash');
let query = "";

let seedUsers = [
    {
        username: "test",
        passwd: "test"
    }
];

let seedCreations = [
    {
        user_id: 1,
        project_name: "test project",
        content: ""
    }
];

let seedMediaContentCategories = [
    {
        category_name: "Cats",
        url: "https://api.thecatapi.com/v1/images/search",
        api_key: "57873579-04bb-4fb3-9639-b5d629da4e95"
    },
    {
        category_name: "Dogs",
        url: "https://random.dog/woof.json",
        api_key: ""
    }
];

Promise.all([
    (async() => {
        for (let i = 0; i < seedUsers.length; i++) {
            console.log("Creating user...");
            query = "INSERT INTO users (username, passwd) VALUES(?, ?)";
            await common.simpleQuery(query, [seedUsers[i].username, passwordHash.generate(seedUsers[i].passwd)]);
        }
        console.log("Users seeded.");
    })(),
    (async() => {
        for (let i = 0; i < seedCreations.length; i++) {
            console.log("Creating creation...");
            query = "INSERT INTO creations (user_id, project_name, content) VALUES(?, ?, ?)";
            await common.simpleQuery(query, [seedCreations[i].user_id, seedCreations[i].project_name, seedCreations[i].content]);
        }
        console.log("Creations seeded.");
    })(),
    (async() => {
        for (let i = 0; i < seedMediaContentCategories.length; i++) {
            console.log("Creating media content category...");
            query = "INSERT INTO media_content_categories (category_name, url, api_key) VALUES(?, ?, ?)";
            await common.simpleQuery(query, [seedMediaContentCategories[i].category_name, seedMediaContentCategories[i].url, seedMediaContentCategories[i].api_key]);
        }
        console.log("Media content categories seeded.");
    })()
]).catch(error => {
    console.error("Error");
    console.error(error);
    process.exit(-1);
}).then(message => {
    console.log("Success.");
    console.log(message);
    process.exit(1);
});
