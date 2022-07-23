import express, {
  ErrorRequestHandler,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express"
import mongoose from "mongoose"
import cors from "cors"
import { config } from "./config/config"
import Logging from "./library/Logging"
import authorRoutes from "./routes/Author"
import bookRoutes from "./routes/Book"

const app = express()

// Connect to Mongo
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to MongoDB")
    StartServer()
  })
  .catch((err) => {
    Logging.error("Unable to DB connect")
    Logging.error(err)
  })

//Only start the server if Mongo Connects
const StartServer = () => {
  // Log the request
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Log the req
    Logging.info(
      `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    )

    res.on("finish", () => {
      // Log the res
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] STATUS: [${res.statusCode}]`
      )
    })

    next()
  })

  app.use(urlencoded({ extended: true }))
  app.use(json())

  // Rules of out API
  app.use(
    cors({
      origin: "*",
      allowedHeaders: [
        "Origin",
        "X-Request-With",
        "Content-Type",
        "Accept",
        "Authorization",
      ],
      methods: ["PUT", "POST", "PATCH", "DELETE", "GET"],
    })
  )
  /* Default:
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Request-With, Content-Type, Accept, Authorization"
    )

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      )
      return res.status(200).json({})
    }

    next()
  })
  */

  // Routes
  app.use("/authors", authorRoutes)
  app.use("/books", bookRoutes)

  // Health check
  app.get("/ping", (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json({ hello: "world" })
  )

  const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    Logging.error(error)

    res.status(500).json({
      message: error.message,
    })
  }
  app.use(errorHandler)

  app.listen(config.server.port, () =>
    Logging.info(
      `Server is running on port ${config.server.port}\nhttp://localhost:${config.server.port}`
    )
  )
}
