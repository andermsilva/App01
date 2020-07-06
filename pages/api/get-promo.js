import { GoogleSpreadsheet } from 'google-spreadsheet'
import credentials  from '../../credentials.json'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)
export default async(req,res)=>{
    
    try{
        await doc.useServiceAccountAuth({
            client_email: process.env.SHEET_CLIENT_EMAIL,
            private_key: process.env.SHEET_PRIVATE_KEY
        })
        await doc.loadInfo()
       
         const sheet = doc.sheetsByIndex[2]
         await sheet.loadCells('A3:B3')
   
         const mostrarPromocaocell = sheet.getCell(2,0)
         
         const textCell = sheet.getCell(2,1)

         res.end(JSON.stringify({
            showCoupon: mostrarPromocaocell.value ==='VERDADEIRO',
            message:textCell.value
            
        }))
         


   }catch(err){
        res.end(JSON.stringify({
            showCoupon: false,
            message:''
            
        }))
     
    
   } 

}