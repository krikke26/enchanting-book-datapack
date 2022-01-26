const bookFolder = "./src/books/";
const logHandler = require("./log_handler");
const fs = require("fs");
const queue = require("queue");


class BookUtils {

    getBookList() {
        return new Promise((resolve, reject) => {
            const bookFolder = "./src/books/";
            const q = queue({
                results: []
            });
            fs.readdir(bookFolder, (err, filenames) => {
                if (err) {
                    logHandler.error(err);
                } else {
                    filenames.forEach((filename) => {
                        // if (filename === "unbreaking.json") {
                            q.push(function () {
                                return new Promise((resolve, reject) => {
                                    fs.readFile(bookFolder + filename, 'utf-8', (err, content) => {
                                        resolve(JSON.parse(content));
                                    });
                                });
                            });
                        // }
                    });
                    // start queue
                    q.start((err) => {
                        if (err) {
                            throw err;
                        }
                        const bookList = [];
                        q.results.forEach(book => {
                            bookList.push(book[0]);
                        })
                        resolve(bookList);
                    });
                }
            });
        });
    }
};

module.exports = new BookUtils();
