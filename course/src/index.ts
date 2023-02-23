import app from "./server";
import * as dotenv from "dotenv"

dotenv.config()
app.listen(3001,()=>{
    console.log("Server running at Port 3000");
});