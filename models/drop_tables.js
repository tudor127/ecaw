let dropConstraint = "ALTER TABLE creations DROP FOREIGN KEY fk_user_creations",
    dropCreationsTable = "DROP TABLE IF EXISTS creations CASCADE",
    dropUserTable = "DROP TABLE IF EXISTS users CASCADE",
    dropMediaContentCategoriesTable = "DROP TABLE IF EXISTS media_content_categories CASCADE"
    ;

let orderedArray = [dropConstraint, dropCreationsTable, dropUserTable, dropMediaContentCategoriesTable];

module.exports = orderedArray;