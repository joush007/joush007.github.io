import * as fs from "node:fs"
import * as utils from "../utils.js"

let obj = utils.createObj("./webDev")

fs.writeFileSync("./webDev/web.json", JSON.stringify(obj))

console.log(obj);