const mysql = require('./mysql');
const createTables = require('./create_tables');
const dropTables = require('./drop_tables');
let statementsCount = 0;

switch(process.argv[2]) {
    case "create":
        executeCreateMigration();
        break;
    case "drop":
        executeDropMigration();
        break;
    case "refresh":
        executeDropMigration();
        executeCreateMigration();
        break;
    default:
        console.error("Invalid command.");
        console.info("Process terminated.");
        process.exit(-1);
}

function executeCreateMigration() {
    createTables.forEach(simpleQuery);
    setInterval(() => {
        if (statementsCount >= createTables.length) {
            console.log("Tables created.");
            process.exit(1)
        }
    }, 200);
}

function executeDropMigration() {
    dropTables.forEach(simpleQuery);
    setInterval(() => {
        if (statementsCount >= dropTables.length) {
            console.log("Tables dropepd.");
            process.exit(1)
        }
    }, 200);
}

function simpleQuery(query) {
    mysql.query(query, function(error, results, fields) {
        statementsCount++;
        if (error) {
            if (error.fatal) {
                console.error(error.code, error.sql, error.sqlMessage);
                console.info("Process terminated.");
                process.exit(-2);
            } else {
                console.warn(error.code, error.sql, error.sqlMessage);
            }
        } else {
            console.info("Statement successfully executed.");
        }
    });
}
