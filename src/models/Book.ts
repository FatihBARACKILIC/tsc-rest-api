import mongoose, { Schema } from "mongoose"

export interface IBook {
  title: string
  author: Schema.Types.ObjectId
}

const BookSchema: Schema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IBook>("Book", BookSchema)
