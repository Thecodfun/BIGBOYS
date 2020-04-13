    // Load up the discord.js library
    const Discord = require("discord.js");


    // This is your client. Some people call it `bot`, some people call it `self`, 
    // some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
    // this is what we're refering to. Your client.
    const client = new Discord.Client();  
    const config = require('./config.json');
    //PREFIX FOR COMANDS
    const PREFIX = "!"  
    
    
    client.on("ready", () => {
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
  /////////////////////////////////////////

      if(command === "ping") {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.')
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        }

        if(command === "admhelp") {
          let Myembed = new Discord.RichEmbed ()
          .setAuthor("Big Boy's BOT", "https://i.imgur.com/dRbevw3.jpg")
          .setColor("#ebeb34")
          .addField("!pdelete **'x'**", "Deletes **'x'** number of messages.")
          .addField("!kick **'@user'**", "Kicks the mentioned user out of the server.")
          .addField("!ban **'@user'**", "Permanently Bans the mentioned user.")
          .addField("TITLE", "DESCRIPTION")
          .setTimestamp()
          .setFooter("(BOT Made By 🤠₿ig ₿oy🤠#0549) || Version 1.0.5")
          message.channel.send(Myembed)
        }

      if(command === "help") {
          let Myembed = new Discord.RichEmbed ()
          .setAuthor("Big Boy's BOT", "https://i.imgur.com/dRbevw3.jpg")
    
          .setColor("#03fcf4")
          .addField("!ping", "Checks your latency to the bot.")
          .addField("!info", "Gives informations About The Bot.")
          .addField("!getid", "gets the mentioned user's id.")
          .addField("TITLE", "DESCRIPTION")
          .setTimestamp()
          .setFooter("(BOT Made By 🤠₿ig ₿oy🤠#0549) || Version 1.0.5")
          message.channel.send(Myembed)
        }
    
        if(command === "kick")
        {
          if(message.member.hasPermission("KICK_MEMBERS" || "ADMINISTRATOR"))
          {
          var member = message.mentions.members.first();
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
              
              if (args[0] > 100) 
              {
                message.reply("You **CANNOT** delete more than 100 messages!")
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
            if (!member && !amount) return message.reply('Must specify a user to purge and a number of messages to purge!');
            if (!member) return message.reply('Must specify a user to purge!');
            if (!amount) return message.reply('Must specify an amount of messages to delete!');
            if (amount > 100) return message.reply('You **CANNOT** delete more than 100 messages!');
            message.channel.fetchMessages({
              limit: 100,
             }).then((messages) => {
              if (member) {
              const filterBy = member ? member.id : Client.member.id;
              messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
              }
              message.channel.bulkDelete(messages).then(msg => msg.delete(2000)).catch(error => console.log(error.stack));
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
           var member= message.mentions.members.first();
           var id = member.id.toString();

            message.reply("this is:" + member+"'s" + " id: " + id)}
              }

        if (command === "info")
         {
          let Myembed = new Discord.RichEmbed ()
          .setAuthor("Big Boy's BOT", "https://i.imgur.com/dRbevw3.jpg")
          .setColor("#34cdeb")
          .addField("Info about the BOT!", "This BOT is menat to help administrating the server and making evryone's life easier, Current Versione is 1.0.5, BOT is made in node.js using Discord.js APIs")
          .setTimestamp()
          .setFooter("(BOT Made By 🤠₿ig ₿oy🤠#0549) || Version 1.0.5")
          message.channel.send(Myembed)
        }

      }); //DON'T FUCKING DELETE THIS
      client.login(process.env.token).catch(err => console.log(err)); 
