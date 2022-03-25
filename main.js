require("dotenv").config();
fs = require('fs')
const cron = require('node-cron')
const {getSheetData} = require('./api')
const { Client, Intents} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = process.env.PREFIX
const {
  praiseCommand,
  flirtCommand,
  roastCommand,
  wyrCommand,
  dareCommand,
  truthCommand,
  selfieCommand,

} = require('./util');

if(fs.existsSync('./data.json')){
}else{
  getSheetData()
}
function sundSelfie (){
  let oldSelfie=[]
  let sn = Math.floor(Math.random()*selfie.length)
  if(oldSelfie.includes[selfie[sn].response]){
      sn=Math.floor(Math.random()*selfie.length)
  }
  let message = `Happy Selfie Sunday @Everyone! Today's theme is **${selfie[sn].response}**! Let's see your selfies fruits!!🍓💖🙃`
  oldSelfie.push(message)
  return message
}
const selfie = selfieCommand()

//Starts the bot
client.on("ready", ()=> {
  console.log(`Logged in as ${client.user.tag}!`)
  
  setInterval(()=>{
    let d = new Date()
   console.log
    const channelName='art🎨'

    if(d.getDay()===1 && d.getUTCHours() === 13){
      let sn=Math.floor(Math.random()*selfie.length)
      let message = `Happy Selfie Sunday @Everyone! Today's theme is **${selfie[sn].response}** Let's see your selfies fruits!!🍓💖🙃`
      const channel = client.channels.cache.find(channel => channel.name === channelName)
      channel.send(message)
    }

  },1000)
})

client.on("messageCreate", msg => {
const praise = praiseCommand()
const flirt = flirtCommand()
const roast = roastCommand()
const wyr = wyrCommand()
const dare=dareCommand()
const truth=truthCommand()

 //if prefix of the command is not given bot will ignore  
  if (!msg.content.startsWith(prefix)|| msg.author.bot) return
  
    const nsfwChannel = 'flirty-fruits'
    const args = msg.content.split(prefix.length).splice(/ +/);
    const userInput = args.shift().toLowerCase()
    const taggedUser = msg.mentions.users.first()
  //*each command may have a different # of responses
  // this goes off the length of the coresponding array objects
    let pn = Math.floor(Math.random()*praise.length)
    let fn=Math.floor(Math.random()*flirt.length)
    let rn=Math.floor(Math.random()*roast.length)
    let wn=Math.floor(Math.random()*wyr.length)
    let dn=Math.floor(Math.random()*dare.length)
    let tn=Math.floor(Math.random()*truth.length)
    
      // praise[pn].command
      if (taggedUser)
      {
        let Tagres= praise[pn].response.replace("{user}", `${taggedUser.username}`);
        Tagres = Tagres.replaceAll(/["|"]/g, ``)
        return msg.reply(`${Tagres}`) 
      }

    switch (userInput){
     case praise[pn].command:
        let res = praise[pn].response.replace("{user}", `${msg.author}`);
        res = res.replaceAll(/["|"]/g, ``)
        msg.reply(res);
        break
     case roast[rn].command:
      let burn = roast[rn].response.replace("{user}", `${msg.author}`);
      burn = burn.replaceAll(/["|"]/g, ``)
      msg.reply(burn);
        break
     case dare[dn].command:
      let dared = dare[dn].response.replace("{user}", `${msg.author}`);
      dared = dared.replaceAll(/["|"]/g, ``)
      msg.reply(dared);
        break 
     case truth[tn].command:
      let truths = truth[tn].response.replace("{user}", `${msg.author}`);
      truths = truths.replaceAll(/["|"]/g, ``)
      msg.reply(truths);
      break 
     case wyr[wn].command:
      let ratherOne = wyr[wn].response.replace("{user}", `${msg.author}`);
      let ratherTwo = wyr[wn].responseTwo.replace("{user}", `${msg.author}`);
      ratherOne = ratherOne.replaceAll(/["|"]/g, ``)
      ratherTwo = ratherTwo.replaceAll(/["|"]/g, ``)
      msg.reply(`Would you rather ${ratherOne},
      Or
      ${ratherTwo}`);
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