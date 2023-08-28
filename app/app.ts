import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// Mengimpor rute bukalapak
import bukalapakRoutes from "./routes/bukalapakRoutes";
import blibliRoutes from "./routes/blibliRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
const port = 3070;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gunakan rute produk
app.use("/bukalapak", bukalapakRoutes);
app.use("/blibli", blibliRoutes);
app.use("/user", authRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
