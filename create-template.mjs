import * as fs from 'fs';
import * as path from 'path';
import dayjs from 'dayjs';

const __dirname = path.dirname((new URL(import.meta.url)).pathname);
const blogRoot = path.resolve(__dirname, 'content/blog');
const today = dayjs();
const year = today.year().toString();
const month = (today.month() + 1).toString();
const date = today.date().toString();
const filedir = path.join(blogRoot, year, month);

if (!fs.existsSync(filedir)) {
  fs.mkdirSync(filedir, {
    recursive: true
  });
}
const filepath = path.join(filedir, date) + '.md';
if (fs.existsSync(filepath)) {
  throw new Error(`${filepath} has been already created!`);
}

const template = 
`
---
date: ${today.format('YYYY-MM-DD')}
title: ${today.format('MMMM d, YYYY')}
description: false
---

`

fs.writeFileSync(filepath, template);



