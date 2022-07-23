import { RequestHandler } from "express"
import Book from "../models/Book"

export default class BookFunctions {
  public static create: RequestHandler = async (req, res, next) => {
    const { title, author } = req.body

    try {
      const newBook = new Book({ title, author })
      const book = await newBook.save()
      return res.status(201).json(book)
    } catch (error) {
      next(error)
    }
  }

  public static read: RequestHandler = async (req, res, next) => {
    const bookId = req.params.bookId

    try {
      const book = await Book.findById(bookId).populate("author")
      return book
        ? res.status(200).json({ book })
        : res.status(404).json({ message: "Not Found!" })
    } catch (error) {
      next(error)
    }
  }

  public static readAll: RequestHandler = async (req, res, next) => {
    try {
      const books = await Book.find().populate("author")
      return res.status(201).json({ books })
    } catch (error) {
      next(error)
    }
  }

  public static update: RequestHandler = async (req, res, next) => {
    const bookId = req.params.bookId
    const newBook = Object.assign({}, req.body)

    try {
      const book = await Book.findByIdAndUpdate(bookId, newBook)
      return book
        ? res.status(201).json({ book, newBook })
        : res.status(404).json({ message: "Not Found!" })
    } catch (error) {
      next(error)
    }
  }

  public static delete: RequestHandler = async (req, res, next) => {
    const bookId = req.params.bookId

    try {
      const book = await Book.findByIdAndDelete(bookId)
      return book
        ? res.status(201).json({ book, message: "Deleted!" })
        : res.status(404).json({ message: "Not Found!" })
    } catch (error) {
      next(error)
    }
  }
}
