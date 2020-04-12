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
  client.user.setActivity("Managing Big Boy's Servers", {
    type: "STREAMING",
    url: " "
  });
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
    
    // Let's go with a few common example commands! Feel free to delete or change those.
    
    if(command === "ping") {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You do not have permission to use this command.')
      // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
      // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
      const m = await message.channel.send("Ping?");
      m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }

if(command === "aiuto") {
        let Myembed = new Discord.RichEmbed ()
        .setAuthor("Ryuk's Bot", "https://imgur.com/pUQi3eT.png")
  
        .setColor("#ff3f00")
        .addField("-1 !social", "(Mostra i link a tutti i social)")
        .addField("-2 !dona", "(Mostra il link per donare.)")
        .addField("-3 !sub", "(Mostra il link per diventare sub.)")
        .addField("-4 !bits", "(Mostra il link per donare bits.)")
        .setTimestamp()
        .setFooter("(BOT Made By 🤠₿ig ₿oy🤠#0549) || Versione 1.0.0")
        message.channel.send(Myembed)
}
  }); //DON'T FUCKING DELETE THIS
client.login(process.env.token).catch(err => console.log(err)); 
