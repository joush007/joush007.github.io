# Covering a few chapters of the Flask Mega-Tutorial
## Web Dev
### 27/02/2023

## Introduction
Alright, so a lot has happened over the past 2 weeks in web dev and I have gone through a few more chapters of [the Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world). This included the use of forms, creating a database, a login page and creating a user profile page.

## Forms & User Login
The first thing that I did was create a form for the user to be able to login or create a profile. This was done by creating a form class in the `app/forms.py` file which looked like this:

```py
...

class LoginForm(FlaskForm):
    # Create fields
    # The validators are used to ensure that the data entered into the form is valid
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')

    # Create a submit button
    submit = SubmitField('Sign In')

class RegistrationForm(FlaskForm):
    # Create fields
    # The validators are used to ensure that the data entered into the form is valid
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    # Password 2 checks that the value is equal to the first password, and if not, it will raise an error
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')]
    )
    submit = SubmitField('Register')

    
    # Custom validation methods for username and email, to check if they are already in use

    def validate_username(self, username):
        user = db.session.query(User).filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError("Please use a different username.")

    def validate_email(self, email):
        user = db.session.query(User).filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError("Please use a different email address.")
```

This was then used in the `app/templates/register.html` and `app/templates/login.html` pages to render the forms in a template extending the base template (as talked about 2 weeks ago)

```html
{% extends "base.html" %}

{% block content %}
<h1>Register</h1>

<form action="" method="post">
    {{ form.hidden_tag() }}
    <p>
        <!-- Curly brackets indicate use of a variable -->
        {{ form.username.label }} <br>
        {{ form.username(size=32) }} <br>
        <!-- If there's an error, show it -->
        {% for error in form.username.errors %}
        <span style="color: red";>[{{ error }}]</span>
        {% endfor %}
    </p>
    <p>
        <!-- Curly brackets indicate use of a variable -->
        {{ form.email.label }} <br>
        {{ form.email(size=64) }} <br>
        <!-- If there's an error, show it -->
        {% for error in form.email.errors %}
        <span style="color: red";>[{{ error }}]</span>
        {% endfor %}
    </p>
    <p>
        <!-- Curly brackets indicate use of a variable -->
        {{ form.password.label }} <br>
        {{ form.password(size=32) }} <br>
        <!-- If there's an error, show it -->
        {% for error in form.password.errors %}
        <span style="color: red";>[{{ error }}]</span>
        {% endfor %}
    </p>
    <p>
        <!-- Curly brackets indicate use of a variable -->
        {{ form.password2.label }} <br>
        {{ form.password2(size=32) }} <br>
        <!-- If there's an error, show it -->
        {% for error in form.password2.errors %}
        <span style="color: red";>[{{ error }}]</span>
        {% endfor %}
    </p>
    <p>
        {{ form.submit() }}
    </p>
</form>
{% endblock %}
```

## Database
The next thing that I did was create a database for the user to be able to store their information. This was done by creating a database class in the `app/models.py` file which looked like this:

```py
class User(UserMixin, db.Model):
    # Create the columns for the database
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    about_me = db.Column(db.String(140))
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)

    # When printing the user object it will show the username in the form <User {Username}>
    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
        # Generate secure password hash off of the password
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        # Check if the password matches the hash
        return check_password_hash(self.password_hash, password)
    
    def avatar(self, size):
        # Grab the Gravatar link to the user's avatar based off of their email
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return "https://www.gravatar.com/avatar/%s?d=identicon&s=%s" % (digest, size)
```

The user class was then applied to multiple areas of the site, in the login and register pages, where a user is created or queried from the database, and in the user profile page, where the user's information is displayed.

## User Profile
The user profile page was created by creating a new route in the `app/routes.py` file which looked like this:

```py
@app.route('/user/<username>')
@login_required
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    posts = [
        {'author': user, 'body': 'Test post #1'},
        {'author': user, 'body': 'Test post #2'}
    ]
    return render_template('user.html', user=user, posts=posts)
```

Now it's important to note 2 things here, those being the `@app.route('/user/<username>)` and the `@login_required` decorators. The first one is used to create a route that takes a variable, in this case the username, which means that it will go to the user page of a specified user for whichever user specified, and the second one is used to ensure that the user is logged in before they can access the page.

The `first_or_404()` method is another interesting one and is used to return the first result from database for the user, or if there is no result, return a 404 error.

The user page is then rendered, which looks like this:

```html
{% extends "base.html" %}

{% block content %}
<table>
    <tr valign="top">
        <!-- Grab avatar from class -->
        <td><img src="{{ user.avatar(128) }}"></td>
        <td>
            <h1>User: {{ user.username }}</h1>
            <!-- Check if variables exist, if so, show them -->
            {% if user.about_me %}<p>{{ user.about_me }}</p>{% endif %}
            {% if user.last_seen %}<p>Last seen on: {{ user.last_seen }}</p>{% endif %}
        </td>
    </tr>
</table>
<hr>
{% for post in posts %}
<!-- Use sub-templates for each post -->
{% include '_post.html' %}
{% endfor %}
{% endblock %}
```

## Conclusion
This week I learned a lot about how to use Flask to do some pretty interesting things, including to create and manage a lot of pages using templates, creating a database to store users and their information, and also creating forms which I can use to interact with a database, although not seeming the most secure in terms of SQL injection, but I'm sure there are ways to prevent this. Over the next few weeks I will be continuing to go through the Flask Mega-Tutorial, and also studying more server architectures besides the MVC, as I need to understand a few due to the upcoming exams where I will need to write about different server architectures and how effective they are. As usual, though, I will continue to post weekly on my progress and what I have learned.