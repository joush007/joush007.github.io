---
title: "Winston Wk 3 | Database Setup"
date: 2023-05-22
topics: ["Web Development", "WINSTON", "Python"]
series: ["WINSTON"]
series_order: 8
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

Last week was a big one for me, getting a lot done on the website, as can be seen in the repository. I have now checked off a few things on the To-Do list, those being:
* Creation of a home page
* Creation of users including:
    * Usernames
    * Hashed passwords
    * Avatar
* Added an admin page
* Added profile pages 
* Setup the base database structure
    * I still need to add another table for the collections though

Let's do a quick runthrough of each of these.

# Creation of a home page
One of the first things I needed to do was get at least one page looking OK, and to do that I needed a wireframe for the page. I decided to get a pretty basic home page sorted using the popular wireframe creator [wireframe.cc](wireframe.cc) and you can find the wireframe I made for this [here](https://wireframe.cc/b33ynk). From there I started writing the code to get the page setup. There are jokes about web dev that are made regarding the difficulty to center something inside of a div. They weren't lying, it took me a good 30 minutes to center some text, but that's OK because I got it in the end. It was a bit of a struggle, but it taught me a thing or two about CSS. There wasn't really much else to the home page, but I'm glad it's all in order now.

# Creation of users
This one wasn't that difficult, as I'd already setup the tables last week, but I hadn't setup a method to add data to the database, and so I needed to create a new form and login page on the site, looking something along the lines of this:

```py
forms.py
class LoginForm (FlaskForm):

    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(),
                                           EqualTo('password')])
    submit = SubmitField('Register')

    def validate_username(self, username) -> None:
        if User.query.filter_by(username=username.data.lower()).first():
            raise ValidationError("Username taken")
    
    def validate_email(self, email) -> None:
        if User.query.filter_by(email=email.data).first():
            raise ValidationError("Email taken")
```
```html
login.html
{% extends "base.html" %}

{% block content %}
    <h1 class="text-5xl">Sign In</h1>
    <br>
    <form action="" method="post" class="" novalidate>
        {{ form.hidden_tag() }}
        <p>
            {{ form.username.label }}<br>
            {{ form.username(size=32, class_="border border-black rounded") }}
            {% for error in form.username.errors %}
                <span class="text-red-500">[{{error}}]</span>
            {% endfor %}
        </p>
        <br>
        <p>
            {{ form.password.label }}<br>
            {{ form.password(size=32, class_="border border-black rounded") }}
            {% for error in form.password.errors %}
                <span class="text-red-500">[{{error}}]</span>
            {% endfor %}
        </p>
        <br>
        <p>{{ form.remember_me() }} {{ form.remember_me.label }}</p>
        <br>
        <p>{{ form.submit(class_="border p-1 border-black rounded bg-[var(--primary)]") }}</p>
        <br>
        <p>New User? <a href="{{ url_for('register') }}" class="text-blue-400 underline">Click to Register!</a></p>
        <p>
            Forgot Your Password?
            <a href="#" class="text-blue-400 underline">Click to Reset It</a>
        </p>
    </form>
{% endblock %}
```
```py
models.py
class User(db.Model, UserMixin):

    # Create database columns for each of the fields
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    time_created = db.Column(db.DateTime, default=datetime.utcnow())
    password_hashed = db.Column(db.String(128))

    # Posts relationship, which posts are linked to the user
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    
    def __repr__(self) -> str:
        return f"<User {self.username}>"
    
    def set_password(self, password:str) -> None:

        self.password_hashed = generate_password_hash(password, method="sha256")

        return
    
    def check_password(self, password):

        return check_password_hash(self.password_hashed, password)
    
    def avatar(self, size):
        # Grab gravatar avatar
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'https://www.gravatar.com/avatar/{digest}?d=identicon&s={size}'
```

As you can see, it's all pretty self explanatory for the python file, just setting up a few fields with validators, and then in the HTML file, I'm taking the input of the form and adding each of the form fields to the page. This includes the label as well as the field itself. If you're wondering about the `size=32` part, that is just the width on the page for the field, and I kept that consistent across the login and render page to look a little nicer. I have implemented the register page as well, and you can see that with a register button, but I haven't added the functionality to the forgotten password button yet.

# Added an admin page
This one was simple, I needed to add a list of admins to the config file with an `ADMINS = ['John@example.com']` for example, and then provide the app context to each page to allow the admin tab to show up in the navbar. The code to get that working was a bit painful but I got there in the end:

```py
routes.py:
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='Home', current_user=current_user, app=app)
```
```html
base.html:
{% if current_user.email in app.config["ADMINS"] %}
<li class="">
    <a href="{{ url_for('admin') }}"
        class="p-5 block lg:inline-block text-white  {{ 'active' if request.path == url_for('about') else '' }}">Admin</a>
</li>
{% endif %}
```

In the html, you can see that I have first done a check to see if the email for the user is in the list of admins defined in the Config file, if not, it won't show the tab, but if so, it will be on the right of the about tab. This is quite useful for the site as it will allow ease of access to the admin panel for admins instead of consistently typing in `/admin` at the end of the URL.

NOTE: The admins weren't stored in the database as it would be taking up unnecessary space, and I believe this would be easier to manage if in the config file.

# Added a profile page
This one also wasn't too hard, as I was able to feed the user data into the render_template of the user page.

The routing was simple, but I also realised I had no way to logout of the site, and so I added the button to the profile page. It looked along the lines of this:
```py
routes.py:
@app.route('/user/<id>')
def user(id=current_user.id if current_user else 1):
    # 1 used as placeholder, will possibly redirect if not provided with an id
    
    user = User.query.get(id)
    # If the user doesn't exist, return a 404 page
    if not user: return(render_template('errors/404.html', title='Page not found!'))
    
    return render_template('user.html', title=f'{user.username}', user=user, current_user=current_user, app=app)
```
```html
{% extends "base.html" %}

{% block content %}
<img src="{{ user.avatar(128) }}">
Eyyyy,
it's {{ user.username }}'s page.
<br><br>
<a href="{{ url_for('logout') }}" class="text-blue-400 underline">Logout</a>
{% endblock %}
```

As usual, we set up a template, holding the page, this will hold the user's information with the avatar, username and, in future, a bio. If you are logged in, the logout button will appear, but I haven't put that in yet, and logout it there for testing purposes.

The script provides information on the current user, the app context and the user in question, and then the html file will username and avatar of the user. This will be updated in future so that you can change your information and add a bio, but for now, it's just a placeholder, and minimal information is shown as proof of concept.

# Setup the database structure
These are all pretty simple tasks, but when you look at it all together, it seems harder than it really is, which is why breaking it down is a lot easier and working on 1 feature at a time is great. The database already had a basic structure in the project, but this wasn't entirely accurate, and so I revamped the database structure to look like this:

```py
class User(db.Model, UserMixin):

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    time_created = db.Column(db.DateTime, default=datetime.utcnow())
    password_hashed = db.Column(db.String(128))

    posts = db.relationship('Post', backref='author', lazy='dynamic')
    
    def __repr__(self) -> str:
        return f"<User {self.username}>"
    
    def set_password(self, password:str) -> None:
        
        self.password_hashed = generate_password_hash(password, method="sha256")

        return
    
    def check_password(self, password):

        return check_password_hash(self.password_hashed, password)
    
    def avatar(self, size):
        digest = md5(self.email.lower().encode('utf-8')).hexdigest()
        return f'https://www.gravatar.com/avatar/{digest}?d=identicon&s={size}'
    
class Post(db.Model, UserMixin):

    id = db.Column(db.Integer, primary_key=True)
    imageLocation = db.Column(db.String(64), unique=True)
    heading = db.Column(db.String(128), unique=True)
    heading = db.Column(db.String(2000), unique=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self) -> str:
        return f"<Post {self.id} - {self.author}>"
```

Now you might be asking, "What's different about that?", and I'll tell you, I've now added in the password to the user, and the avatar so that they cna be referenced as well as fixed some casing. This was pretty simple, but provided some crucial elements to the table. There will be a few more changes to the database in the future, but this covers everything for now.

# Conclusion
Overall, this week has been pretty high intensity, as I had a lot to do for web dev, but honestly I'm finding it quite fun. I've got a bit to work on next week with implementing more features, but I'll get to that when I get to it. I've learned a lot on how to interact with flask and will hopefully be able to continue pushing this knowledge in the future to be able to create a fully functional website.


|To Do                                                                                      |Done|
|-------------------------------------------------------------------------------------------|----|
|Figure out connection method for W.I.N.S.T.O.N.                                            |    |
|Setup connection to W.I.N.S.T.O.N. to allow data flow for CV                               |    |
|Setup a python flask server                                                                | x  |
|Create a Home Page                                                                         | x  |
|Create Users (with Username, Password [Hashed] and Avatar)                                 | x  |
|Add admin page (For anything that might need to be sent to or from W.I.N.S.T.O.N. directly)| /x |
|Create Profile pages (Ideas to what to add for Users will add here)                        | x  |
|Add user collections                                                                       |    |
|Create a W.I.N.S.T.O.N. page where the render will be streamed                             | x  |
|Display live stream                                                                        |    |
|Setup Database Structure                                                                   | /x |
|Add Users and Posts tables to DB                                                           | x  |
|Any other ideas will be added to the table if this changes                                 |    |