let _ = require("underscore"),
    villagerTrades = function() { };

_.extend(bookCrafting.prototype, {
    functionsFolder: "./datapacks/Enchanted Villager Trades/data/enchanted_villager_trades/functions/",
    outputFolder: "",

    init: function() {
        // /summon villager ~ ~ ~
        this.outputFolder = `${this.functionsFolder}books/`;

    },

});

new villagerTrades();
