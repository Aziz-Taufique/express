import express, { Request, Response } from "express";

const app = express();
const port = 8080;

app.use(express.json());

interface Country {
  id: number;
  state: string;
  capital: string;
}

let countries: Country[] = [];
let countryId = 0;

// Add a new country
app.post("/place", (req: Request, res: Response) => {
  const { state, capital }: { state: string; capital: string } = req.body;

  const data: Country = { id: countryId++, state, capital };
  countries.push(data);
  res.status(201).send(data);
});

// Get all countries
app.get("/place", (req: Request, res: Response) => {
  res.status(200).send(countries);
});

// Get a specific country by ID
app.get("/place/:id", (req: Request<{ id: string }>, res: Response) => {
  const data = countries.find((c) => c.id === parseInt(req.params.id));
  if (!data) return res.status(404).send("Country not found");
  return res.status(200).send(data);
});

// Update a specific country
app.put("/place/:id", (req: Request<{ id: string }>, res: Response) => {
  const data = countries.find((c) => c.id === parseInt(req.params.id));
  if (!data) return res.status(404).send("Country not found");

  const { state, capital }: { state: string; capital: string } = req.body;

  data.state = state;
  data.capital = capital;
  return res.status(200).send(data);
});

// Delete a specific country
app.delete("/place/:id", (req: Request<{ id: string }>, res: Response) => {
  const index = countries.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Country not found");

  countries.splice(index, 1);
  return res.status(200).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});


// Key Changes in TypeScript
// Interface for Country: Defines the structure of the country object for better type safety.
// Types for Request Parameters and Body: Added specific types for request parameters ({ id: string }) and body ({ state: string; capital: string }).
// Strongly Typed Array: The countries array is strongly typed as Country[].
// Error Checking with Types: Improved type safety by ensuring req.params and req.body are explicitly typed.
