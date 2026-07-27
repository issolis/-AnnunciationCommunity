import express from "express";
import { headquarterRouter } from "./modules/headquearter/presentation/headquarter.routes.js";

const app = express();

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use("/headquarter", headquarterRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 