const titleParser = require('./titleParser')
const writeToDB = require('./DbController')
const DbController = require('./DbController')
const model = require('../models/data')

module.exports = {
    renderHome: (req, res) => {
        const placeholder = []
        res.render('blankIndex.ejs')
    },

    handleDrop: async (req, res) => {
        try {
          const fileNames = req.body.names
          const parsedTitles = await titleParser.parse(fileNames)
          const parsedTitlesJson = JSON.stringify(parsedTitles)
          DbController.write(parsedTitlesJson, () => {
            console.log('check') // not logging, but no errors
            res.redirect('/renderWritten')
          })
        } catch (error) {
          console.error(error)
        }
      },

    renderWritten: async (req, res) => {
        const itemsToWrite = await model.findOne().sort({_id: -1})
        res.render('writtenIndex.ejs', {itemsToWrite: itemsToWrite} )
    },
}


//From ChatGPT
//In an MVC (Model-View-Controller) architecture, it is not possible to access data generated by a POST request in a subsequent GET request without saving the data in a persistent storage such as a database. This is because the POST request and the GET request are independent of each other, and the data generated by the POST request is not automatically available to the GET request.

//what we need to do - store data in Mongo DB with the titleParser module
////access that data with a subsequent GET request and render it to the dom 
////access that data with a subsequent POST request and write the data to the xlsx document 

//Once all of that is done we can move on to building functionality that will actually read the doc 