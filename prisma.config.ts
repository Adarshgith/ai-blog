// import { defineConfig } from "prisma/config";
// import path from 'path'
// import * as dotenv from 'dotenv'

// dotenv.config()

// process.env.DATABASE_URL = process.env.DATABASE_URL

// export default defineConfig({
//   schema: path.join('prisma', 'schema.prisma'),
// })

import { defineConfig } from "prisma/config";
import path from 'path'

process.env.DATABASE_URL = "postgresql://neondb_owner:npg_hjcbnYoJO42A@ep-jolly-lake-ax19ezl4-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require"

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
})