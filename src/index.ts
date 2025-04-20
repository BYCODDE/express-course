import app from "./server";
import * as dotenv from "dotenv";

dotenv.config();  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
