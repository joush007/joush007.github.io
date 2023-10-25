---
title: "Flask Pagination"
date: 2023-04-03
tags: ["Web Development", "Flask", "Python", "HTML"]
---

The web dev posts at the moment can all be followed through the [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-ix-pagination), but I will also be writing about my experiences with them here, and my own version can be found [here](https://github.com/joush007/microblog-tutorial).

## Introduction
Last time, we managed to set up our followers database relationship and the ability to follow and unfollow users. This time, we will be adding pagination to the posts page, so that the user can see all of the posts that they have made as well as other people's posts that they follow and an explore page where they can see all of the posts from all users.

## Creating blog posts
Now, to start things off we need a way to create a post and add it to the database, and where else than the home screen. We can create a form for this in the `app/forms.py` file, which will look like this:

```py
class PostForm(FlaskForm):
    post = TextAreaField('Say something', validators=[
        DataRequired(), Length(min=1, max=140)])
    submit = SubmitField('Submit')
```

It's a really simple form that allows a user to put some text and submit it. We then need to include this in our home page by changing up a bit of the code to add in the form:

```html

...

<form action="" method="post">
    {{ form.hidden_tag() }}
    <p>
        {{ form.post.label }}<br>
        {{ form.post(cols=32, rows=4) }}<br>
        {% for error in form.post.errors %}
        <span style="color: red;">[{{ error }}]</span>
        {% endfor %}
    </p>
    <p>{{ form.submit() }}</p>
</form>

...

```

This small change acts the same way as the other ones, adding it into the template so that it will appear in the home page. As you can also see, we're using a POST request to send the data to the server, which is the same as the edit profile or login pages.

To handle these changes, and account for the use of the new POST method, we need to make sure that our app knows that it can handle this. We can do this by editing the `app/routes.py` file, and adding in the following code:

```py
@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@login_required
def index():
    ...
```

Now that it knows it can use both GET and POST requests, we can actually handle the request to create a post, send it to the server and add it to the database with:

```py
@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@login_required
def index():
    form = PostForm()
    if form.validate_on_submit():
        post = Post(body=form.post.data, author=current_user)
        db.session.add(post)
        db.session.commit()
        flash('Your post is now live!')
        return redirect(url_for('index'))
    
    ...

    return render_template("index.html", title='Home Page', form=form,
                           posts=posts)
```

Now, I've left a hole in the middle, which had the code defining the `posts` as:

```py
posts = [
    {
        'author': {'username': 'John'},
        'body': 'Beautiful day in Portland!'
    },
    {
        'author': {'username': 'Susan'},
        'body': 'The Avengers movie was so cool!'
    }
]
```

Now that we've implemented a way to retrieve posts from the database with followers, we can instead grab the actual posts. We can do this by changing the `posts` variable to:

```py
posts = current_user.followed_posts().all()
```

Which we had defined in the previous post to grab all of the posts of a user that you follow.

## Finding users to follow
A great thing about social media and blog pages is the ease of finding people who you can follow and have on your home screen to see what's happening in their life. Sadly, we have nothing of the sort here, and so how are we going to find people to follow? Well, we can add this in generally easily by adding a new page to the app, an explore page. This page will show the most recents posts from all users to allow the user to find people to follow.

To do this we need to create a new route to `/explore`, but we can reuse the `index.html` template that we already have, as we'll still be showing the posts the same way, just not limiting it to the followed users. We can start with adding the following code to the `app/routes.py` file:

```py
@app.route('/explore')
@login_required
def explore():
    posts = db.session.query(Post).order_by(Post.timestamp.desc()).all()
    return render_template('index.html', title='Explore', posts=posts)
```

There is a big difference, though, in the way that we're using the render_template, as we no longer use the post form we created earlier to create a new post. This is due to there being no need in the page for exploring and finding new users, but this may error out now due to the fact that we're missing a variable in the template, let's quickly fix that:

```html
{% extends "base.html" %}

{% block content %}
    <h1>Hi, {{ current_user.username }}!</h1>
    {% if form %}
    <form action="" method="post">
        ...
    </form>
    {% endif %}
    ...
{% endblock %}
```

Now we won't get any errors about referencing a non-existent variable, so all we need now is a way of accessing the page, which we can do through adding another link into the navbar in `app/templates/base.html`:

```html
<a href="{{ url_for('explore') }}"> Explore </a>
```

Now, a while back we added the sub-template `_post.html` file. This was used to display someone's post, but now it seems a bit off, as it is only showing the post body and the name of the author, but not the user's avatar which we worked so hard to create. Let's fix that. We can make this small fix by adding a line of code to the `_post.html` file so that it will look like this:

```html
<table>
    <tr valign="top">
        <td><img src="{{ post.author.avatar(36) }}"></td>
        <td>
            <a href="{{ url_for('user', username=post.author.username) }}">
                {{ post.author.username }}
            </a>
            says:<br>{{ post.body }}
        </td>
    </tr>
</table>
```

And now we have a nice little avatar next to the post, which should make it look a bit more personalised.

Now, instead of just being displayed on our user page, it can be used across the app and be added to the explore and home pages with a quick line of code:

```html
{% for post in posts %}
    {% include "_post.html" %}
{% endfor %}
```

## Pagination
Turns out, SQLAlchemy, one of the libraries we have been using, has a built in `pagination` method. It takes three arguments:

1. The page number, starting from 1
2. The number of items per page
3. An error flag. If true, when an out of range page is requested, an error is returned instead of an empty list.

The returned value is a `Pagination` object, which has an `items` attribute containing the list of items in the requested page.

Now, with that in mind we can add in a pagination system to our app to allow only a small number of items to be displayed per page.

We'll start in `config.py` to give a value to how many posts we want per page. For testing purposes we want this to be small:

```py
class Config(object):
    # ...
    POSTS_PER_PAGE = 3
```

We put these in a config class so that we can easily change and access this information across the entire app instead of having to change it all over the place when we're updating the app in the future.

To access these different pages (thanks to pagination) we will need to use URL query string arguments to specify which page it is that we want to view.

We can do this by adding a new route to `app/routes.py` to grab the arguments using `requests.args` and pass the new posts to the template:

```py
@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@login_required
def index():
    # ...
    page = request.args.get('page', 1, type=int)
    posts = current_user.followed_posts().paginate(
        page=page, per_page=app.config['POSTS_PER_PAGE'], error_out=False)
    return render_template('index.html', title='Home', form=form,
                           posts=posts.items)

@app.route('/explore')
@login_required
def explore():
    page = request.args.get('page', 1, type=int)
    posts = db.session.query(Post).order_by(Post.timestamp.desc()).paginate(
        page=page, per_page=app.config['POSTS_PER_PAGE'], error_out=False)
    return render_template("index.html", title='Explore', posts=posts.items)
```

This is all cool and all, but not very useful without an easy way to navigate, as we don't want to continually specify in the url `?page=3` when we want to change the page. Instead if we add some buttons, we can make it so that the user can easily navigate between pages.

To do this, there are a few nice attributes that SQLAlchemy has for the Pagination object, those being:

* `has_next` - returns true if there is a next page
* `has_prev` - returns true if there is a previous page
* `next_num` - returns the page number of the next page
* `prev_num` - returns the page number of the previous page

We can use these to add in some buttons to the template to allow the user to navigate between pages and pass them into the templates through our `routes` file:

```py
@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
@login_required
def index():
    # ...
    page = request.args.get('page', 1, type=int)
    posts = current_user.followed_posts().paginate(
        page=page, per_page=app.config['POSTS_PER_PAGE'], error_out=False)
    next_url = url_for('index', page=posts.next_num) \
        if posts.has_next else None
    prev_url = url_for('index', page=posts.prev_num) \
        if posts.has_prev else None
    return render_template('index.html', title='Home', form=form,
                           posts=posts.items, next_url=next_url,
                           prev_url=prev_url)

 @app.route('/explore')
 @login_required
 def explore():
    page = request.args.get('page', 1, type=int)
    posts = db.session.query(Post).order_by(Post.timestamp.desc()).paginate(
        page=page, per_page=app.config['POSTS_PER_PAGE'], error_out=False)
    next_url = url_for('explore', page=posts.next_num) \
        if posts.has_next else None
    prev_url = url_for('explore', page=posts.prev_num) \
        if posts.has_prev else None
    return render_template("index.html", title='Explore', posts=posts.items,
                          next_url=next_url, prev_url=prev_url)
```

One thing to note that hasn't been discussed prior is a cool feature of `url_for`, which is that it can take the page name but also any other arguments you give it. These other arguments will be taken as query string arguments and added to the url.

We've gotten the inputs into the template now, but we're missing the buttons from the actual page, useful isn't it? So next we should probably add them in our `index.html` template:

```html
    {% for post in posts %}
        {% include '_post.html' %}
    {% endfor %}
    {% if prev_url %}
    <a href="{{ prev_url }}">Newer posts</a>
    {% endif %}
    {% if next_url %}
    <a href="{{ next_url }}">Older posts</a>
    {% endif %}
```

Great, now we've got a workable home page and explore page, but what about the user page? Well, we can add in the same code to the user page, but we'll need to add in a few more things to make it work. The routes file will add this in:

```py
@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    page = request.args.get('page', 1, type=int)
    posts = user.posts.order_by(Post.timestamp.desc()).paginate(
        page=page, per_page=app.config['POSTS_PER_PAGE'], error_out=False)
    next_url = url_for('user', username=user.username, page=posts.next_num) \
        if posts.has_next else None
    prev_url = url_for('user', username=user.username, page=posts.prev_num) \
        if posts.has_prev else None
    form = EmptyForm()
    return render_template('user.html', user=user, posts=posts, form=form, next_url=next_url, prev_url=prev_url)
```

and then we add it to the template as well so we can actually use the feature in the `user.html` template:

```html
    {% for post in posts %}
        {% include '_post.html' %}
    {% endfor %}
    {% if prev_url %}
    <a href="{{ prev_url }}">Newer posts</a>
    {% endif %}
    {% if next_url %}
    <a href="{{ next_url }}">Older posts</a>
    {% endif %}
```

Finally, let's change our POSTS_PER_PAGE back to a reasonable number so that we can actually see the pagination in action:

```py
class Config(object):
    # ...
    POSTS_PER_PAGE = 25
```

And that just about covers Pagination. I know this is still quite a boring thing to read about as I suck at explaining this when I too am following a tutorial, but it shows a lot of the power of Flask and SQLAlchemy and how they can be used to make a web application. I will continue working through this tutorial as stated previously and I will keep you posted on what's happening. Next time I'll be working on adding in email support for the application, so that users can reset their passwords if needed, and then I'll continue to work through the rest of the tutorial. If you're interested in following the tutorial yourself, you can find it here: [https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

Thanks for reading, and I'll see you next time!