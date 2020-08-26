let _ = require("underscore");

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
module.exports = {
    log: (message) => {
        console.log("\x1b[32m%s\x1b[0m", message);
    },

    error: (message) => {
        if (!_.isEmpty(message)) {
            console.error("[ERROR]", message);
        }
    }
};