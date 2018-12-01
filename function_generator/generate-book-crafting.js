var fs = require('fs'),
    dirname = "./function_generator/books/",
    functionFolder = "./datapack/Enchanting book crafting/data/enchanting_books/functions/",
    outputFolder = functionFolder + "books/";

function generateFunctionFile(filename, content) {
    content = JSON.parse(content);

    //geth the template
    fs.readFile("./function_generator/template.mcfunction", 'utf-8', function(err, template) {

        //loop through books
        content.books.forEach(function(book) {
            var bookTemplate = template;
            //https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
            console.log('\x1b[32m%s\x1b[0m', 'Generating function file for ' + book.name);

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

            //console.log(bookTemplate);

            //save each book to file
            var outputFileName = book.name;
            outputFileName = outputFileName.toLowerCase();
            outputFileName = outputFileName.replace(" ", "_");
            outputFileName = outputFileName + ".mcfunction";

            fs.writeFile(outputFolder + outputFileName, bookTemplate, function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log('\x1b[32m%s\x1b[0m', 'file for ' + outputFileName + ' created');
            });


        });
    });
}

fs.readdir(dirname, function(err, filenames) {
    if (err) {
        console.log(err);
    }
    filenames.forEach(function(filename) {
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
            generateFunctionFile(filename, content);
            if (err) {
                console.log(err);
            }

        });
    });
    //update Gameloop file
    fs.readFile(functionFolder + "gameloop.mcfunction", 'utf-8', function(err, gameloopContent) {
        console.log(gameloopContent);
    });

});

