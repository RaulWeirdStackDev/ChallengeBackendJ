import express, { type Application } from "express"
import dotenv from "dotenv"
import { productsRouter } from "./routes/productsRoutes"
import { authRouter } from "./routes/authRoutes"
import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerOptions from "../docs/swaggerOptions"

dotenv.config()

const app: Application = express()
app.use(express.json())

const specs = swaggerJsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

app.use("/api/auth", authRouter)
app.use("/api", productsRouter)


export default app
