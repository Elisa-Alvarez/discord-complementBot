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

const getRows =  await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "COMPLIMENT!A:D",
  });

  const defaultArray = getRows.data.values
  let currentJson ={}
  let jsonArr =[]  
  defaultArray.forEach(index =>{
    currentJson = {...currentJson,id:index[0], command:index[1], response:index[2]} 
    jsonArr.push(currentJson)
    
  })
  jsonArr.shift()
  
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