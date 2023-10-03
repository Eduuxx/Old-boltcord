const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../../botconfig.json")
const chalk = require('chalk')
const { prefix} = require("../../botconfig.json")

module.exports = bot => {
    console.log("-----------------------------");
    console.log("        I'm ONLINE!     ");
    console.log("-----------------------------");
    console.log(chalk.bgGreen.black(`Logged in as ` + `\x1b[34m\x1b[4m${bot.user.username}\x1b[0m`));
    console.log("-----------------------------");


    let activities = [ `${bot.guilds.cache.size} servers!`, `${bot.channels.cache.size} channels!`, `${bot.users.cache.size} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`boltcord.xyz`, { type: "WATCHING" }), 15000)

};