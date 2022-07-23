import { Router } from "express"
import BookFunctions from "../controllers/Book"
import { Schema, ValidateSchema } from "../middleware/Validate"

const router = Router()

router.post("/create", ValidateSchema(Schema.book), BookFunctions.create)
router.get("/getBook/:bookId", BookFunctions.read)
router.get("/getBooks", BookFunctions.readAll)
router.patch(
  "/update/:bookId",
  ValidateSchema(Schema.book),
  BookFunctions.update
)
router.delete("/delete/:bookId", BookFunctions.delete)

export = router
