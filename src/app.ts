import express, { type Application } from "express"
import dotenv from "dotenv"
import { productsRouter } from "./routes/productsRoutes"
import { authRouter } from "./routes/authRoutes"

dotenv.config()

const app: Application = express()
app.use(express.json())

app.use("/api", productsRouter)
app.use("/api/auth", authRouter)

export default app
