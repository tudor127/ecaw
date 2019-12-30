class MediaContentController {
    constructor(mysqlConn) {
        this.mysqlConn = mysqlConn;
    }

    getCategories() {
        return new Promise((resolve, reject) => {
            let query = 'SELECT category_name FROM media_content_categories';
            this.mysqlConn.query(query, function(error, results, fields) {
                if (error.fatal) {
                    reject(error);
                } else {
                    resolve(results);
                }
            })
        });
    }
}

module.exports = MediaContentController;