const express = require('express')
const path = require('path')
const bodyparser = require('body-parser')
const { default: axios } = require('axios')

const app = express()
const PORT = process.env.PORT || 3000


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//set view engine
app.engine('html', require('ejs').renderFile)
app.set("view engine", "html")
app.set("views", path.resolve(__dirname, "public"))

//Load assets
app.use('/', express.static(path.resolve(__dirname, "public")))
app.use('/assets', express.static(path.resolve(__dirname, "public/assets")))
// app.use('/media', express.static(path.resolve(__dirname, "public/static")))


// Handle Request
app.get('*', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})