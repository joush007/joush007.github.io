---
title: "Winston Wk 7 | API & Inifinite Scroll"
date: 2023-08-07
tags: ["Web Development", "WINSTON", "Python", "JavaScript", "HTML"]
series: ["WINSTON"]
series_order: 15
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Overview

In the past week I've spent time refining the API that was discussed last week and also implementing an infinite scroll feature to the posts page of the website, which utilises a pagination method and a scroll event listener to load posts once the user has scrolled to the bottom of the post container.

## API

I discussed last time that I needed to implement an API and showed my first implementation that would take a request such as `/api/posts/<id>` and return the post that has the specified id alongside all other related information to the post and their information. In this case, if you were to request a specific post, it would return the post data in the form of something like this:

```py
response = {
    'id': post.id,
    'header': post.header,
    'body': post.body,
    'timestamp': post.timestamp,
    'username': post.author.username,
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
```

This will, in theory, make it a lot easiier to deal with the data if you are requesting it from other sources, such as other programs that want to use the data. This isn't too difficult to implements, but the functions have to be changed from what we defined last week. We previously had this function:

```py
@app.route('/api/posts', methods=["POST"])
def api_posts():
    """
    Get post by id
    """
    # Get the data from the request
    data = request.get_json()

    # Check the the data is valid
    if not data or not data.get('id'):
        return jsonify(response="Invalid request", status='error'), 400

    # Get the post from the database
    post = Post.query.get(data.get('id'))

    # If the post doesn't exist, throw an error
    if not post:
        return jsonify(response="Post not found", status='error'), 404

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
    return jsonify(**response), 200
```

We can use upgrade to this function instead:

```py
@app.route('/api/posts/<id>', methods=["GET"])
def api_post(id):
    """
    Get post by id
    :param id: post id
    :return: json
    """
    # Check that the data is valid
    if not id:
        return jsonify(response="Invalid request", status='error'), 400

    # Get the post from the database
    post = Post.query.get(id)

    # If the post doesn't exist, throw an error
    if not post:
        return jsonify(response="Post not found", status='error'), 404

    # Compile the response object
    response = {
        'id': post.id,
        'header': post.header,
        'body': post.body,
        'timestamp': post.timestamp,
        'username': post.author.username,
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
    return response, 200
```

One of the key changes that can be seen is actually in the return statement. Previously, there was a `jsonify` function being applied to the response object, but after some research I've come to find that this is automatically applied in later versions of Flask, and so it isn't necessary to have the small amount of extra code. This is a small change, but it makes the code slightly easier to read and understand.

Another point of interest is that there is no longer a need to get the id data from the request data, but instead we are looking towards the URL for the id. This is used because it will make it slightly easier to use the API in the future, as having to use the request parameters in the form of `?id=<id>` can be a bit more difficult to use than `/<id>` in my opinion as I find that using the parameters instead of the location is a bit more confusing for myself.

## Infinite Scroll

Infinite scroll is a feature used in many large social media sites or applications, such as Instagram, Reddit and Twitter, where the posts are loaded dynamically as you scroll, and only when you need to load them. This is a nice feature as it means I won't need to include page buttons at the bottom which may throw off the user's flow if they are reading through some of the posts. I have implemented it in a way that listens to the location of the user scroll in reference to the size of the div that contains the posts. If the user is within 50 pixels of the bottom of the container, a function will trigger to load new posts. This is done by using a `scroll` event listener and then using some maths to determine the location of the user's scroll location to determine whether more posts should be loaded.

The first step to implementing this is to take the div and adding an event listener using `container.addEventListener('scroll', async () => { ... })` to the div to listen for any scrolling that is done by the user. We now need to determine how far the user has scrolled, and more specifically if the user has scrolled to the location where we need to load more posts.

The math behind this isn't too difficult and takes into account the container's height and the top location of the container (combining to get the location of the bottom of the scroll) in relation to the top of the scrolled location using `if (Math.round(container.scrollTop + container.clientHeight) >= container.scrollHeight - 50) { ... }`.

Finally, we can load the posts using a new async function (as it returns a promise, and thus we will need to await it), that will load the new posts into a variable that we can format and add to the container using `var newPosts = await loadPreviousPosts(posts[posts.length - 1].id);`, where `loadPreviousPosts( ... )` returns the posts prior to the loaded posts.

The new function that is used to load the posts looks like this:

```js
// Load posts from before a specified post
async function loadPreviousPosts(offset) {
    // Get the posts from the API
    const response = await fetch(
        `{{ url_for('api_latest_posts') }}?offset=${offset}`
    );
    // Convert the response to json for ease of data access
    const posts = await response.json();
    return posts;
}
```

Although I said earlier that I was using the `/<id>` method, due to the fact that I'm using multiple variables in the API for this specific request, I needed to implement the parameters to use.

This would then load the posts into the container and hold all posts in a variable `posts` that can be referenced in the future in the infinite scroll. The full code for it looks like this:

```js
container.addEventListener("scroll", async () => {
    if (
        Math.round(container.scrollTop + container.clientHeight) >=
        container.scrollHeight - 50
    ) {
        var newPosts = await loadPreviousPosts(posts[posts.length - 1].id);

        posts.push(...newPosts);

        for (post of newPosts) {
            var temp = `<a href="{{ url_for('winstogram')}}/${post.id}">
                        <div class="outline bg-accent rounded p-5" id="${
                            post.id
                        }">
                            <div class="truncate" id="header">
                                {% autoescape false %}
                                <b>${post.header}</b>
                                <br /><i
                                >by ${post.username}
                                ${moment(post.timestamp).fromNow()}</i
                                >
                                {% endautoescape %}
                                </div>
                                <div class="px-4 truncate" id="body">
                                    ${marked.parse(
                                        post.body.replaceAll("\n", " "),
                                        {
                                            mangle: false,
                                            headerIds: false,
                                        }
                                    )}
                                </div>
                            </div>
                        </a>
                        <br>`;
            document.getElementById("postsContainer").innerHTML += temp;
        }
    }
});

async function loadPreviousPosts(offset) {
    const response = await fetch(
        `{{ url_for('api_latest_posts') }}?offset=${offset}`
    );
    const posts = await response.json();
    return posts;
}
```

Through this code, the implementation should create a nice infinite scroll feature that will trigger whenever you scroll to the bottom of the div. It should also be noted that this will only work if there is a div that can be scrolled through, and so if there are not enough initial items, the infinite scroll won't work. This is something I am looking into fixing, and so there will be an update if I manage to get that fixed.

## Conclusion

JavaScript alongside an API can be utilised to listen for a scrolling event and then load data to simulate an infinite scroll. This can be used to make a cleaner transition to load new data and also to remove a pagination system that would use buttons to connect each page and not break a user's flow or experience with page breaks. With a week left before PyCon, I will continue to work on the site to create a nice experience for the user and also make the site resource efficient, although I know that it will be difficult with the stream running.