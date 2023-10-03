const { ownerid, ownersid } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "shutdown",
        description: "shuts down the bot!",
        usage: "k!shutdown",
        category: "moderation",
        accessableby: "Bot Owner",
        aliases: ["botstop"]
    },
    run: async (bot, message, args) => {
    if(message.author.id == ownerid + ownersid ) return message.channel.send("You are not the bot owner!")
    

    try {
        await message.channel.send("Bot is shutting down... bye bitches!")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    


    }
}