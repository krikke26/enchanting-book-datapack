let fs = require("fs"),
    _ = require("underscore"),
    logHandler = require("./Utils/log_handler"),
    bookCrafting = function() { };

_.extend(bookCrafting.prototype, {
    bookFolder: "./function_generator/books/",
    functionsFolder: "./datapack/Enchanting book crafting/data/enchanting_books/functions/",
    outputFolder: "",
    bookList: [],

    init: function() {
        this.outputFolder = `${this.functionsFolder}books/`;
        this.fetchTemplate();
        this.fetchBookInfo();

    },

    fetchTemplate: function() {
        fs.readFile("./function_generator/template.mcfunction", 'utf-8', (err, template) => {
            logHandler.error(err);
            this.fileTemplate = template;
        });
    },

    fetchBookInfo: function() {
        fs.readdir(this.bookFolder, (err, filenames) => {
            logHandler.error(err);
            filenames.forEach((filename) => {
                fs.readFile(this.bookFolder + filename, 'utf-8', (err, content) => {
                    this.generateFunctionFile(filename, content);
                    logHandler.error(err);
                });
            });
            console.log("done looping");
        });
        setTimeout(() => {
            this.updateGameLoop();
        },2000);
    },

    generateFunctionFile: function(filename, content) {
        content = JSON.parse(content);
        //loop through books
        content.books.forEach((book) => {
            let bookTemplate = this.fileTemplate;
            logHandler.log(`Generating function file for ${book.name}`);

            //replace placeholders
            bookTemplate = bookTemplate.replace("[$book_name]", book.name);

            bookTemplate = bookTemplate.replace("[$ingredient_1_name]", content.main_options.ingredient_1.name);
            bookTemplate = bookTemplate.replace("[$ingredient_1_output_name]", content.main_options.ingredient_1.output_name);
            bookTemplate = bookTemplate.replace("[$ingredient_1_count]", book.ingredient_1_count);

            bookTemplate = bookTemplate.replace("[$ingredient_2_name]", content.main_options.ingredient_2.name);
            bookTemplate = bookTemplate.replace("[$ingredient_2_output_name]", content.main_options.ingredient_2.output_name);
            bookTemplate = bookTemplate.replace("[$ingredient_2_count]", book.ingredient_2_count);

            bookTemplate = bookTemplate.replace("[$stored_enchantments_id]", content.main_options.stored_enchantments_id);
            bookTemplate = bookTemplate.replace("[$stored_enchantments_lvl]", book.stored_enchantments_lvl);

            //save each book to file
            let outputFileName = book.name;
            outputFileName = outputFileName.toLowerCase();
            outputFileName = outputFileName.split(' ').join('_');
            this.bookList.push(outputFileName);
            outputFileName = outputFileName + ".mcfunction";

            fs.writeFile(this.outputFolder + outputFileName, bookTemplate, (err) => {
                logHandler.error(err);
                logHandler.log(`file for ${outputFileName} created`);
            });
        });
    },

    updateGameLoop: function() {
        let bookListTemplate = "";
        this.bookList.forEach((bookName) => {
            bookListTemplate += `function enchanting_books:books/${bookName}\n`;
        });
        fs.writeFile(`${this.functionsFolder}book_list.mcfunction`, bookListTemplate, (err) => {
            logHandler.error(err);
            logHandler.log(`booklist updated for gameloop`);
        });
    }

});

module.exports = new bookCrafting();