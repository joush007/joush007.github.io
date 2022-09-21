import * as fs from "node:fs"
import Showdown, { } from "showdown"

// Take in the file path and turn all MD files into a json file with specific keys for accessing key information
export function createObj(path) {
    
    // Get all files in the specified dir
    const dir = fs.readdirSync(path, "utf-8")
    /** @type {{posts: {title: string, date: string, content: string, id:string}[]}} */
    let obj = {
        posts: []
    }
    
    // For all files in the directory, check if the files are markdown files, else go to the next iteration
    for (let file of dir) {
        if (!file.includes(".md")) continue

        // Convert dates from the file name (dd-mm-yyyy) to regular date expression (dd/mm/yyyy)
        // Name of files formatted as date-id
        let date = file.split("-")[0].replaceAll("_", "/")

        let fullPost = fs.readFileSync(`${path}/${file}`)

        // First line of file is title (Keep # as converted to h1)
        let title = fullPost.toString()
            .split("\n")[0]
            .replace("\r", "")

        // Content starts at line 5 (3 lines of post information & line break)
        // Rejoin the remaining elements that were split by a new line, with a new line & remove returns
        let content = fullPost.toString()
            .split("\n")
            .slice(4)
            .join("\n")
            .replaceAll("\r", "")
        
        // Convert MD to HTML
        content = new Showdown.Converter().makeHtml(content)

        // Replace all images with a link to the image, and cut the content down to 500 characters, including a "..." at the end
        let preview = content.slice(0, 497).replaceAll(/<img src="(.*)".*\/?>/gm, '<br><a href="$1"><i>Image</i></a>')

        // Add post info to list of objects
        obj.posts.push({ file, date, title, content, preview, id: file.split("-")[1].replace(".md", "") })
    }
    // Sort posts by date (dates sorted by American format, conversion must be done)
    obj.posts.sort((a, b) => new Date(dateFormat(b.date)).getTime() - new Date(dateFormat(a.date)).getTime())

    return obj
}

function dateFormat (date) {
    // AU date format to US date format and vice-versa
    const [dd, mm, yyyy] = date.split("/")
    return `${mm}/${dd}/${yyyy}`
}

