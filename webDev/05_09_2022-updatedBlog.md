# Updating the Blog Page and Local Storage
## Web Dev
### 05/09/2022

Last week I rewrote my entire github site that you're reading this post on as well as having a look into local storage, which was a bit of a refresher from when I used it in the assessment piece for last semester.

The major part of the week was spent writing the HTML, CSS and JavaScript to get the blog pages to look more organised and easier to navigate as well as being a bit more advanced. There were a few ideas for the methods to convert the old blog to the new one, as the previous versions were all stored in a single markdown file that was structured consistently, which was quite helpful. The structure looked a bit along the lines of:

```md
# <Title>
## <Subject>
### <Date>

<Content>
```

This made it easier to split the file into multiple files as it was a consistent structure to split the page by. The way I split the page was by reading through the file and finding all parts that had `\n# ` to grab each singular post (That is it splits at the title of each post).

From there I took in another file that was created which was formatted as a markdown file that showed the file tree of where I wanted each file to be and how they were to be named. I used python to take each line of the file and figure out what the file was based on the heading (indentation was visible but unused in the python script). This would find the name I wanted to use and create a new file for it. Once the file was created, it was written to with the matching post found by the date which was done using the following method:

```py
for dir in md:
    dir=dir.strip()
    # Change directory prefix to create file based on 'directory' parent
    if dir == "data:":
        pre = "./dataScience/"
        continue
    elif dir == "web:":
        pre = "./webDev/"
        continue
    elif not ".md" in dir:
        continue
    # Create the file and write the post to the file
    with open("%s%s" %(pre, dir), "w") as newFile:
        # Go through each available post
        for part in x:
            # Get the correct post by date on post
            h3 = ("### %s"% (dir.split("2022-")[0] + "2022"))
            if h3.replace("_","/") in part:
                # Write the post to the file without the tag
                newFile.write("# " + part.split("></a>")[1].strip())
                # Remove post from set of posts and continue to next date
                # (The top post is the Data Science post in format)
                x.pop(x.index(part))
                break
```

I was then able to save each of the different files and create another script that was used to create a JSON file based on all of the new markdown files created that held each of the posts which took all of the markdown files in the folder and took key parts of the file (e.g. date, title, content (using an external library called showdown to convert markdown to html) and id) and pushed them to an object where the dates were sorted by time since EPOCH in milliseconds to provide accurate sorting (although I had to format the dates so that they were in the american format of mm/dd/yyyy so that it would process correctly) which was then pushed to a JSON file to be read by the JS files attached to the web pages.

```js
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
```

This provided enough to get the process running smoothly as I setup a github action to run the JS file which updated the JSON files and recommitted it, running into some small issues, where if nothing changed it would error out, but there was a quick work around to not run it if it will error with the `|| true`:

```yml
    git add -A || true
    git commit -m "Update JSON" || true
    git push || true
```

Overall I feel that I was highly productive in the non-useful parts of the class, where I was meant to be focusing on Local Storage, but ended up rewriting my entire blog site to be more aesthetically pleasing and easier to navigate. On the plus side I was also already slightly familiar with using local storage as said, due to using it in the first assignment where I created a website last semester and used local storage thanks to Michael's ideas and help with the understanding of the concept and applications.

I did, though, run through the tutorial that was assigned to us to complete and got it *partially* working... I got the main gist of it working, except I was having trouble with the updating of some elements as we took a script from a tutorial and tried to change the normal JS into JQuery, which slightly failed.

In retrospect I could have been using my time for the purpose of understanding more about local storage, but I believe I have benefitted myself more by rewriting the page and understanding new methods to use JS, Python and HTML to get a fully functioning website that was transformed from a single-paged blog into a multi-paged site that shows all posts, including the most recent in itself. I have developed my skills in problem solving, ideating and collaboration with peers while creating this page which will have further helped with my future of I.T. as especially with collaboration with others, I am able to have others there who I can collaborate with to create fully functioning applications with real uses as I have done before with Michael and continue to do.