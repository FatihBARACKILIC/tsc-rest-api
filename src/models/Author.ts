import mongoose, { Schema } from "mongoose"

export interface IAuthor {
  name: string
  surname: string
}

const AuthorSchema: Schema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
  },
  { versionKey: false }
)

export default mongoose.model<IAuthor>("Author", AuthorSchema)
