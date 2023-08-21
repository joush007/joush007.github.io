---
title: "Creating W.I.N.S.T.O.N. Week 9 | Comments and Testing"
date: 2023-08-21
topics: ["Web Development", "WINSTON"]
series: ["WINSTON"]
series_order: 17
---

[Diff](https://github.com/joush007/Flask-Server-WINSTON/compare/0cbd2561d6d7b76052db7b9e5ba85be57ca8e794...8abbe66fbad8e5749431257545c4405a0367dd78)

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Overview

Last week, a lot happened, one of which was that the team presented at PyCon Au, but that will be talked about in the other post for this week. In reference to the website and Winstogram though, I was able to fix a few issues and figure out a few things that really needed to be added. To figure out some of the thigns that needed to be added, a bit of testing was needed to be done, which I was able to do in class with help from a few classmates, mostly from the year below me. I got to test out how they would use the site as well as try some features that had bugs in them. I also got to figure out how to use the admin panel and thought of a feature or two that would help me with admin features such as small buttons that would allow me to remove records from the database. The biggest features that got tested on the day, were commenting, posting, profile creation and profile editing.

# Comments

As stated, one of the features implemented was comments. This is a core feature of Winstogram as it allows ideas to be expanded on from a single post or for new ideas that are related to be shared. This was a feature I was planning from the start and could be seen in the previous post image. The way to implement it wasn't very difficult. A new form was created for the comments and was added to the posts page, with an updated route to handle the form and new data being sent between the server and client.

To start it off, I needed to add a new form in `forms.py` to add in an input field and submit button:

```python
forms.py

...

class CommentForm(FlaskForm):
    comment = TextAreaField("Comment", validators=[DataRequired(), Length(1, 1000)])
    submit = SubmitField("Submit")

...

```

I limited the lengths of comments to `1000` characters to make sure that it isn't abused. This would then be added to the `routes.py` route:

```python

...
@app.route('/posts/<post_id>', methods=['GET', 'POST'])
@app.route('/posts', methods=['GET', 'POST'])
def winstogram(post_id=None):

    if post_id:

        # Get the specific post, and create a comment form

        comment_form = CommentForm()

        if comment_form.validate_on_submit():
            # If the form is submitted, create a new comment and add it to the database, but make sure that there is no attempted injection

            comment = Comment(
                body=comment_form.comment.data.replace(
                    '<', "&lt;").replace('>', "&gt;"),
                user_id=current_user.get_id(),
                post_id=post_id
            )

            db.session.add(comment)
            db.session.commit()

            return redirect(url_for('winstogram', post_id=post_id))

        return render_template(
            'post.html',
            title='Post',
            current_user=current_user,
            id=post_id,
            authorid=Post.query.get(post_id).user_id,
            app=app,
            form=comment_form
        )

    ...

```

This would then be added to the `post.html` template:

```html
...

<form id="commentForm" action="" method="post" autocomplete="off" novalidate>
    {{ form.hidden_tag() }}
    <p>
        {{ form.comment.label }}<br />
        {{ form.comment(rows=5, class_="px-1 border border-black rounded
        w-full") }} {% for error in form.comment.errors %}
        <br />
        <span class="text-black"><b>[{{error}}]</b></span>
        {% endfor %}
    </p>
    <br />
    <p class="text-center md:text-start">
        {{ form.submit(class_="border p-1 border-black rounded bg-accent w-full
        md:w-auto") }}
    </p>
</form>
{% endif %}
<br />
<div class="px-1" id="commentsContainer"></div>

<script>

    ...

    const commentsContainer = document.getElementById('commentsContainer');

    var comments = post.comments;

    // If no comments exist, replace with a message
    if (comments.length == 0) {
        comments = [
            {
                user_id: null,
                timestamp: null,
                body: 'No comments yet!',
            },
        ];
    }

    // Render each comment
    for (comment of comments) {

        // DOM Manipulation for adding comments uses best practice so that it doesn't break
        const commentDiv = document.createElement('div');
        commentDiv.classList.add(
            'outline',
            'rounded',
            'bg-accent',
            'p-5',
            'mb-5'
        );

        const commentBody = document.createElement('div');
        const commentHeader = document.createElement('div');
        const commentHeaderNameA = document.createElement('a');
        const commentHeaderName = document.createElement('h3');
        const commentHeaderTime = document.createElement('i');

        // If comments exist, render them, otherwise say that there are no comments.
        if (
            comment.user_id != null &&
            comment.timestamp != null &&
            comment.body != 'No comments yet!'
        ) {
            commentHeaderNameA.href = `{{ url_for('user', id='') }}${comment.user_id}`;
            commentHeaderNameA.classList.add('inline');

            commentHeaderName.classList.add('underline', 'inline');
            commentHeaderName.textContent = comment.username;

            commentHeaderNameA.appendChild(commentHeaderName);

            commentHeaderTime.classList.add('opacity-50', 'inline');
            commentHeaderTime.textContent = ` ${moment(
                comment.timestamp
            ).fromNow()}`;

            commentHeader.appendChild(commentHeaderNameA);
            commentHeader.appendChild(commentHeaderTime);
            commentDiv.appendChild(commentHeader);
            commentBody.classList.add('px-4', 'pt-4');
        } else {
            commentBody.classList.add('underline');
        }

        commentBody.innerHTML = comment.body;

        commentDiv.appendChild(commentBody);

        commentsContainer.appendChild(commentDiv);
    }

        ...
</script>
```

This would then allow for comments to be added to the database and rendered on the page.

# Testing

Testing, as stated, was done during class with a bunch of people connecting to the web server. This was done to test the way that a user would interact with the server and the lengths to which they would go to accomplish something or find features. I found out how easy it was to have a username such as `admin` or `owner` etc. and made a disallowed name list that would have people unable to have a name in this list: `['admin', 'moderator', 'owner', 'creator', 'mod', 'modteam', 'dev', 'developer', 'winston', 'winstogram', 'administrator']`, which would be checked against when a user is created or modified.

On top of that, A new light was shone on the admin panel, and the fact that I needed to have an easeir time deleting records from the database besides writing SQL statements. After re-implementing the admin panel and changing up the way that the inspection was implemented, I have thought to add a delete button for each record so that I won't have to write SQL statements to delete each record.

# Conclusion

There is still so much to go, but I got a lot done this week, and it can all be seen in the diff at the top of the post, but I am happy with the progress that I have made, especially with the admin panel and comments, as well as the fact that it was ready for PyCon if it was needed, but sadly it wasn't. I am going to continue developing this, and will show more progress updates next week.