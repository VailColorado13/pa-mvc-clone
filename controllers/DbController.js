const database =  require('../models/data')

module.exports = {

    write: async (req, res)=>{
        try{
             await database.create({tableData: req})
            console.log('datbase has been updated')
        }catch(err){
            console.log(err)
        }
    }

}