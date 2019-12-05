let createUserTable = `CREATE TABLE IF NOT EXISTS USERS (
    id INT (6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR (30) NOT NULL,
    passwd CHAR (64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`,
    createCreationsTable = `CREATE TABLE IF NOT EXISTS creations (
    user_id INT (6) UNSIGNED,
    project_name VARCHAR (30),
    content BLOB,
    PRIMARY KEY(user_id, project_name),
    CONSTRAINT fk_user_creations FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE
)`;

let orderedArray = [createUserTable, createCreationsTable];

module.exports = orderedArray;