import { Router } from "express"
import AuthorFunctions from "../controllers/Author"
import { Schema, ValidateSchema } from "../middleware/Validate"

const router = Router()

router.post("/create", ValidateSchema(Schema.author), AuthorFunctions.create)
router.get("/getAuthor/:authorId", AuthorFunctions.read)
router.get("/getAuthors", AuthorFunctions.readAll)
router.patch(
  "/updateAuthor/:authorId",
  ValidateSchema(Schema.author),
  AuthorFunctions.update
)
router.delete("/deleteAuthor/:authorId", AuthorFunctions.delete)

export = router
