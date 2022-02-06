require("dotenv").config();
fs = require('fs')
const {getSheetData} = require('./api')
const schedule = require('node-schedule')
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX
const {priaseCommand,flirtCommand,roastCommand} = require('./util')

if(fs.existsSync('./data.json')){
}else{
  getSheetData()
}
//Starts the bot
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
const priase = priaseCommand()
const flirt = flirtCommand()
const roast = roastCommand()
  //if prefix of the command is not given bot will ignore  
  if (!msg.content.startsWith(prefix)|| msg.author.bot) return

    const nsfwChannel = 'art'
    const args = msg.content.split(prefix.length).splice(/ +/);
    const userInput = args.shift().toLowerCase()
  //each command may have a different # of responses this goes off the length of the 
  //coresponding array objects
    let rn = Math.floor(Math.random()*priase.length)
    let fn=Math.floor(Math.random()*flirt.length)
    let n=Math.floor(Math.random()*roast.length)
 //All messages are lower cased then the imput is the prefix and the command
 //compares it to the command in the array object(array object created by command in util.js)
 // and replys so the user can see the bots response
    switch (userInput){
     case priase[rn].command:
        let res = priase[rn].response.replace("{user}", `${msg.author}`);
        res = res.replaceAll(/["|"]/g, ``)
        msg.reply(res);
        break
     case roast[n].command:
      let burnres = roast[n].response.replace("{user}", `${msg.author}`);
      burnres = burnres.replaceAll(/["|"]/g, ``)
      msg.reply(burnres);
        break
     default:
        break
     }
     // This checks to see if user is in the correct channel for nsfw even 
     //if emoji's are used it should still work
     if( flirt[fn].command && msg.channel.name.startsWith(nsfwChannel)){
      let fres = flirt[fn].response.replace("{user}", `${msg.author}`);
      fres = fres.replaceAll(/["|"]/g, ``)
       return msg.reply(fres);
     }
    else{
        const nsfw = msg.guild.channels.cache.find((chId)=>{
            return chId.name.startsWith(nsfwChannel)
        })
        console.log(nsfw)
        return  msg.reply(`Sorry my boss is watching, if you want to be flirty ${msg.author} let's head to the ${nsfw}!`)
    }

    
  })
client.login(process.env.CLIENTID)