with open("./index.md", 'r') as f:
    # Get all posts, split by the heading
    x = f.read().split("\n# <a")
    # Print table o' contents
    print(x[1])

    # Open file containing directory tree
    with open('./files.md') as m:
        # Get each individual file name and remove the "root:"
        md = m.read().split('- ')
        md.pop(0)
        # Prefix variable
        pre = ""
        # For directory name in markdown file
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
                        # Remove post from all posts and continue to next date
                        x.pop(x.index(part))
                        break
    print(x[0])