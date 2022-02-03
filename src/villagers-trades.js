let fs = require("fs"),
    _ = require("underscore"),
    logHandler = require("./Utils/log_handler"),
    bookUtils = require("./Utils/BookUtils"),
    villagerTrades = function() { };

_.extend(villagerTrades.prototype, {
    functionsFolder: "./datapacks/Enchanting book crafting/data/enchanting_books/functions/",
    outputFolder: "",
    books: [],
    villagerInfo: {
        "VillagerData":{
            "profession": "librarian",
            "level": 5,
            "type": "plains"
        },
        "PersistenceRequired": 1,
        "Silent": 1,
        "NoAI": 1,
        "CustomNameVisible": 1,
        "CustomName": "{\"text\":\"[NAME]\",\"color\":\"aqua\"}",
        "Offers": {
            "Recipes": []
        }
    },

    init: function() {
        this.outputFolder = `${this.functionsFolder}`;
        bookUtils
            .getBookList()
            .then(books => {
                this.books = books;
                fs.readFile("./src/villagers_trading/villager_list.json", 'utf-8', (err, list) => {
                    this.createVillagersFunctions(list);
                });
            });
    },

    createVillagersFunctions: function(villagerList) {
        villagerList = JSON.parse(villagerList);
        (Object.keys(villagerList)).forEach(key => {
            // if (["all", "all_high_tier", "tier_1", "tier_2" , "tier_3", "tier_4", "tier_5", "helmet_enchants"].includes(key)) {
                let villagerTrader = villagerList[key];

                // get the base villager info object
                let vInfo = {...this.villagerInfo};

                // get all the available enchant books info
                let bookList = JSON.parse(JSON.stringify(this.books));

                // set custom title for villager trader
                vInfo.CustomName = vInfo.CustomName.replace("[NAME]", villagerTrader.title);

                //create recipes for villager trader
                vInfo.Offers.Recipes = this.buildRecipes(bookList, key, villagerTrader);

                // write village summon code to file
                const outputFilePath = `${this.outputFolder}${key}.mcfunction`;
                fs.writeFile(outputFilePath, `summon villager ~ ~ ~ ${JSON.stringify(vInfo)}`, (err) => {
                    if (err) {
                        logHandler.error(err);
                    } else {
                        logHandler.log(`file for ${key} created`);
                    }
                });
            // }
        });
    },

    buildRecipes: function(bookList, key, villagerTrader) {
        logHandler.log(`BUILD RECIPE FOR ${key}`);
        const recipeList = [];

        if (typeof villagerTrader.type !== "undefined") {
            // if villagerInfo has type object -> filter by type
            bookList = this.filterBooksByType(bookList, villagerTrader.type);
        } else {
            // filter booklist by keyname
            switch(key) {
                case "all_high_tier":
                    bookList.forEach((book, bookKey) => {
                        const books = book.books;
                        if (books.length > 1) {
                            const lastBook = books[books.length - 1];
                            bookList[bookKey].books = [lastBook];
                        }
                    });
                    break;
                case "tier_1":
                case "tier_2":
                case "tier_3":
                case "tier_4":
                case "tier_5":
                    bookList = this.filterBooksByTier(bookList, villagerTrader.stored_enchantments_lvl);
                    break;
            }
        }

        bookList.forEach(book => {
            const recipeObjects = this._createRecipeObject(book);
            recipeObjects.forEach(recipe => {
                recipeList.push(recipe);
            });
        });
        bookList = null;
        return recipeList;
    },

    filterBooksByTier: function(bookList, tier) {
        bookList.forEach((book, bookKey) => {
            const books = book.books;
            bookList[bookKey].books = books.filter(x => x.stored_enchantments_lvl === tier);
        });
        return bookList;
    },

    filterBooksByType: function(bookList, type) {
        const newBookList = [];
        bookList.forEach((book, bookKey) => {
            if (book.main_options.enchant_type.includes(type)) {
                newBookList.push(book);
            }
        });

        return newBookList;
    },

    _createRecipeObject(bookInfo) {
        const recipes = [];
        bookInfo.books.forEach(book => {
            recipes.push({
                buy: {id: this._cleanIngredientName(bookInfo.main_options.ingredient_1.name), Count: book.ingredient_1_count },
                buyB: {id: this._cleanIngredientName(bookInfo.main_options.ingredient_2.name), Count: book.ingredient_2_count},
                sell: {
                    id: "enchanted_book",
                    Count: 1,
                    tag: {
                        StoredEnchantments: [
                            {
                                id: this._cleanIngredientName(bookInfo.main_options.stored_enchantments_id),
                                lvl: book.stored_enchantments_lvl
                            }
                        ]
                    }
                },
                rewardExp: "0b",
                maxUses: 9999999
            });
        });
        return recipes;
    },

    _cleanIngredientName(name) {
        return name.replace("minecraft:", "");
    }
});

const vt = new villagerTrades();
vt.init();

