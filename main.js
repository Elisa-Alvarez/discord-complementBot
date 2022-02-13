require("dotenv").config();
fs = require('fs')
const {getSheetData} = require('./api')
const schedule = require('node-schedule')
const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX
const {praiseCommand,flirtCommand,roastCommand,wyrCommand,dareCommand,truthCommand} = require('./util')

if(fs.existsSync('./data.json')){
}else{
  getSheetData()
}
//Starts the bot
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
const praise = praiseCommand()
const flirt = flirtCommand()
const roast = roastCommand()
const wyr = wyrCommand()
  //if prefix of the command is not given bot will ignore  
  if (!msg.content.startsWith(prefix)|| msg.author.bot) return

    const nsfwChannel = 'flirty-fruits'
    const args = msg.content.split(prefix.length).splice(/ +/);
    const userInput = args.shift().toLowerCase()
  //each command may have a different # of responses this goes off the length of the 
  //coresponding array objects
    let rn = Math.floor(Math.random()*praise.length)
    let fn=Math.floor(Math.random()*flirt.length)
    let n=Math.floor(Math.random()*roast.length)
    let wn=Math.floor(Math.random()*wyr.length)
 //All messages are lower cased then the imput is the prefix and the command
 //compares it to the command in the array object(array object created by command in util.js)
 // and replys so the user can see the bots response
    switch (userInput){
     case praise[rn].command:
        let res = praise[rn].response.replace("{user}", `${msg.author}`);
        res = res.replaceAll(/["|"]/g, ``)
        msg.reply(res);
        break
     case roast[n].command:
      let burn = roast[n].response.replace("{user}", `${msg.author}`);
      burn = burn.replaceAll(/["|"]/g, ``)
      msg.reply(burn);
        break
     case wyr[wn].command:
      let ratherOne = roast[n].responseOne.replace("{user}", `${msg.author}`);
      let ratherTwo = roast[n].responseTwo.replace("{user}", `${msg.author}`);
      rather = rather.replaceAll(/["|"]/g, ``)
      msg.reply(`Would you rather ${ratherOne} or ${ratherTwo}`);
        break
     default:
        break
     }
     // This checks to see if user is in the correct channel for nsfw even 
     //if emoji's are used it should still work
     if(userInput === flirt[fn].command && msg.channel.name.startsWith(nsfwChannel)){
      let fres = flirt[fn].response.replace("{user}", `${msg.author}`);
      fres = fres.replaceAll(/["|"]/g, ``)
       return msg.reply(fres);
     }
    else if(userInput === flirt[fn].command ){
        const nsfw = msg.guild.channels.cache.find((chId)=>{
            return chId.name.startsWith(nsfwChannel)
        })

        return  msg.reply(`Sorry my boss is watching, if you want to be flirty ${msg.author} let's head to the ${nsfw}!`)
    }

    
  })
client.login(process.env.CLIENTID)