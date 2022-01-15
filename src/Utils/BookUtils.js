const bookFolder = "./src/books/";
const logHandler = require("./Utils/log_handler")

module.exports = {
    getBookList: () => {
        return new Promise((resolve, reject) => {
            const booksDetails = [];
            fs.readdir(bookFolder, (err, filenames) => {
                logHandler.error(err);
                filenames.forEach((filename) => {
                    fs.readFile(this.bookFolder + filename, 'utf-8', (err, content) => {
                        booksDetails.push(JSON.parse(content));
                        logHandler.error(err);
                    });
                });
            });
            resolve(booksDetails);
        });
    },
};
