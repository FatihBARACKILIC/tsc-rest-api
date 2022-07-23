import { NextFunction, Request, Response } from "express"
import Joi, { ObjectSchema, string } from "joi"
import { IAuthor } from "../models/Author"
import { IBook } from "../models/Book"

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body)
      next()
    } catch (error: any) {
      const message = error?.details[0]?.message ?? error
      return res.status(422).json({ message })
    }
  }
}

export const Schema = {
  author: Joi.object<IAuthor>({
    name: Joi.string().min(3).max(30).required(),
    surname: Joi.string().min(3).max(30).required(),
  }),
  book: Joi.object<IBook>({
    title: Joi.string().alphanum().min(1).max(255).required(),
    author: Joi.string().hex().min(24).max(24).required(),
  }),
}

const messages = {
  alphanum: "{{#label}} must only contain alpha-numeric characters",
  base: "{{#label}} must be a string",
  base64: "{{#label}} must be a valid base64 string",
  creditCard: "{{#label}} must be a credit card",
  dataUri: "{{#label}} must be a valid dataUri string",
  domain: "{{#label}} must contain a valid domain name",
  email: "{{#label}} must be a valid email",
  empty: "{{#label}} is not allowed to be empty",
  guid: "{{#label}} must be a valid GUID",
  hex: "{{#label}} must only contain hexadecimal characters",
  hexAlign: "{{#label}} hex decoded representation must be byte aligned",
  hostname: "{{#label}} must be a valid hostname",
  ip: "{{#label}} must be a valid ip address with a {{#cidr}} CIDR",
  ipVersion:
    "{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR",
  isoDate: "{{#label}} must be in iso format",
  isoDuration: "{{#label}} must be a valid ISO 8601 duration",
  length: "{{#label}} length must be {{#limit}} characters long",
  lowercase: "{{#label}} must only contain lowercase characters",
  max: "{{#label}} length must be less than or equal to {{#limit}} characters long",
  min: "{{#label}} length must be at least {{#limit}} characters long",
  normalize: "{{#label}} must be unicode normalized in the {{#form}} form",
  token: "{{#label}} must only contain alpha-numeric and underscore characters",
  "pattern.base":
    "{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}",
  "pattern.name":
    "{{#label}} with value {:[.]} fails to match the {{#name}} pattern",
  "pattern.invert.base":
    "{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}",
  "pattern.invert.name":
    "{{#label}} with value {:[.]} matches the inverted {{#name}} pattern",
  trim: "{{#label}} must not have leading or trailing whitespace",
  uri: "{{#label}} must be a valid uri",
  uriCustomScheme:
    "{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern",
  uriRelativeOnly: "{{#label}} must be a valid relative uri",
  uppercase: "{{#label}} must only contain uppercase characters",
}
