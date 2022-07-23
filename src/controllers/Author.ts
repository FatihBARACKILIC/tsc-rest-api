import { RequestHandler } from "express"
import Author from "../models/Author"

export default class AuthorFunctions {
  public static create: RequestHandler = async (req, res, next) => {
    const { name, surname } = req.body

    try {
      const newAuthor = new Author({ name, surname })
      const author = await newAuthor.save()
      return res.status(201).json(author)
    } catch (Error) {
      next(Error)
    }
  }

  public static read: RequestHandler = async (req, res, next) => {
    const authorId = req.params.authorId

    try {
      const author = await Author.findById(authorId)
      return author
        ? res.status(200).json({ author })
        : res.status(404).json({ message: "Not Found!" })
    } catch (Error) {
      next(Error)
    }
  }

  public static readAll: RequestHandler = async (req, res, next) => {
    try {
      const author = await Author.find()
      return res.status(200).json({ author })
    } catch (err) {
      next(Error)
    }
  }

  public static update: RequestHandler = async (req, res, next) => {
    const authorId = req.params.authorId
    const newAuthor = Object.assign({}, req.body)

    try {
      const author = await Author.findByIdAndUpdate(authorId, newAuthor)
      return author
        ? res.status(201).json({ author, newAuthor })
        : res.status(404).json({ message: "Not Found!" })
    } catch (err) {
      next(Error)
    }
  }

  public static delete: RequestHandler = async (req, res, next) => {
    const authorId = req.params.authorId

    try {
      const author = await Author.findByIdAndDelete(authorId)
      return author
        ? res.status(201).json({ author, message: "Deleted!" })
        : res.status(404).json({ message: "Not Found!" })
    } catch (err) {
      next(Error)
    }
  }
}
