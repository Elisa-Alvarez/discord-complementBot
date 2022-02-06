fs = require('fs')
const {getSheetData} = require('./api')

if(fs.existsSync('./data.json')){
}else{
 getSheetData()
}

const priaseCommand = () =>{
  let data = require('./data.json')
  let priase =[]
  data.forEach(index =>{
      if(index.command === ".=priase")priase.push(index)
  })
  return priase
}
const flirtCommand = () =>{
  let data = require('./data.json')
  let flirt =[]
  data.forEach(index =>{
      if(index.command === ".=flirt")flirt.push(index)
  })
  return flirt
}
const roastCommand = () =>{
  let data = require('./data.json')
  let roast =[]
  data.forEach(index =>{
      if(index.command === ".=roast")roast.push(index)
  })
  return roast
}

module.exports = {priaseCommand,flirtCommand,roastCommand}