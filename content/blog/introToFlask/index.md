---
title: Intro to Flask & the MVC
date: 2023-02-13
topics: ["Web Development", "Flask", "MVC", "", "Overflow Tag"]
---

## What is the MVC?
The MVC model has three parts:
- Model
- View
- Controller

But what are these three parts?

### Model
The model is the data that is stored by the application, such as users and items. This is the data that will be manipulated by the application and displayed to the user.

### View
The view is the front end of the website. This includes the HTML, CSS and JavaScript that a website holds.

### Controller
The controller is the web server for the application, it's responsible for processing the user's requests and returning the appropriate data to the view.

## What is Flask?
Flask is one of the most popular web frameworks for Python. It's used to create both the front end and back end for a website acting as the controller in an MVC model. It handles the requests made and can be programmed to send back different response pages, such as a 404 page.

It can also deal with template pages, using blocks of html that can be reused across multiple pages or slotted into existing pages.

## An overview of the week
Over the week I looked into the MVC model and how it works. I also looked into Flask and how it can be used to create a web application. I looked into how to create a basic Flask application and how to use the Jinja templating engine to create template pages. I got a brief understanding of how Flask works internally, but a greater understanding of how to use flask to create a web page. This experience and knowledge will help me in future to create more complex web applications.

To create a basic flask app, I started following [this mega tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world). At the beginning we went through the initial setup of a flask application where we created an `__init__`:

```python
from flask import Flask
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

from app import routes
```

this references the routes file which contains the routes for the application, such as when someone goes to any specific page. This is where the controller part of the MVC comes in, as it handles the request, returning the appropriate response.

```py
from app import app
from flask import render_template
from app.forms import LoginForm

# Set the suffixes/pages
@app.route('/')
@app.route('/index')
def index():
    # Temp Data
    user = {'username': 'User123'}
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
    # Generate the page, filling in a template
    return render_template('index.html', title='Home', user=user, posts=posts)

@app.route('/login')
def login():
    form = LoginForm()
    return render_template('base.html', title='Sign In', form=form)
```

The referenced template for the login form, 'base.html' is written in html and uses the Jinja template format to fill in the form:

```html
<!doctype html>
<html>

<head>
    <!-- Statements that aren't inputting variables (Which uses { var })
        use {\%  %} such as if statements and loops -->
    {% if title %}
    <title>{{ title }} - Microblog</title>
    {% else %}
    <title>Welcome to Microblog</title>
    {% endif %}
</head>

<body>
    <div>
        Microblog: 
        <a href="/index">Home</a>
        <a href="/login">Login</a>
    </div>
    <hr>
    <!-- Blocks use templates to fill in information, 
        usually from another file extending this template and defining the block -->
    {% block content %}{% endblock %}
</body>

</html>
```

This is a very basic example of how flask works, but it shows how the controller part of the MVC works. It handles the request and returns the appropriate response, in this case the webpage. It's quite a simple process but can be used to create more complex web applications than just using HTML, CSS and JavaScript like I did last year.

## What next?
In the coming weeks I will be continuing through the mega tutorial which will continue to teach me about the MVC model and how I can use Flask to create a web application which I can use for my final year project. I believe that I need to put in a bit more work for Flask outside of class to get a better understanding of how it works and how I can use it to create a better web application or website.

## Reflection
This week in Web Dev was quite interesting looking into the MVC model and Flask. I stayed on topic for most of the week with a few chats with the Year 12s and lending a hand to a few Year 11s. I think I am putting in the effort in this subject, but I noticed a little bit through the week that I was focusing more on Data Science, following last year's habit, but I pulled myself back on track and got back into the Web Dev work. Next week I will continue to work through the tutorial to get myself to a level where I can create my own projects using Flask and be able to use the knowledge for my final project.