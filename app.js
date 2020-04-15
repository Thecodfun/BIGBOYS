      // Load up the needed libraries
      const Discord = require("discord.js");
      const antispam = require('better-discord-antispam');
      const CoinGecko = require('coingecko-api');
      const fetch = require('node-fetch');

      //INSTANCING THE CLIENTS.
      const client = new Discord.Client();  
      const CoinGeckoClient = new CoinGecko();

      //REQUIRING THE CONFIG FOR THE PREFIX.
      const config = require('./config.json');
     
      //PREFIX FOR COMANDS.
      const PREFIX = "!"  

      //MISC CONST.
      const version = "Version 1.0.6"
      const botname = "Big Boy's Management BOT#9683"
      
      
      client.on("ready", () => {
        antispam(client, {
          limitUntilWarn: 3, // The amount of messages allowed to send within the interval(time) before getting a warn.
          limitUntilMuted: 8, // The amount of messages allowed to send within the interval(time) before getting a muted.
          interval: 1000, // The interval(time) where the messages are sent. Practically if member X sent 5+ messages within 2 seconds, he get muted. (1000 milliseconds = 1 second, 2000 milliseconds = 2 seconds etc etc)
          warningMessage: "**STOP SPAMMING OR YOU WILL BE MUTED!**", // Message you get when you are warned!
          muteMessage: "**WAS MUTED DUE TO SPAM!**", // Message sent after member X was punished(muted).
          maxDuplicatesWarning: 7,// When people are spamming the same message, this will trigger when member X sent over 7+ messages.
          maxDuplicatesMute: 10, // The limit where member X get muted after sending too many messages(10+).
          ignoredRoles: ["Admin"], // The members with this role(or roles) will be ignored if they have it. Suggest to not add this to any random guys. Also it's case sensitive.
          ignoredMembers: ["🤠₿ig ₿oy🤠#0549", "C Sharp#4754"], // These members are directly affected and they do not require to have the role above. Good for undercover pranks.
          mutedRole: "Muted", // Here you put the name of the role that should not let people write/speak or anything else in your server. If there is no role set, by default, the module will attempt to create the role for you & set it correctly for every channel in your server. It will be named "muted".
          timeMuted: 1000 * 600, // This is how much time member X will be muted. if not set, default would be 10 min.
          logChannel: "bot-spam-logs" // This is the channel where every report about spamming goes to. If it's not set up, it will attempt to create the channel.
        });

        // This event will run if the bot starts, and logs in, successfully.
        console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 

        client.user.setActivity(`Big Boy's Server! | Do !help`, { type: 'WATCHING' })
      });

      //EVENT LISTENER FOR GUILD MEMBER JOINED.
      client.on("guildMemberAdd", (member) => {
        client.channels.get('698863825121837079').send(`:partying_face: New User ${member} has joined our family, we hope you will enjoy your stay! :partying_face:`);
      });
      /////////////////////////////////////////

      client.on("message", async message => {

        if(message.author.bot) return;
        client.emit('checkMessage', message);

        if(message.content.indexOf(config.prefix) !== 0) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

    
    //Useful functions for general purpose.
    function wait(ms)
    {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
    }

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    /////////////////////////////////////////


    //Listeners For Commands.
    if(command === "ping") {
          if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send((":x: You can't ping the bot! :x:")).then(msg => msg.delete(2000))
          const m = await message.channel.send("Ping?");
          m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      }

      if(command === "admhelp") {
            if(message.member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR"))
            {
            let Myembed = new Discord.RichEmbed ()
            .setAuthor("Big Boy's BOT", "https://i.imgur.com/dRbevw3.jpg")
            .setColor("#ebeb34")
            .addField("!pdelete **'x'**", "Deletes **'x'** number of messages.")
            .addField("!pudelete **'@user'** **'x'**", "Deletes **'@user'** **'x'** number of messages.")
            .addField("!ban **'@user'**", "Permanently Bans the mentioned user.")
            .addField("!kick **'@user'**", "Kicks the mentioned user out of the server.")
            .addField("!ping", "Checks your latency to the bot.")
            .setTimestamp()
            .setFooter("(BOT Made By 🤠₿ig ₿oy🤠#0549) || " + version)
            message.channel.send(Myembed)
            }
            else
            {
              message.reply(":x: You can't prompt admin commands list! :x:").then(msg => msg.delete(2000))
            }
      }

    if(command === "help") 
        {
            let Myembed = new Discord.RichEmbed ()
            .setAuthor("Big Boy's BOT", "https://i.imgur.com/dRbevw3.jpg")
      
            .setColor("#03fcf4")
            .addField("!info", "Gives informations About The Bot.")
            .addField("!getid **'@user'**", "Gets **'@user'** id.")
            .addField("!insult **'@user'**", "Insults with an old fashion the **'@user'**.")
            .addField("!say **'message'**", "Allows the bot say the **'message'** you typed.")
            .setTimestamp()
            .setFooter("(BOT Made By 🤠₿ig ₿oy🤠#0549) || " + version)
            message.channel.send(Myembed)
      }
      
      if(command === "kick")
          {
            if(message.member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR"))
            {
            var member = message.mentions.members.first();
            if (!member) 
            {
              message.reply(":x: You **MUST** specify a user to kick! :x:");
            }
            member.kick("You have been kicked!")
            message.reply("User:" + member + " :white_check_mark: Has been kicked! :white_check_mark:").then(msg => msg.delete(2000))
            }
            else
            {
              message.reply(":x: You can't kick other users! :x:").then(msg => msg.delete(2000))
            }
      }

      if(command === "ban")
          {
            if(message.member.hasPermission("BAN_MEMBERS" || "ADMINISTRATOR"))
            {
            var member = message.mentions.members.first();
            if (!member) 
            {
              message.reply(":x: You **MUST** specify a user to ban! :x:");
            }
            member.ban("You have been banned!")
            message.reply("User:" + member + " :white_check_mark: Has been banned! :white_check_mark:").then(msg => msg.delete(2000))
            }
            else
            {
              message.reply(":x: You can't ban other users! :x:").then(msg => msg.delete(2000))
            }
      }

      if(command === "pdelete")
          {
            if(message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR"))
            {
              if(!args[0])
              {
                message.reply("You **MUST** input a number of messages to delete!")
              }
                message.delete();
                
                if (args[0] > 99) 
                {
                  message.reply("You **CANNOT** delete more than 99 messages!")
                }
                wait(1000)
                message.channel.bulkDelete(parseInt(args[0]) + 1).then(() => {
                message.channel.send(`Purged `+ (parseInt(args[0]))   +` messages!`).then(msg => msg.delete(2000));});  
            }
            else
            {
              message.reply(":x: You can't delete messages! :x:").then(msg => msg.delete(2000))      
            }
      }

      if (command === "pudelete") 
          {
            if(message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR"))
            {
              var member = message.mentions.members.first()
              var amount = parseInt(message.content.split(' ')[2])
              if (!member && !amount && !args[0]) return message.reply('Must specify a user to purge and a number of messages to purge!');
              if (!member) return message.reply('Must specify a user to purge!');
              if (!amount) return message.reply('Must specify an amount of messages to delete!');
              if (args[1] > 99) return message.reply('You **CANNOT** delete more than 99 messages!');
              message.channel.fetchMessages({
              }).then((messages) => {
                if (member) {
                const filterBy = member ? member.id : Client.member.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
                }
                message.channel.bulkDelete(messages).then( () => 
                {
                  message.channel.send(`Purged ${amount} of ${member}'s messages!`).then(msg => msg.delete(2000))
                }).catch(error => console.log(error.stack));
              });
              
            } 
            else 
            {
              message.reply(":x: You can't delete other user's messages! :x:").then(msg => msg.delete(2000))            
            }
      }

      if(command === "getid")
          {
            { 
            var member = message.mentions.members.first();
            var id = member.id.toString();
            if (!member) 
            {
              message.reply(":x: You **MUST** specify a user to grab his ID! :x:").then(msg => msg.delete(2000))
            }
              message.reply("this is:" + member+"'s" + " id: " + id)}
      }

      if (command === "info")
          {
            let Myembed = new Discord.RichEmbed ()
            .setAuthor("Big Boy's BOT", "https://i.imgur.com/dRbevw3.jpg")
            .setColor("#34cdeb")
            .addField("Info about the BOT!", "This BOT is menat to help administrating the server and making evryone's life easier, Current Update is "+ version +",BOT is made in node.js using Discord.js APIs")
            .setTimestamp()
            .setFooter("(BOT Made By 🤠₿ig ₿oy🤠#0549) || " + version)
            message.channel.send(Myembed)
      }

      if (command === "insult") 
          {
            var member = message.mentions.members.first();
            var randnum = Math.random()
            var a_insults = [' You are a fat Pimplehead.', ' Your underwear smells of dead fish.', ' You are like Super Mario, an ugly italian plumber.', ' You are the proof that god has sense of humor.', " You must be born in a freeway, cus that's where most of the accidents happen.",
            " If i'd have a face like yours, i'd sue my parents", " if i'd want to kill myself i would have to climb up to your ego and jump down to your IQ.", " You are so fat that you don't need the internet, you are already worldwide.", " You're so fat that your favourite necklace is the food chain.",
              " You are so fat that when you wear a yellow raincoat people shout out 'taxi'", " You're so stupid that you thought a quarterback was a refund.", " You are so hairy that when you went hiking, another sighting of Bigfoot was reported.", " You are so hairy that when you take your dog for a walk, you get pet first.",
              " Those teeth look like you could eat an apple through a tennis racquet.", " No I'm not insulting you, I'm describing you.", " You're so fake, Barbie is jealous.", " I'd slap you, but that would be animal abuse.", "LOL RETARD."]
            if (!member) 
            {
              message.reply(":x: You **MUST** specify a user to insult! :x:").then(msg => msg.delete(2000))
            }
            else if( member.user.tag === botname)
            {
              message.channel.send(member + " **I AIN'T JUST A STUPID CODED MACHINE... MAYBE**").then(msg => msg.delete(2000))
            }
            else 
            {
              message.channel.send(member + a_insults[parseInt(getRandomArbitrary(1, 15))])
            }
      }

      if (command === "say")
          {
            var messeageToSend = message.content.slice(config.prefix.length && command.length + 1);
            if (!messeageToSend) 
            {
              message.reply(":x: You **MUST** specify a message or input valid strings! :x:").then(msg => msg.delete(2000))
            }
              message.channel.send(messeageToSend);
      }

      if (command === "coinprice") 
      {
        var coin = args[0];
        fetch('https://api.coingecko.com/api/v3/coins/list')
        .then(res => res.json())
        .then(apiresponse => console.log(apiresponse))
        .then( { } )

      }
      /////////////////////////////////////////         
    });
    client.login(process.env.token).catch(err => console.log(err)); 
