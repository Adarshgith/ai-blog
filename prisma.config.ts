import { defineConfig } from "prisma/config";
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

process.env.DATABASE_URL = process.env.DATABASE_URL

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
})