module.exports = class MediaContentModel {
    constructor(mysqlConn) {
        this.mysqlConn = mysqlConn;
        this.limitPerPage = 20;
        this.http = require('http');
        this.https = require('https');
    }

    /**
     * Gets the category names
     * Usually 20 items per page
     *
     * @returns {Promise<array>}
     */
    getCategories() {
        return new Promise((resolve, reject) => {
            let query = 'SELECT category_name FROM media_content_categories';
            this.mysqlConn.query(query, function(error, results) {
                if (error && error.fatal) {
                    reject(error);
                } else {
                    resolve(results);
                }
            })
        });
    }

    /**
     * Gets the selected category content on selected page
     *
     * @param {string} category Category Name
     * @param {int} page Page number
     * @returns {Promise<array>}
     */
     getCategoryContent(category, page) {
        switch(category) {
            case "Cats":
                return this._getCatsContent(page);
            case "Dogs":
                return this._getGoatsContent();
            default:
                return new Promise(resolve => resolve([]));
        }
    }

    /**
     * Gets the cats images
     *
     * @param {int} page
     * @returns {Promise<array>}
     * @private
     */
    _getCatsContent(page) {
        return new Promise((resolve, reject) => {
            this.mysqlConn.query('SELECT url, api_key FROM media_content_categories WHERE category_name = "Cats"', (error, results) => {
                if (error) {
                    if (error.fatal) {
                        return reject(error);
                    } else {
                        return resolve([]);
                    }
                }

                results = results[0]; // Only a single row should be retrieved

                this.https.get(`${results.url}?limit=${this.limitPerPage}&page=${page}`, {
                    headers: {
                        'X-Api-Key': results.api_key
                    }
                }, res => {
                    if (res.statusCode.toString()[0] !== '2') {
                        return resolve([]);
                    }

                    let rawData = '';
                    res.on('data', chunk => { rawData += chunk; });
                    res.on('end', () => resolve(JSON.parse(rawData))).on('error', () => resolve([]));
                });
            })
        });
    }

    /**
     * Gets the dogs images
     *
     * @returns {Promise<array>}
     * @private
     */
    _getGoatsContent() {
        return new Promise((resolve, reject) => {
            this.mysqlConn.query('SELECT url FROM media_content_categories WHERE category_name = "Dogs"', (error, results) => {
                if (error) {
                    if (error.fatal) {
                        return reject(error);
                    } else {
                        return resolve([]);
                    }
                }

                results = results[0]; // Only a single row should be retrieved

                let promises = [];

                for (let i = 0; i < this.limitPerPage; i++) {
                    promises.push( new Promise(resolve1 => {
                        this.https.get(`${results.url}`,res => {
                            if (res.statusCode.toString()[0] !== '2') {
                                return resolve1([]);
                            }

                            let rawData = '';
                            res.on('data', chunk => { rawData += chunk; });
                            res.on('end', () => resolve1(JSON.parse(rawData))).on('error', () => resolve1([]));
                        });
                    }));
                }

                Promise.all(promises).then(message => { resolve(message); })
            })
        });
    }
};
