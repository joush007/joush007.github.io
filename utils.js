import * as fs from "node:fs"
import Showdown, { } from "showdown"

export function createObj(path) {
    const dir = fs.readdirSync(path, "utf-8")
    /** @type {{posts: {title: string, date: string, content: string, id:string}[]}} */
    let obj = {
        posts: []
    }
    for (let file of dir) {
        if (!file.includes(".md")) continue

        let date = file.split("-")[0].replaceAll("_", "/")

        let all = fs.readFileSync(`${path}/${file}`)

        let title = all.toString()
            .split("\n")[0]
            .replace("\r", "")

        let content = all.toString()
            .split("\n")
            .slice(4)
            .join("\n")
            .replaceAll("\r", "")
        
            
        content = new Showdown.Converter().makeHtml(content)
        let preview = content.slice(0, 497).replaceAll(/<img src="(.*)".*\/?>/gm, '<br><a href="$1"><i>Image</i></a>')
            
        date = dateFormat(date)

        obj.posts.push({ file, date, title, content, preview, id: file.split("-")[1].replace(".md", "") })
    }

    obj.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    for (let post of obj.posts) {
        post.date = dateFormat(post.date)
    }

    return obj
}

function dateFormat (date) {
    const [dd, mm, yyyy] = date.split("/")
    return `${mm}/${dd}/${yyyy}`
}

