const express = require("express")
const routes = require('./routes/index')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()
const router = express.Router()

let port = 3000 || process.env.PORT

routes(router)

app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', router)


app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});