const {send} = require('micro')
const mongoose = require('mongoose')
const { Files } = require('schemas')(mongoose)
const encode = value => encodeURIComponent(value).replace(/^%40/, '@');

mongoose.connect("mongodb://aria:malkani@ds231070.mlab.com:31070/file-system")
mongoose.Promise = global.Promise

module.exports = async (req, res) => {
    const urlParams = req.url.split('/')
    if (urlParams[1] === "favicon.ico") {
        const statusCode = 400
    const data = { error: 'Custom error message' }

    send(res, statusCode, data)
    return
        
    }

    const spec = {
		full: encode(mongoose)
	};

    console.log('file')
    console.log(spec)
    console.log('file')

    // const name = 'hello';
    // const file = await Files.findOne({name}).exec()

    // const script = new Files({
    //     name: "test4"
    //   })
    //   await script.save()
      const name = 'test4'
    //   const file = await Files.findOne({name}).exec()

      try {
        const script = new Files({
            name: "test4"
          })
          await script.save()
      } catch (error) {
        console.error(error);
      }
      const file = await Files.findOne({name}).exec()

    console.log(file)
    console.log("hi");

    const statusCode = 200
    const data = { error: 'Success' }

    send(res, statusCode, data)
}