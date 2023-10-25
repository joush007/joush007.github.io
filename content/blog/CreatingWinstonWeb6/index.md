---
title: "Winston Wk 6 | API Implementation"
date: 2023-07-31
topics: ["Web Development", "WINSTON", "Python", "JavaScript"]
series: ["WINSTON"]
series_order: 14
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

## Introduction

A lot has happened over the past few weeks to get the server and pages up and running. The few things that have happened include the implementation of more JavaScript (The basis for most of the new additions), implementation of an API, and an update to database access. I will be discussing some of the new additions throughout this post.

Sections of this post:

-   [API Implementation](#api-implementation)
-   [Database Access](#database-access)
-   [JavaScript](#javascript)
-   [Conclusion](#conclusion)

## JavaScript

One of the largest issues that I found in the website that has been created so far, is that the templating and data assertion as well as the UX are pretty bad. By that I mean that the way that the server will setup a page and send it to the client is confusing and hard to work with, and also that the client side JavaScript is almost non-existent. To counter this, there needed to be a few additions of JavaScript that will make the website easier to work with as a developer and easier to use as a user.

One of the few features that I wanted to add into the Website was using Markdown, as it is widely used and is a great way to allow for people's posts on Winstogram to be formatted in the way they would like and to look just that little bit nicer.

## Markdown

To do this, I used a JavaScript library called [marked.js](https://marked.js.org/), which can be used to parse markdown into usable html on the client side which would then be displayed in the post.

Implementation of this was simple, or at least that's what I thought at first. What I realised was that I need a way to get the post from the server side to the client which would be used by the JavaScript to parse the markdown. The method of inputting the data using Jinja would've been OK, but the interpretation on the other end was far from ideal. I tried a few methods, one being to create a data dictionary and then sending that through Jinja's templating was the OK part, but with the interpretation through JavaScript I wasn't getting what I needed. An issue I encountered with this method was an error stating that I can't convert the Timestamp column from the database into data that could be interpreted by JS (paraphrasing for simplicity). This was not ideal, and so I talked to Michael about a few of his encounters with similar issues. He gave me a few pointers, one of which being to parse it through the JSON library, which could then easily be interpreted by JavaScript. As usual, his advice provided me with a new perspective on the issue and I attempted to implement his method.

The largest part of his method was the use of `json.dumps(dataDict)`, but I was still getting a similar error about the timestamp. After reviewing the issue online, the simplest answer turned out to be the best, and so I changed it to `json.dumps(dataDict, default=str)`, which would change anything that can't be interpreted correctly into a string. Michael's other method which he used on his project was in adding it to the `models.py` which stored all of the database tables, which would allow for the data to be accessed a lot easier with a method associated with the table.

Thanks to him, the data was able to be interpreted correctly with the two functions looking like this:

```python

Class Post():

    ...

    def to_dict(self):
        """
        Convert post to dict
        """

        return {
            "id": self.id,
            "header": self.header,
            "body": self.body,
            "imageLocation": self.imageLocation,
            "timestamp": self.timestamp,
            "user_id": self.user_id,
            "collections": self.collections
        }

    def to_json(self):
        """
        String representation of post in json
        """
        return json.dumps(self.to_dict(), default=str)
```

These functions made it that bit easier to work with the data on the client side, and so I was able to implement the markdown parser into the website. Using the [marked.js](https://marked.js.org/), I was able to take the information for the post that being used and parse it to make sure that anything that may use markdown is parsed correctly. The code was implemented as follows:

```javascript
// Function to render the post's markdown and display it
function renderPost() {
    // Get the post data from the server
    const post = "{{ post | safe }}";

    // Take the body of the post and parse its markdown
    const body = marked.parse(
        `{{post.body}}`.replaceAll("&lt;", "<").replaceAll("&gt;", ">")
    );
    // Header doesn't need markdown parsing
    const header = "{{post.header}}";

    // Create the template, and fill in any variables that have been created through the replaceAll() function
    const template = `
            <div id="header">
                <h2 class="text-4xl">
                    <b>postHeader</b>
                    <i class="text-2xl"
                        >by
                        <a
                            href="{{ url_for('user', id=post.author.id )}}"
                            class="underline"
                            >{{ post.author.username }}</a
                        ></i
                    >
                    <br>
                    <i class="opacity-50 text-xl" id="saveButton">
                        {% if current_user.is_active %}
                        <button id="save">Save</button>
                        {% endif %}
                    </i>
                </h2>
            </div>
            <br />
            <div class="px-4" id="body">
                {% autoescape false %} postBody {% endautoescape %}
            </div>`
        .replaceAll("postHeader", header)
        .replaceAll("postBody", body);

    // Change the data in the postContainer to hold the new post
    const postContainer = document.getElementById("postContainer");
    postContainer.innerHTML = template;
}
```

This was my go to method for implementation as it was easy, quick and efficient, although there might also be more efficient methods out there.

Finally, on the post pages, I needed an update to one small feature that would make a subtle, but big difference to the page. The save button was looking quite sad previously, as it would reload the page when you click it and disappear. To counter this, I setup a JavaScript function that would send a request to the server to save the post to the user's saved posts and provide feedback to the user as it was doing this.

```javascript
// When the DOM is loaded, check if the user has saved the post
document.addEventListener("DOMContentLoaded", () => {
    if ("{{ current_user.is_active }}" == "True") {
        // In the case that the user is logged in, check if they have saved the post, else remove the button
        const postCollection = JSON.parse(
            eval(`{% if current_user.is_active %}
                '{{ current_user.collections[0].to_json() | safe }}'
            )['posts']
            {% else %}
            '[]'
            {% endif %}`)
        );
        // If the post is saved, disable it and change the text to 'Saved!'
        if (postCollection.includes(post)) {
            save.classList.add("disabled");
            save.innerHTML = "Saved!";
        }
    } else {
        save.innerHTML = "";
    }
    // If it's not saved, add an event listener to the button to save it
    if (save.classList.contains("disabled") == false) {
        save.addEventListener("click", async function () {
            // Feedback to say it's saving
            save.innerHTML = "Saving...";

            // time & time2 make sure that the saving animation is at least 1 second long so as to make it seem more trustworthy and not just a flash
            // https://www.youtube.com/watch?v=O6ZQ9r8a3iw - Why Some Apps Are Intentionally Slow - Cheddar Explains
            const time = new Date().getTime();
            await fetch("{{ url_for('save_post', id=post.id) }}", {
                method: "POST",
            });

            const time2 = new Date().getTime();
            if (time2 - time < 1000) {
                await wait(1000 - (time2 - time));
            }

            // After saving, disable the button, change the text to 'Saved!' and remove the event listener
            save.classList.add("disabled");
            save.innerHTML = "Saved!";
            save.removeEventListener("click", this);
        });
    }
});
```

This would finish the work needed for the post page so that you could view a singular post in all of its glory.

After that I needed to work on a better way of interpreting the data

## API Implementation
After a few people told me it would be a good idea, I worked on implementing an API, which I hope I can use as a way of getting data from the server to the client instead of using Jinja templating for sending all of the data. This should be a lot more efficient with the computing on the server and should also be a lot easier to work with on the client side.

The API was implemented using a new file containing all of the API endpoints. After having a few people look at it, I've been told that I'm implementing my own API standards, which is not ideal, as the REST API standards are widely used and would make it a lot easier for the public to use if mine worked the same way. This will be something I will look into in the coming week/s. The API endpoints are simple to follow, as they work quite logically. Here are three of the endpoints that I have implemented to get an idea of how they work and scale with the rest of the API:

```python

# IMPORTANT NOTE: THIS CODE IS NOT TESTED AND MAY CONTAIN ERRORS

# API Endpoints
@app.route('/api', methods=["POST"])
def api():
    # Flask jsonify funtion to return a JSON response
    return jsonify(response="Invalid request", status="error"), 400

@app.route('/api/posts', methods=["POST"])
def api_posts():
    """
    Get post by id
    """
    # Get any data associated with the request
    data = request.get_json()

    # If there is no data or the data doesn't contain a post id, return an error
    if not data or not data.get('id'):
        return jsonify(response="Invalid request", status='error'), 400

    post = Post.query.get(data.get('id'))

    # If the post doesn't exist, return an error
    if not post:
        return jsonify(response="Post not found", status='error'), 404

    # Create a response dictionary to be returned which contains the post data and associated data
    response = {
        'id': post.id,
        'subject': post.subject,
        'body': post.body,
        'timestamp': post.timestamp,
        'user_id': post.user_id,
        'comments': {
            comment.id: {
                'id': comment.id,
                'body': comment.body,
                'timestamp': comment.timestamp,
                'user_id': comment.user_id,
                'post_id': comment.post_id,
            } for comment in post.comments.all()
        },
    }

    # Return the response
    return jsonify(**response), 200


@app.route('/api/posts/all', methods=["POST"])
def api_posts_all():
    """
    Get all posts
    """

    # Get all posts
    posts = Post.query.all()

    # Create a response dictionary to be returned which contains the post data and associated data
    response = {
        'posts': {
            post.id: {
                'id': post.id,
                'subject': post.subject,
                'body': post.body,
                'timestamp': post.timestamp,
                'user_id': post.user_id,
                'comments': {
                    comment.id: {
                        'id': comment.id,
                        'body': comment.body,
                        'timestamp': comment.timestamp,
                        'user_id': comment.user_id,
                        'post_id': comment.post_id,
                    } for comment in post.comments.all()
                }
            } for post in posts
        }
    }, 200

    # Return the response
    return jsonify(**response), 200
```

The methods in use here grab the data from the database depending on the request (all or specific), as long as the information required is specified. This is then returned as a JSON response which can be interpreted by the client side JavaScript. This should be a more effective method of retrieving data from the server rather than using Jinja templating, but with all of the loops to get the data in the JSON, I might have to modify it to work better. One thing to note, which was quite silly of me, was that I haven't tested the above and it probably has a few errors here and there, but if that's so I will make a note of that to address in the next post or possibly edit this one.

## Conclusion
After all of that hard work of implementation I am feeling quite happy with what I've done, although there is still a lot to do with so little time to do it. I will continue to work hard on working through this massive project, because, as of the time I'm writing this, I have 18 days until I'm presenting in Adelaide's PyCon Au with the team. The introduction of an API should make it a lot easier to deal with the amount of data that we will have, but I'm concerned as to how it will scale with more users and data.