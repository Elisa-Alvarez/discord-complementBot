require("dotenv").config();
const api = require('./api')
const schedule = require('node-schedule')
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = ".="

if(fs.existsSync('./data.json')){
  const data = require('./data.json')
  return data
}else{
  async () =>await api
  const data = require('./data.json')
  return data
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)

})


client.on("messageCreate", msg => {
    if (!msg.content.startsWith(prefix)|| msg.author.bot) return

    const args = msg.content.split(prefix.length).splice(/ +/);
    const userInput = args.shift().toLowerCase()

    switch (userInput){

     case data[0].command:
        let res = data[0].response.replace("{user}", `${msg.author}`);
        res = res.replaceAll(/["|"]/g, ``)
        msg.channel.send(res);
        break
      //Move the replace funtion to utils file and import as a varible
     case '/burn':
     msg.channel.send("You Suck Frogs");
     
     default:
     break
     }

    
  })
client.login(process.env.CLIENTID)