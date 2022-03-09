fs = require('fs')
const {getSheetData} = require('./api')

if(fs.existsSync('./data.json')){
}else{
 getSheetData()
}

const praiseCommand = () =>{
  let data = require('./data.json')
  let priase =[]
  data.forEach(index =>{
      if(index.command === "=praise")priase.push(index)
  })
  return priase
}
const flirtCommand = () =>{
  let data = require('./data.json')
  let flirt =[]
  data.forEach(index =>{
      if(index.command === "=flirt")flirt.push(index)
  })
  return flirt
}
const roastCommand = () =>{
  let data = require('./data.json')
  let roast =[]
  data.forEach(index =>{
      if(index.command === "=roast")roast.push(index)
  })
  return roast
}

const dareCommand = () =>{
  let data = require('./data.json')
  let dare =[]
  data.forEach(index =>{
      if(index.command === "=dare")dare.push(index)
  })
  return dare
}
const truthCommand = () =>{
  let data = require('./data.json')
  let truth =[]
  data.forEach(index =>{
      if(index.command === "=truth")truth.push(index)
  })
  return truth
}
const wyrCommand = () =>{
  let data = require('./data.json')
  let wyr =[]
  data.forEach(index =>{
      if(index.command === "=wyr")wyr.push(index)
  })
  return wyr
}


module.exports = {praiseCommand,flirtCommand,roastCommand,dareCommand,truthCommand,wyrCommand}