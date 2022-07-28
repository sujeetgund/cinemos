require('dotenv').config();

const express = require("express")
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors());

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})


app.get('/', async (req, res) => {
    console.log(`Server is running on port ${PORT}`);
    res.send("<center><h1>Welcome to the Cinemos API</h1></center>");
})


// import news routes
const bollywoodNews = require('./routes/bollywoodNews')
const ottNews = require('./routes/ottNews')
const internationalNews = require('./routes/internationalNews')
const kpopNews = require('./routes/kpopNews')
const southcinemaNews = require('./routes/southcinemaNews')
const fashionNews = require('./routes/fashionNews')

app.use('/news/bollywood', bollywoodNews)
app.use('/news/ott', ottNews)
app.use('/news/international', internationalNews)
app.use('/news/kpop', kpopNews)
app.use('/news/south-cinema', southcinemaNews)
app.use('/news/fashion', fashionNews)



