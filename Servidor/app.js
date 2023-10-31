import express from "express"
import cors from "cors"


// importo DB
import db from "./database/db.js"
// importo el Enrutador
import routes from "./routes/routes.js"


const app = express()

app.use(cors())

app.use(express.json())

app.use("/", routes)

try {
    await db.authenticate()
    console.log("coneccion exitosa a DB")
} catch (error) {
    console.log(`el error de coneccion es: ${error}`)
}

app.listen(8100, ()=>{
    console.log("Server Up on running in http://localhost:8100/")
 
})