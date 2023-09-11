---
title: "Winston Wk 10 | Codeblocks, Decorators, and More!"
date: 2023-09-04
topics: ["Web Development", "WINSTON"]
series: ["WINSTON"]
series_order: 19
---

[Diff](https://github.com/joush007/Flask-Server-WINSTON/compare/23684b9c05dfbbc0f52326c385d9bb7d9b51e96d...edb57500ed9a63dc5b3c6a6ab115b7b92a67b1a2)

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Overview

Last week I worked on a few backend things and got a few of the heavily requested features added that needed to be done. On top of that I messed around with learning some more about HTML, CSS & JS to create an animated modal that appears on the click of a button. I managed to develop codeblocks in posts that have syntax highlighting and added a decorator called `@admin_required` that works similarly to `@login_required`.

# Codeblocks

Implementing codeblocks with syntax highlighting may seem like a bit of a daunting task at first, but believe me, with the right tools and libraries, you'll get the hang of it right away. For reference, I am using `Showdown` as my parser of choice for md to html in this scenario. The library I used for this isn't too difficult to implement, but requires a little bit of setup. Firstly, you need to go to [prismjs.com](https://prismjs.com/download.html) and choose your preferences accordingly. Once you have decided on what features of prism you would like to use, you can download the JS and CSS files. If you're using flask or django, you might need to put those into a static folder for ease of reference throughout the web app. Once you have the files in the right locations, you can import them into your files. I chose to import them only into the files which needed them, and so the top import of my page looks like this:

```html
<link
    href="{{ url_for('static', filename='themes/prism.css') }}"
    rel="stylesheet"
/>
```

Then, you need to import your js file after the text is present, as it will get to work as soon as you import it. This means you should add it to the bottom of the page if you're using a static page, but if you have assets being loaded after the page is loaded, you may want to add it after everything is loaded through code.

```html
<script>
    document.addEventListener("DOMContentLoaded", async () => {

        ...

        // Create the script
        const prismImportScript = document.createElement("script");
        prismImportScript.src = '{{ url_for("static", filename="dist/lib/prism.js") }}';

        // Add the script to the page
        document.body.appendChild(prismImportScript);
    });
</script>
```

Doing this method means that it won't miss any codeblocks that may be added after the initial page load, and will also mean that it won't slow down the initial page load. Once all of this is done, you can add the codeblock to your markdown file. It would look something along the lines of:

````md
```python
def foo():
    print("Hello World!")
    return
```
````

With everything listed above, your syntax highlighting should be no issue. Libraries like bootstrap have this feature built in, but if you would like to use a different library that doesn't take it into account, you can use the above method to get syntax highliting working.

## Recap

-   `PrismJS` can be used to add syntax highlighting to codeblocks
-   Download the files from [prismjs.com](https://prismjs.com/download.html)
-   Import the files into your project
-   Add the codeblock to your file
-   Add the script to the page to render the codeblock with highlighting

# @admin_required Decorator

Flask login has a feature to only allow logged in users to access specific pages on a website by using the `@login_required` decorator on the function alongside the `@route` decorator. This will then check if you are logged in before allowing you to access the page. In Winstogram, I had to implement admin only access to a few pages, but I didn't want to add a bunch of if clauses, and so I decided to create a new decorator to check if you're an admin before allowing you to access the page. It works by taking the same approach as `@login_required` but changes the function to check if you're an admin instead of checking if you're logged in. The code for this decorator is as follows:

```python
# Required libs
from functools import wraps
from flask_login import current_user
from flask import abort


def admin_required(function):
    '''
    Check if a user is admin, if not, return 401 (Unauthorised)
    '''
    @wraps(function) # The wrapper will wrap the function specified above
    def decorated_function(*args, **kwargs):
        # If the user isn't logged in
        if not current_user.is_authenticated:
            # Abort returns the error page with the error code specified
            abort(401)
        # If the user isn't an admin
        if current_user.admin == False:
            abort(401)

        # If the user is logged in and is an admin, go as normal
        return function(*args, **kwargs)

    # Run the checks
    return decorated_function
```

The function aims to improve the speed at which I am able to create new pages that require admin only access, and therefore instead of performing a check every time which would be 3 lines of code, I can create a decorator that will require a line of code to be added to the function, taking up the same amount of space as any other function using the `@login_required` decorator. This is due to the fact that it does an authentication check in this function, and so it can be used in place of the `@login_required` decorator. This will speed up the process of creating new pages that require admin only access, and will also make it easier to read the code as it will be more concise.

# Modals & Animation

For context, I am new to css animations but not necessarily with css or html. With this in mind, and the fact that I'm bad at front end and making things look nice, I decided to have a mess around with some css transitions and animations to attempt to create a modal that slides in from above the page.

The first thing to learn while doing this is how to create an animation with css. I took inspiration from [Hyperplexed](https://www.youtube.com/watch?v=owpaafxvkjU) and [Web Dev Simplified](https://www.youtube.com/watch?v=YszONjKpgg4) which allowed me to get the knowledge I needed to create my first animation.

With simple animations, you can use the `transition` property in css to create a transition between any two states which will activate on the state change, meaning it will transition to a new state and use the transition to go back to the original too. This is useful for any small or simple changes and can be a lot easier to understand than the animations.

```html
<style>
    /* All CSS Properties Defined here */
    #modalContent::-webkit-scrollbar {
        /* No scrollbar */
        display: none;
    }

    #modalContent {
        /* Make content scrollable */
        overflow-y: auto;
    }

    #modalBackground {
        /* Make the background transparent initially and fill the entire page,
        but you can click through */
        position: absolute;
        background-color: rgba(79, 75, 73, 0);
        inset: 0;
        height: 100%;
        pointer-events: none;
        /* transition background-color will only make a transition appear for
        the background-color instead of all properties, you can define it as
        'all' */
        transition: background-color 0.5s ease-in-out;
    }

    #modalFront {
        /* Make the modal appear above the page and centered on the x axis*/
        position: absolute;
        height: 32rem;
        max-height: 90%;
        width: 24rem;
        max-width: 90%;
        left: 50%;
        top: -100%;
        transform: translate(-50%, 0);
        background-color: rgb(249, 249, 249);
        border-radius: 10px;
        border: 2px solid black;
        transition: top 0.7s ease-in-out, opacity 0.7s ease-in-out,
            left 0.7s ease-in-out, transform 0.7s ease-in-out;
        opacity: 0%;
    }

    #modalBackground.active {
        /* Change backround opacity, will be transitioned to */
        background-color: rgba(79, 75, 73, 0.3);
        pointer-events: all;
    }

    #modalFront.active {
        /* Change opacity and position, which will be transitioned to */
        top: calc(50% - 20rem);
        opacity: 100%;
    }

    /* Media will change the css depending on specified parameters,
    for example, here we are changing the values compared to the
    normal #modalFron.active if the screen is smaller than 768px wide*/
    @media screen and (max-width: 768px) {
        #modalFront.active {
            top: 50%;
            transform: translate(-50%, -50%);
            opacity: 100%;
        }
    }
</style>

<main>
    <!-- Create the modal -->
    <div id="modalBackground" onclick="closeModal(event)">
        <!-- modalFront is the actual modal -->
        <div id="modalFront">
            <div id="modalHeader" class="p-5 w-full">
                <h1 class="w-min inline-block">Modal</h1>

                <button
                    onclick="toggleModal()"
                    class="inline-block text-right float-right p-2 rounded bg-red-500 border-red-700 border-2 text-white"
                >
                    X
                </button>
            </div>
            <div id="modalContent" class="py-5 px-8 justify-evenly h-auto">
                <div>
                    <label for="new_value"> <b> Value </b> </label>
                    <input
                        type="text"
                        name="new_value"
                        id="new_value"
                        placeholder="Value"
                        class="border-2 p-1 border-black rounded block w-full"
                    />
                </div>
                <br />
                <div>
                    <label for="textbox"> <b> box o' text </b> </label>
                    <br />
                    <textarea
                        name="textbox"
                        id="textbox"
                        class="border-2 border-black rounded resize-none block w-full"
                        rows="5"
                    ></textarea>
                </div>
                <br />
                <div>
                    <input
                        type="submit"
                        name="submit"
                        id="submit"
                        value="Submit"
                        class="border-2 p-1 border-black rounded block w-full bg-white hover:bg-gray-200"
                    />
                </div>
                <br />
            </div>
        </div>
    </div>
</main>

<script>
    function toggleModal() {
        // Toggle the active class on the modal
        document.getElementById("modalBackground").classList.toggle("active");
        document.getElementById("modalFront").classList.toggle("active");
    }

    function closeModal(e) {
        // If the click is on the background, toggle the modal (so you can click out of it)
        if (e.target.id == "modalBackground") {
            document
                .getElementById("modalBackground")
                .classList.toggle("active");
            document.getElementById("modalFront").classList.toggle("active");
        }
    }
</script>
```

The animations shown with the modal use the transition `css` property. You can specify a few parameters for it, but it is very limited in its use. If you want a more complex animation, you can use the `animation` property. This allows you to create a set of keyframes to get complete control over the animations and what happens at each point. This is useful for complex animations and can be seen used by sites that make use of these complex animations. The `animation` property can be used as follows:

```html
<style>
    p {
        animation-duration: 3s;
        animation-name: slidein;
        animation-iteration-count: infinite;
    }
    
    @keyframes slidein {
        from {
            margin-left: 100%;
            width: 300%;
        }

        to {
            margin-left: 0%;
            width: 100%;
        }
    }
</style>

<main>
    <p>Sample Text</p>
</main>
```
[[Source]](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations)

On load, this will play on the paragraph and make it slide in from the right. Adding an iteration counter will define how many times it will play before stopping, and with an infinite value specified, it will continue playing until the page closes. This is useful for things like loading animations, but can also be used for other things like the modal and any other animated assets you want to implement.

# Conclusion
A lot has happened over the past week, and I haven't even talked about everything that I've done, only a few things. Learning about these things has made me think about different ways of doing things on the site. I have been already thinking of getting better at front end to have the ability to be able to do full stack development in the future, but in the short term possibly attempting to implement different animations and other things that may make the site a bit more visually enticing. On the backend I am happy with the addition of a few shortcuts such as `@admin_required`, as although it may be longer to write it initially, it should reduce the amount of code significantly in the long run by getting rid of any repetition that may occur.
