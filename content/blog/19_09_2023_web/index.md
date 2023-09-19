---
title: "18/09/2023 - Transition & Editing"
date: 2023-09-18
topics: ["Web Development", "WINSTON"]
series: ["WINSTON"]
series_order: 22
---

[Diff](https://github.com/joush007/Flask-Server-WINSTON/compare/faeb9501386e2bcf077195809a0d34fae04c44b4...54f01caab8e1f6680b31d53c4da929a20d8a49aa)

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Overview

Over the last week or so, I have worked on quite a few parts of the website, especially the transitions for element states and the ability to edit forum posts that have been created (with more to come for editing posts). Specifically I have looked into the transition for the dropdown on mobile, removed redundant code and made the rest of the code more readable through layout and naming conventions. I have realised that a lot of the code that is being used, and many variables and functions have varying naming conventions, with some using snake_case, and others using camelCase, and due to this, I will be making an effort to stick to snake_case as it is used more often in Python, and should help with keeping consistensy and the readability of the code. I have also worked on the ability to edit the contents of a forum post in case the post that was initially created was incorrect or had issues in it that needed to be resolved or clarified.

# Transition

One of the most annoying parts of the mobile site was the fact that the dropdown would appear out of thin air, and so, that was one of the things that I fixed last week. I talked a few weeks ago about my introduction to animations and transitions, and I have started to become more accustomed to how they work and their use cases, especially in making things look pretty. I decided that I wanted to make the new transition look like the dropdown was sliding in from the top of the screen. This isn't too difficult, as it needs to transition the `translate-y`, which would then show it sliding in. The CSS to develop this would look something along the lines of this:

```css
/* The transition will only apply while on a small screen */
@media (max-width: 768px) {
    #navbar {
        position: relative;
        z-index: 99;
        transform: translatey(-100%);
        transition: transform 0.7s ease-in-out;
    }

    #navbar.active {
        transform: translatey(0%);
    }

    #bar {
        position: relative;
        z-index: 100;
    }

    main {
        position: absolute;
        top: 64px;
    }
}

.animationStopper {
    transition: none !important;
    animation: none !important;
}

main {
    transition: transform 0.5s ease-in-out;
}
```

To trigger this new transition, we add the defined `.active` class, which will then modify the properties of the element, and cause a transition to occur. This will be done through JavaScript:

```js
// Once the DOM has loaded, we can add the event listener to the hamburger menu
document.addEventListener("DOMContentLoaded", function () {
    // The hamburger button will trigger the dropdown to appear
    document.getElementById("hamburger").addEventListener("click", () => {
        var navbar = document.getElementById("navbar");
        // If the navbar is active, remove the active class, otherwise add it (toggle the navbar)
        if (navbar.classList.contains("active"))
            navbar.classList.remove("active");
        else navbar.classList.add("active");
    });
});
```

With all of this added, the dropdown should now slide in from the top on a small device. The reason this is only done on a small device is due to the lack of need for a dropdown menu like this on a larger device where all buttons can be spread out a lot more easily, and therefore it makes more sense on a smaller screen as there is less space to fit everything in, and so a dropdown is prefereable so that the buttons don't take up more space than required.

# Editing

Creating an edit button is not very difficult when you break it down. The idea behind it is as follows:

1. Click an edit button;
2. The edit button triggers the edit function;
3. The edit function changes the div containing the text into a textarea with the same text;
4. The edit button turns into a save button;
5. After editing and saving, a request will be sent to the server to update the relevant information in the database.

Although the concept is simple, the implementation is a little long, or at least for my method of implementation

1. The button was created earlier in the script alongside the save button
2. We need to add an event listener to it to trigger the edit function

```js
async function addEditButton(post) {
    const edit = document.getElementById('edit');
    edit.textContent = 'Edit';
    edit.onclick = function () {
        ...
    }
}
```

3. The edit function will change the div into a text area

```js
async function addEditButton(post) {
        const edit = document.getElementById('edit');
        edit.textContent = 'Edit';
        edit.onclick = function () {
            // replace body with a textbox
            const body = document.getElementById('body');
            const bodyInput = document.createElement('textarea');
            bodyInput.classList.add(
                'px-1',
                'border',
                'border-black',
                'rounded',
                'w-full',
                'h-max'
            );

            // Keep the height of the textarea the same as the content to avoid a scrollbar
            bodyInput.oninput = function () {
                bodyInput.style.height = 'auto';
                bodyInput.style.height = bodyInput.scrollHeight + 10 + 'px';
            };

            // Fill the input with the current body to be edited & fix height
            bodyInput.value = post.body;
            bodyInput.style.height = 'auto';
            bodyInput.style.height = body.scrollHeight + 30 + 'px';
            body.replaceWith(bodyInput);

            // replace header with a textbox
            const title = document.getElementById('title');
            const headerInput = document.createElement('input');
            headerInput.classList.add(
                'text-4xl',
                'overflow-y-hidden',
                'px-1',
                'border',
                'border-black',
                'rounded',
                'w-full'
            );
            headerInput.value = post.header;
            title.replaceWith(headerInput);

            ...
        }
}
```

4. The edit button turns into a save button

```js
const save = document.getElementById("edit");
save.id = "save_changes";
save.textContent = "Save Changes";
save.classList.add(
    "border",
    "p-1",
    "mx-2",
    "inline-block",
    "border-black",
    "rounded",
    "bg-accent",
    "w-full",
    "md:w-auto"
);

...

// replace the edit button with a save button
edit.replaceWith(save);
```

5. The save button will send a request to the server to update the database

```js
save.onclick = async () => {
    // Save then reload page
    await fetch("{{ url_for('update_database_entry') }}", {
        method: "put",
        body: JSON.stringify({
            table_name: "post",
            entry_id: parseInt("{{ id }}"),
            new_data: {
                header: headerInput.value,
                body: bodyInput.value,
            },
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    location.reload();
};
```


Full code for this new implementation:
```js
async function addEditButton(post) {
    const edit = document.getElementById("edit");
    edit.textContent = "Edit";
    edit.onclick = function () {
        // replace body with a textbox
        const body = document.getElementById("body");
        const bodyInput = document.createElement("textarea");
        bodyInput.classList.add(
            "px-1",
            "border",
            "border-black",
            "rounded",
            "w-full",
            "h-max"
        );

        // Keep the height of the textarea the same as the content to avoid a scrollbar
        bodyInput.oninput = function () {
            bodyInput.style.height = "auto";
            bodyInput.style.height = bodyInput.scrollHeight + 10 + "px";
        };

        // Fill the input with the current body to be edited & fix height
        bodyInput.value = post.body;
        bodyInput.style.height = "auto";
        bodyInput.style.height = body.scrollHeight + 30 + "px";
        body.replaceWith(bodyInput);

        // replace header with a textbox
        const title = document.getElementById("title");
        const headerInput = document.createElement("input");
        headerInput.classList.add(
            "text-4xl",
            "overflow-y-hidden",
            "px-1",
            "border",
            "border-black",
            "rounded",
            "w-full"
        );
        headerInput.value = post.header;
        title.replaceWith(headerInput);

        // replace edit button with a save button
        const save = document.getElementById("edit");
        save.id = "save_changes";
        save.textContent = "Save Changes";
        save.classList.add(
            "border",
            "p-1",
            "mx-2",
            "inline-block",
            "border-black",
            "rounded",
            "bg-accent",
            "w-full",
            "md:w-auto"
        );
        save.onclick = async () => {
            // Save then reload page
            await fetch("{{ url_for('update_database_entry') }}", {
                method: "put",
                body: JSON.stringify({
                    table_name: "post",
                    entry_id: parseInt("{{ id }}"),
                    new_data: {
                        header: headerInput.value,
                        body: bodyInput.value,
                    },
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            location.reload();
        };

        // replace the edit button with a save button
        edit.replaceWith(save);

        // Replace the save button with a delete button
        const deleteButton = document.getElementById("save");
        deleteButton.id = "delete";
        deleteButton.onclick = async () => {
            // Are you sure?
            if (!confirm("Are you sure you want to delete this post?")) {
                return;
            }

            // Delete then redirect to home page
            await fetch("{{ url_for('delete_database_entry') }}", {
                method: "DELETE",
                body: JSON.stringify({
                    table_name: "post",
                    entry_id: parseInt("{{ id }}"),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            window.location.href = '{{ url_for("winstogram") }}';
        };
        deleteButton.textContent = "Delete";
        deleteButton.classList.add(
            "border",
            "p-1",
            "inline-block",
            "border-black",
            "rounded",
            "bg-accent",
            "w-full",
            "md:w-auto",
            "hover:cursor-pointer"
        );
        // Make sure delete isn't disabled
        deleteButton.classList.remove("disabled");

        document.getElementById("save").replaceWith(deleteButton);
    };

    //{% else %}
    document.getElementById("edit").remove();
    //{% endif %} Comment 2
    return;
}
```

# Conclusion
I did a lot last week in terms of adding new useful features, but I am far from finished as there will always be so much to add. I am starting to move away from the simple stuff and towards the more complex things, but I am still managing to keep it simple enough by breaking it down. In the future I will continue to persevere through these challenges and get the features that I want to add working, but I will also implement those that need to be implemented. This is the last post this term, so I will continue posting next term when it all starts up again.
