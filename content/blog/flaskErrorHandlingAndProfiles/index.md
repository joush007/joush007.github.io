---
title: "Error Handling and Profiles in Flask"
date: 2023-03-21
topics: ["Web Development", "Flask", "Python", "HTML"]
---

## Introduction
In the past few weeks I've been continuing to work on the [the Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world). This included the creation of a user profile page, error handling and the use of a login system with the database.

## User Profiles
The first thing I did to learn a bit more about Flask was creating a user profile page, and a way of editing it. To start this off I created 2 new routes in the `app/routes.py` file:
```py
...
@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    posts = [
        {'author': user, 'body': 'Test post #1'},
        {'author': user, 'body': 'Test post #2'}
    ]
    return render_template('user.html', user=user, posts=posts)

@app.route('/edit_profile', methods=['GET','POST'])
@login_required
def edit_profile():
    form = EditProfileForm();
    if form.validate_on_submit():
        current_user.username = form.username.data
        current_user.about_me = form.about_me.data
        db.session.commit()
        flash("Your changes have been saved.")
        return redirect(url_for('edit_profile'))
    elif request.method=="GET":
        form.username.data = current_user.username
        form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', title="Edit Profile", form=form)
...
```
The file uses the route `/user/<username>`, but that doesn't say much. The `<username>` field is used to store a variable for a url using flask. This can be used int he file as shown above where the function takes in the pameter `username` and is used to query through the database for the user, or return a 404 error if it doesn't exist. The posts are just dummy posts for now, but will be replaced with the users posts when everything is up and running.

You can see that the function uses a login_required decorator, which is used to ensure that the user is logged in before they can access the page, otherwise they are sent to the login page.

The edit profile page is also useful as it takes the form for editing the profile and uses it to edit the users profile with the specified data, and will be shown shortly.

The `user.html` file is referenced next, and is shown below:
```html
{% extends "base.html" %}

{% block content %}
<table>
    <tr valign="top">
        <td><img src="{{ user.avatar(128) }}"></td>
        <td>
            <h1>User: {{ user.username }}</h1>
            {% if user.about_me %}<p>{{ user.about_me }}</p>{% endif %}
            {% if user.last_seen %}<p>Last seen on: {{ user.last_seen }}</p>{% endif %}
            {% if user == current_user %}
            <p><a href="{{ url_for('edit_profile') }}">Edit your profile</a></p>
            {% endif %}
        </td>
    </tr>
</table>
<hr>
{% for post in posts %}
{% include '_post.html' %}
{% endfor %}
{% endblock %}
```

This uses more of the jinja templating that I've talked about previously which allows for an extremely easy use of variables and functions in the html file and can be seen with if statements and an include as can be seen with `{% include '_post.html' %}`. This grabs a sub-template from the `_post.html` file and inserts it into the page for each post that the user has in the database (or dummy posts for now).

Next comes the edit profile page, which is shown below:
```html
{% extends 'base.html' %}

{% block content %}
    <h1>Edit Profile</h1>
    <form action="" method="post">
        {{ form.hidden_tag() }}
        <p>
            {{ form.username.label }}
            {{ form.username(size=32) }}
            {% for error in form.username.errors %}
            <span style="color:red";>[{{ error }}]</span>
            {% endfor %}
        </p>
        <p>
            {{ form.about_me.label }}
            {{ form.about_me(cols=50, rows=4) }}
            {% for error in form.about_me.errors %}
            <span style="color:red";>[{{ error }}]</span>
            {% endfor %}
        </p>
        {{ form.submit() }}
    </form>
{% endblock %}
```

This shares similar traits to those of other form pages that have been created such as the login and register page, and so should be easy to understand. Behind it uses a form class that is defined in the `app/forms.py` file ver simply to allow an easier way to create the forms as shown above:
```py
class EditProfileForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    about_me = TextAreaField("About Me", validators=[Length(min=0, max=140)])
    submit = SubmitField("Submit")
```
This creates each of the different files with names that can be referenced in the edit profile page, and also adds validators to ensure that the data is valid in both having data and has the required amount of data.

## Error Handling
From creating the edit page for the website I have found that there is a high chance that the page can run into errors, and the default pages are quire bland, so to fix that I was able to implement a bit of error handling into the code by creating a new file called `errors.py` as follows (and yes, I added the teapot error):
```py
from flask import render_template
from app import app, db

@app.errorhandler(404)
def not_found_error(error):
    return render_template("404.html"), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template("500.html"), 500

@app.errorhandler(418)
def teapot_error(error):
    return render_template("418.html"), 418
```

This essentially takes all errors that can pop up and adds a custom error page for them, and in the case of a bad request (such as in a change of username error where the username is already taken) it will rollback the database to the previous state. Each of the functions cna also be seen to return a status code, which wasn't necessary before. This is because Flask has a default status code of 200, which is the status code for a successful request, but now that we have custom error pages we need to specify the status code for each of the errors.

For an example of an error page, the 404 page is shown below:
```html
{% extends "base.html" %}

{% block content %}
    <h1>File Not Found</h1>
    <p><a href="{{ url_for('index') }}">Back</a></p>
{% endblock %}
```

Next these need to be added to the `__init__` file to actually add them to the app, which is done by adding one thing, going from:
```py
...
from app import routes, models
...
```

to:
```py
from app import routes, models, errors
```
Very simple right?

---

That was all I was able to get up to before this post, but it should be enough to show an understanding and possibly improve your understanding of the subject and why things are placed where they are. The user profile pages and editing pages as well as the error pages are quite important for the specific microblog website and so it is important that they were covered in the Mega-Tutorial, but due to the fact that I'm following a tutorial, these posts won't be as interesting as they can be, but I will still try to explain what is going on as best as I can.