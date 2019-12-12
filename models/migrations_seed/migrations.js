const createTables = require('./create_tables');
const dropTables = require('./drop_tables');
const common = require('./migrations_common');

(async() => {
    switch(process.argv[2]) {
        case "create":
            await executeCreateMigration();
            break;
        case "drop":
            await executeDropMigration();
            break;
        case "refresh":
            await executeDropMigration();
            await executeCreateMigration();
            break;
        default:
            console.error("Invalid command.");
            console.info("Process terminated.");
            process.exit(-1);
    }

    process.exit(1)
})();

async function executeCreateMigration() {
    try {
        for (let i = 0; i < createTables.length; i++) {
            await common.simpleQuery(createTables[i]);
        }
    } catch(e) {
        console.log("Creation problems.");
        console.error(e);
    }
    console.log("Tables created.");
}

async function executeDropMigration() {
    try {
        for (let i = 0; i < dropTables.length; i++) {
            await common.simpleQuery(dropTables[i]);
        }
    } catch(e) {
        console.log("Dropping problems.");
        console.error(e);
    }
    console.log("Tables dropped.");
}
