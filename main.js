require("dotenv").config();
const api = require('./api')
const schedule = require('node-schedule')
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = ".="

client.on("ready", () => {
  if(fs.existsSync('./data.json')){
  }else{
    async () =>await api
  }
  console.log(`Logged in as ${client.user.tag}!`)

})


client.on("messageCreate", msg => {
  const data = require('./data.json')
    if (!msg.content.startsWith(prefix)|| msg.author.bot) return

    const args = msg.content.split(prefix.length).splice(/ +/);
    const userInput = args.shift().toLowerCase()
    let i = Math.floor(Math.random()*data.length)

    switch (userInput){

     case data[i].command:
       
        let res = data[i].response.replace("{user}", `${msg.author}`);
        res = res.replaceAll(/["|"]/g, ``)
        msg.channel.send(res);
        break
     
     default:
     break
     }

    
  })
client.login(process.env.CLIENTID)