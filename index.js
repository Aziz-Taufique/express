import dotenv from "dotenv"
import express from "express"
import logger from "./logger.js";
import morgan from "morgan";
dotenv.config()

const app = express();
const port = process.env.PORT || 8080
app.use(express.json())


const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

let country = []
let countryId = 0;

// put data in database
app.post("/place", (req, res) => {
    logger.info("A post request happen to add country")
    const {state, capital} = req.body

    let data = {id: countryId++, state, capital}
     country.push(data)
    res.status(201).send(data)
})

// get all data
app.get("/place", (req, res) => {
    logger.info("this is get method")
    res.status(200).send(country)
})

// get specific data
app.get("/place/:id", (req, res) => {
   const data = country.find(c => c.id === parseInt(req.params.id))
   if(!data) return res.status(404).send("country not find")
    return res.status(200).send(data)
})
// update
app.put("/place/:id", (req, res) => {
    const data = country.find(c => c.id === parseInt(req.params.id))
    if(!data) return res.state(404).send("country not find")

    const {state, capital} = req.body

    data.state = state
    data.capital = capital
    return res.status(200).send(data)
})

// delete
app.delete("/place/:id", (req, res) => {
    const index = country.findIndex(c => c.id === parseInt(req.params.id))
    if(index == -1) return res.status(404).data("country not found")

    country.splice(index, 1);
    return res.status(200).send("deleted")
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})