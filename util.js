
const priaseCommand = () =>{
if(fs.existsSync('./data.json')){
}else{
  async () =>await api
}
  let data = require('./data.json')
 ata

 
    let priase =[]
  data.forEach(index =>{
      if(index.command === ".=priase")priase.push(index)
  })
  return priase
}
const flirtCommand = () =>{
    let flirt =[]
  data.forEach(index =>{
      if(index.command === ".=flirt")flirt.push(index)
  })
  return flirt
}
const roastCommand = () =>{
    let roast =[]
  data.forEach(index =>{
      if(index.command === ".=roast")roast.push(index)
  })
  return roast
}
priaseCommand()
flirtCommand()
roastCommand()
module.exports = {priaseCommand,flirtCommand,roastCommand}