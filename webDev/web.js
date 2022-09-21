import * as fs from "node:fs"
import * as utils from "../utils.js"

// Create the JSON object to store all posts
let obj = utils.createObj("./webDev")

fs.writeFileSync("./webDev/web.json", JSON.stringify(obj))