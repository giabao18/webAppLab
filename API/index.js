import express from "express";
import appRoute from "./routes/index.js";
import { connectToDatabase } from "./DB/index.js";

const app = express();

app.use(express.json());
app.use("/courses", appRoute);

const PORT = process.env.PORT || 5000;

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => console.log("Server Open At port: ", PORT));
    })
    .catch((err) => {
        console.log("Error occurred with mysql connection. Error = ", err);
        process.exit(0);
    })
