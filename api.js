require("dotenv").config();
fs = require('fs')
const { google } = require("googleapis");
const spreadsheetId = process.env.SPREADSHEETID

async function getSheetData(){

const auth =  new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
});

  // Create client instance for auth
const gclient =  await auth.getClient();

  // Instance of Google Sheets API
const googleSheets = google.sheets({ version: "v4", auth: gclient });

const getRowsNSFW =  await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "NSFW COMPLIMENT!A:C",
  });
  const getRowsRoast =  await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "ROASTS!A:C",
  });
  const getRowsCompliments =  await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "COMPLIMENT!A:D",
  });
  const getRowsDare = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "DARE!A:C",
  });
  const getRowsTruth = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "TRUTH!A:C",
  });
  const getRowsWYR = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Would you rather (WYR)!A:D",
  });

  let compliment =getRowsCompliments.data.values
  let nsfw =getRowsNSFW.data.values
  let roasts =getRowsRoast.data.values
  let dare =getRowsDare.data.values
  let truth =getRowsTruth.data.values
  let wyr =getRowsWYR.data.values

  compliment.shift()
  nsfw.shift()
  roasts.shift()
  dare.shift()
  truth.shift()
  wyr.shift()

  let currentJson ={}
  let jsonArr =[]  
  
  compliment.forEach(index =>{
    currentJson = {...currentJson,id:index[0], command:index[1], response:index[2]} 
    jsonArr.push(currentJson)
    
  })

  nsfw.forEach(index =>{
    currentJson = {...currentJson,id:index[0], command:index[1], response:index[2]} 
    jsonArr.push(currentJson)
    
  })

  roasts.forEach(index =>{
    currentJson = {...currentJson,id:index[0], command:index[1], response:index[2]} 
    jsonArr.push(currentJson)
    
  })

  truth.forEach(index =>{
    currentJson = {...currentJson,id:index[0], command:index[1], response:index[2]} 
    jsonArr.push(currentJson)
    
  })

  dare.forEach(index =>{
    currentJson = {...currentJson,id:index[0], command:index[1], response:index[2]} 
    jsonArr.push(currentJson)
    
  })

  wyr.forEach(index =>{
    currentJson = {...currentJson,id:index[0], command:index[1], response:index[2],responseTwo:index[3]} 
    console.log(currentJson)
    jsonArr.push(currentJson)
    
  })

  if(fs.existsSync('./data.json')){
    fs.unlinkSync('./data.json')
    fs.writeFile('./data.json',JSON.stringify(jsonArr), (err)=>{
      if (err) throw err
    })
  }else{
    fs.writeFile('./data.json',JSON.stringify(jsonArr), (err)=>{
      if (err) throw err
    })
  }

}
getSheetData()
module.exports= {getSheetData}