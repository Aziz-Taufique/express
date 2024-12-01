import express from "express"

const app = express();
const port = 8080

app.use(express.json())

let country = []
let countryId = 0;

// put data in database
app.post("/place", (req, res) => {
    const {state, capital} = req.body

    let data = {id: countryId++, state, capital}
     country.push(data)
    res.status(201).send(data)
})

// get all data
app.get("/place", (req, res) => {
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