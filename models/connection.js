var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect('mongodb+srv://dbUserJMNhan:dbUserJMNhan@cluster0.tgphf.mongodb.net/bakweb?retryWrites=true&w=majority',
    options,
    function(err){
        if (err){
            console.log(`error, failed to connect to the database because --> ${err}`);
        } else {
            console.info(`****** DATABASE CONNECTION BAK : SUCESS ****`)
        }
    }
)

module.exports = mongoose