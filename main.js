require("dotenv").config();
const api = require('./api')
const schedule = require('node-schedule')
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX
const {priaseCommand,flirtCommand,roastCommand} = require('./util')
const priase = priaseCommand()
const flirt = flirtCommand()
const roast = roastCommand()

client.on("ready", () => {
  if(fs.existsSync('./data.json')){
    console.log(Date.UTC)
  }else{
    async () =>await api
  }
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
    if (!msg.content.startsWith(prefix)|| msg.author.bot) return
    const nsfwChannel = 'art'
    const args = msg.content.split(prefix.length).splice(/ +/);
    const userInput = args.shift().toLowerCase()
    let rn = Math.floor(Math.random()*priase.length)
    let fn=Math.floor(Math.random()*flirt.length)
    let n=Math.floor(Math.random()*roast.length)
 
    switch (userInput){
     case priase[rn].command:
        let res = priase[rn].response.replace("{user}", `${msg.author}`);
        res = res.replaceAll(/["|"]/g, ``)
        msg.channel.send(res);
        break
     case roast[n].command:
      let burnres = roast[n].response.replace("{user}", `${msg.author}`);
      burnres = burnres.replaceAll(/["|"]/g, ``)
      msg.channel.send(burnres);
        break
     default:
        break
     }
     if( flirt[fn].command && msg.channel.name.startsWith(nsfwChannel)){
      let fres = flirt[fn].response.replace("{user}", `${msg.author}`);
      fres = fres.replaceAll(/["|"]/g, ``)
       return msg.channel.send(fres);
     }
    else{
        return  msg.channel.send(`Sorry my boss is watching, if you want to be flirty let's head to the art channel ${msg.author}`)
    }

    
  })
client.login(process.env.CLIENTID)