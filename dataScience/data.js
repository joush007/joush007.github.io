import * as fs from "node:fs"
import * as utils from "../utils.js"

// Create JSON files to store all posts
let obj = utils.createObj("./dataScience")

fs.writeFileSync("./dataScience/data.json", JSON.stringify(obj))