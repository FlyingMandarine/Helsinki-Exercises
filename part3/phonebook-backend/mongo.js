const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://FlyingMandarine:${password}@cluster1.aouuh.mongodb.net/entry-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length === 3) {
    Entry.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
            console.log(note.name, note.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 4) {
    console.log('Please provide both a name (enclosed in quotation marks) and a number.')
    process.exit(1)
} else if (process.argv.length === 5) {
    const entry = new Entry({
        name: process.argv[3],
        number: process.argv[4],
    })

    entry.save().then(() => {
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}