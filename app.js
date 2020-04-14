    // Load up the discord.js library & Better anti-spam
    const Discord = require("discord.js");
    const antispam = require('better-discord-antispam');

    // This is your client. Some people call it `bot`, some people call it `self`, 
    // some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
    // this is what we're refering to. Your client.
    const client = new Discord.Client();  
    const config = require('./config.json');
    //PREFIX FOR COMANDS
    const PREFIX = "!"  
    //VERSION CONST
    const version = "Version 1.0.7"
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
        timeMuted: 600000, // This is how much time member X will be muted. if not set, default would be 10 min.
        logChannel: "bot-spam-logs" // This is the channel where every report about spamming goes to. If it's not set up, it will attempt to create the channel.
      });
      // This event will run if the bot starts, and logs in, successfully.
      console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
      // Example of changing the bot's playing game to something useful. `client.user` is what the
      // docs refer to as the "ClientUser".
      client.user.setActivity(`Big Boy's Server!`, { type: 'WATCHING' })
    });
    
    client.on("message", async message => {
      // This event will run on every single message received, from any channel or DM.

      // It's good practice to ignore other bots. This also makes your bot ignore itself
      // and not get into a spam loop (we call that "botception").
      if(message.author.bot) return;
      client.emit('checkMessage', message); // This runs the filter on any message bot receives in any guilds.
      // Also good practice to ignore any message that does not start with our prefix, 
      // which is set in the configuration file.
      if(message.content.indexOf(config.prefix) !== 0) return;
      
      // Here we separate our "command" name, and our "arguments" for the command. 
      // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
      // command = say
      // args = ["Is", "this", "the", "real", "life?"]
      const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
      
  // Create an event listener for new guild members
  client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`:partying_face: Welcome, ${member} We hope you will enjoy your stay!:partying_face: `);
  });
  
  /////////////////////////////////////////
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

      if(command === "ping") {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.')
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
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
          .setTimestamp()
          .setFooter("(BOT Made By 🤠₿ig ₿oy🤠#0549) || " + version)
          message.channel.send(Myembed)
          }
          else
          {
            message.reply(":x: You can't prompt admin commands list! :x:")
          }
        }

      if(command === "help") 
      {
          let Myembed = new Discord.RichEmbed ()
          .setAuthor("Big Boy's BOT", "https://i.imgur.com/dRbevw3.jpg")
    
          .setColor("#03fcf4")
          .addField("!ping", "Checks your latency to the bot.")
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
          message.reply("User:" + member + " :white_check_mark: Has been kicked! :white_check_mark:")
          }
          else
          {
            message.reply(":x: You can't kick other users! :x:")
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
          message.reply("User:" + member + " :white_check_mark: Has been banned! :white_check_mark:")
          }
          else
          {
            message.reply(":x: You can't ban other users! :x:")
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
            message.reply(":x: You can't delete messages! :x:")      
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
              message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
             });
             
          } 
          else 
          {
            message.reply(":x: You can't delete other user's messages! :x:")            
          }
        }

        if(command === "getid")
        {
         { 
           var member = message.mentions.members.first();
           var id = member.id.toString();
           if (!member) 
           {
            message.reply(":x: You **MUST** specify a user to grab his ID! :x:");
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
            message.reply(":x: You **MUST** specify a user to insult! :x:");
          }
          else if( member.user.tag === botname)
          {
            message.channel.send(member + " **I AIN'T JUST A STUPID CODED MACHINE... MAYBE**")
          }
          else 
          {
            message.channel.send(member + a_insults[parseInt(getRandomArbitrary(1, 15))])
          }
        }

        if (command === 'say')
        {
          var messeageToSend = message.content.slice(config.prefix.length && command.length + 1);
          if (!messeageToSend) 
          {
            message.reply(":x: You **MUST** specify a message or input valid strings! :x:");
          }
            message.channel.send(messeageToSend);
        }
      }); //DON'T FUCKING DELETE THIS
      client.login(process.env.token).catch(err => console.log(err)); 
