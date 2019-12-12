const mysql = require('../mysql');

function simpleQuery(query, values = []) {
    return new Promise((resolve, reject) => {
        mysql.query(query, values, function(error, results, fields) {
            if (error) {
                if (error.fatal) {
                    console.error(error.code, error.sql, error.sqlMessage);
                    console.info("Process terminated.");
                    reject(error);
                    process.exit(-2);
                } else {
                    resolve(results);
                    console.warn(error.code, error.sql, error.sqlMessage);
                }
            } else {
                console.info("Statement successfully executed.");
                resolve(results);
            }
        });
    });
}

module.exports = {simpleQuery};
