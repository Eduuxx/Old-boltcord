const { ownerid, ownersid } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "oreload",
        description: "reloads a bot command!",
        usage: "-oreload",
        category: "owner",
        accessableby: "Bot Owner",
        aliases: ["oreload"]
    },
    run: async (bot, message, args) => {

    if(message.author.id != ownerid + ownersid ) return message.channel.send("You are not the bot owner!")

    if(!args[0]) return message.channel.send("Please provide a command to reload!")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``)
    }

    message.channel.send(`The command \`${args[0].toUpperCase()}\` has been reloaded!`)

    }
}

