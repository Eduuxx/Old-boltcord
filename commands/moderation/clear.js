const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json")

module.exports= {
    config: {
        name: "clear",
        description: "clears or purges text!",
        usage: "&clear",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["purge", "delete"]
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You can't delete messages....").then(m => m.delete({timeout:5000}));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Yeah.... That's not a number? I also can't delete 0 messages by the way.").then(m => m.delete({timeout:5000}));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Sorryy... I can't delete messages.").then(m => m.delete({timeout:5000}));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 1000) {
            deleteAmount = 1000;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages. https://tenor.com/view/flamingelmomeme-flaming-flamingelmo-elmo-memes-gif-10674657`)).then(m => m.delete({timeout:15000}))
            .catch(err => message.reply(`Something went wrong... ${err}`));
    }
}