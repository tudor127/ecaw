class MediaContentController {
    constructor(mysqlConn) {
        this.mysqlConn = mysqlConn;
    }

    getCategories() {
        let query = 'SELECT category_name url FROM media_content_categories';
        this.mysqlConn.query(query, function(error, results, fields) {
            if (error) {

            }
        })
    }
}

module.exports = MediaContentController;