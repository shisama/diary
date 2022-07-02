import * as fs from "fs"
import * as path from "path"
import dayjs from "dayjs"

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const blogRoot = path.resolve(__dirname, "content/blog")
const targetDate =
  process.argv.length > 2 ? dayjs(process.argv[2], "YYYY-MM-DD") : dayjs()
const filedir = path.join(blogRoot, targetDate.format("YYYY/MM"))

if (!fs.existsSync(filedir)) {
  fs.mkdirSync(filedir, {
    recursive: true,
  })
}
const filepath = path.join(filedir, targetDate.format("DD")) + ".md"
if (fs.existsSync(filepath)) {
  throw new Error(`${filepath} has been already created!`)
}

const template = `---
date: ${targetDate.format("YYYY-MM-DD")}
title: ${targetDate.format("MMMM D, YYYY")}
description: false
---

`

fs.writeFileSync(filepath, template)
