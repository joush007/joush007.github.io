---
title: "Winston Wk 4 | Winstogram Lives! Admin also.."
date: 2023-05-30
topics: ["Web Development", "WINSTON", "HTML", "Python"]
series: ["WINSTON"]
series_order: 10
---

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Implementation of Winstogram posts and forms

Winstogram has seen many improvements since it's beginning, especially because it used to used dummy data, and now we can see that posts can actually be made, although not exactly in the way it will eventually end up. The posts in future will act as posts in a forum, where users can click a button to create a forum that will be filled with text, images and other media that may be needed as well as the option for comments to be added. At the moment I have been able to improve the web app to allow for posts to be added to the database (although it might not look good, but due to a focus of functionality over looks at the moment) and also allow for saving posts to a collection as needed for the assignment.

## Posts

It was time to implement posts into the web app this week, but to do so, it is best to break it down into small things to add and then work them all together. This is the pricess that I used to implement it:

-   I need a form to add posts
-   I will need to read in the data being sent from the post form
-   The post form will need to make sure there is nothing to inject HTML into the page (in the future, when there are full forum posts, it will use Markdown to allow for formatting, but we don't want injection of scripts)
-   The information from the form needs to be added to the database
-   The post will need to be displayed on the page along with others

With this, I could attack each issue individually, starting with the form

### The posts form

The posts form is simple, it only needs a subject, body and submit button, and so, following the format of each of the other forms we've added we can create a form to allow a user to post a new item.

```py
class PostForm(FlaskForm):
    # Subject max length 128 characters
    subject = StringField("Subject", validators=[
                          DataRequired(), Length(1, 128)])
    # Body max length 2000 characters to avoid slow loading of the page
    body = TextAreaField("Body", validators=[DataRequired(), Length(1, 2000)])
    submit = SubmitField("Submit")
```

Easy right? Well then we also need to add this to `posts.html`:

```html
<form id="newPostForm" action="" method="post" autocomplete="off" novalidate>
    {{ form.hidden_tag() }}
    <p>
        {{ form.subject.label }}<br />
        {{ form.subject(size=50, class_="border border-black rounded") }} {% for
        error in form.subject.errors %}
        <span class="text-red-500">[{{error}}]</span>
        {% endfor %}
    </p>
    <br />
    <p>
        {{ form.body.label }}<br />
        {{ form.body(cols=52, rows=10, class_="border border-black rounded") }}
        {% for error in form.body.errors %}
        <span class="text-red-500">[{{error}}]</span>
        {% endfor %}
    </p>
    <br />
    <p>
        {{ form.submit(class_="border p-1 border-black rounded
        bg-[var(--primary)]") }}
    </p>
</form>
```

As you can see in the form, I added a new key-word argument so that there will be no autocomplete, this is because there is no need for autocomplete to exist in this context (I don't think people are gonig to need to post something more than once), but everything else stayed the same.

### Reading in the data, removing HTML tags and adding to the database

To read in the data, we could incorporate the same method used as in the registration page:

```py
if form.validate_on_submit():
    # Create a new post object, replacing any tags with their HTML escaped equivalent
    post = Post(
        header=form.subject.data.replace(
            '<', "&lt;").replace('>', "&gt;"),
        body=form.body.data.replace('\r', '').replace(
            '<', "&lt;").replace('>', "&gt;"),
        imageLocation=None,
        user_id=current_user.get_id()
    )
    db.session.add(post)
    # Commit the change to the database
    db.session.commit()
    return redirect('posts')
```

This will allow for the data to be read from the form, escaped from any HTML tags and then be added to the database.

### Displaying the posts

Displaying the posts can also be broken down into smaller steps, as each post needs to be retrieved from the database and displayed on the page. If there are a large amount of posts, pagination would also be a good idea, as it would allow for the page to load faster, and other posts to be loaded as needed. This would then be passed to the template to be iterated over and displayed on the page.

```py
page = request.args.get('page', 1, type=int)
posts = []
form = PostForm()

# All posts for now as there is a small amount of posts (per_page isn't defined to allow for all posts to be displayed)
for post in Post.query.paginate(page=page, error_out=False).items:
    posts.append({
        'header': post.header.replace('<', "&lt; ").replace('>', "&gt; "),
        'body': post.body.replace('\n', '<br>').replace('<', "&lt; ").replace('>', "&gt; "),
        'author': post.user_id,
        'id': post.id
    })

...

return render_template(
    'posts.html',
    title='Winstogram',
    posts=posts, # <-- This is what needs to be passed
    current_user=current_user,
    app=app,
    form=form,
    page=page
)
```

```html
{% for post in posts %}
<div id="postContainer" class="rounded-md border-2 border-gray-300 flex">
    <table class="w-full">
        <tr>
            <!-- Image placement if it exists -->
            {% if post.image %}
            <td id="postImageContainer">
                <img
                    id="postImage"
                    class="max-h-16 max-w-16 w-max"
                    src="{{ post.image }}"
                />
            </td>
            {% endif %}
            <th id="postHeaderContainer" class="">
                <div id="postHeader" class="text-lg text-left">
                    {% autoescape false %} {{ post.header }} {% endautoescape %}
                </div>
            </th>
            <th colspan="" class="float-right text-right pr-3 cursor-pointer">
                {% if current_user.is_active %} {% if
                current_user.collections.first() %} {% if not
                current_user.collections.first().posts.filter_by(id=post.id).first()
                %}
                <form action="post/{{ post.id }}/save" method="post" novalidate>
                    <button name="save" value="{{ post.id }}">Save</button>
                </form>
                {% endif %} {% endif %} {% endif %}
            </th>
        </tr>
        <tr>
            <td id="postBodyContainer">
                <div
                    id="postBody"
                    class="text-md"
                    style="overflow-wrap: break-word"
                >
                    <p>
                        {% autoescape false %} {{ post.body }} {%endautoescape
                        %}
                    </p>
                </div>
            </td>
        </tr>
    </table>
</div>
<br />
{% endfor %}
```

Disabling auto escape, by the way, is what allows us to use the `<br>` tag in the body of the post, as it will be escaped otherwise, and `\n` isn't recognised in the template, therefore we must turn off auto escape.

## Collections

Collections, as we have defined it in this project, is a way that a user can save posts for future reference. The user will have the option to save a post to their collection, at the moment it will be implemented as a saved post, but in the future it should be able to save to any collection the user has created. This isn't a difficult implementation, and I would say that the most difficult part is the new database structure that will need to be implemented to allow for it to work.

### Database Structure

The database structure will need to be changed to allow for the new collections to be added. The structure will be as follows:

```py
class Collection(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    posts = db.relationship('Post', secondary='collection_for_posts', backref=db.backref(
        'collection_list', lazy='dynamic'), lazy='dynamic')

    def __repr__(self) -> str:
        return f"<Collection {self.id} - {self.collection_author}>"

    def __dir__(self) -> list:
        return ['id', 'user_id', 'posts']


class CollectionForPosts(db.Model):

    collection_id = db.Column(db.Integer, db.ForeignKey(
        'collection.id'), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), primary_key=True)

    def __repr__(self) -> str:
        return f"<CollectionForPosts {self.collection_id} - {self.post_id}>"

    def __dir__(self) -> list:
        return ['collection_id', 'post_id']
```

The `Collection` table is needed, but you may be asking why we have the `CollectionForPosts` table, The `CollectionForPosts` table is necessary as there is a many to many relationship between the `Collection` table and `Posts` table, and therefore we need an association table to link the many to many relationship as 2 one to many relationships. This means that each collection and post in the `CollectionForPosts` table will have to be a primary and foreign key at the same time, and therefore will have 2 Primary Foreign keys.

### Adding to the database

I'm not going to lie, this was slightly painful to implement. The way to implemented this, as was done eventually, is through a POST request to the server, which I used another page for. when the `Save` button is clicked on a post in the Winstogram page, it sends a POST request to `/post/<id>/save` which will then run through some more code to add the post to the user's collection.

```html
<form action="post/{{ post.id }}/save" method="post" novalidate>
    <button name="save" value="{{ post.id }}">Save</button>
</form>
```

```py
@app.route('/post/<id>/save', methods=["POST"])
@app.route('/posts/<id>/save', methods=["POST"])
def save_post(id):

    collections = current_user.collections.all()
    # If there isn't a collection, create one
    if len(collections) == 0:
        collection = Collection(
            user_id=current_user.id
        )
        db.session.add(collection)
        db.session.commit()
    else:
        #  Add to the collection
        collection = current_user.collections.first()
    save_collection = CollectionForPosts(
        collection_id=collection.id,
        post_id=id
    )
    
    # Save to the database
    db.session.add(save_collection)
    db.session.commit()
    return (redirect(url_for('winstogram')))
```

This will then add the post to the user's collection, and redirect back to the Winstogram page.

## Admin Page

Finally I updated the admin page such that queries can be made to the database, and the results can be displayed on the page or any other quieres that don't return a response can be run, such as running `DELETE` on a row or table in the database. The issue that I had previously was actually quite simple as I had forgotten to add a commit to the database to save the modified data. In the end I also added an inspection menu to the admin page, which will allow for the admin in question to view a specific entry in the database and then, if needed, run a query on that specific entry.

The code for the updated admin page is as follows:

```html
<!-- Grid containing everything -->
<div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
    <!-- SQL Query -->
    <div id="sqlQueryContainer" class="px-10 md:col-span-3 sm:col-span-2">
        <form action="" method="post" class="" novalidate>
            {{ form.hidden_tag() }}
            <p>
                {{ form.query.label }}<br />
                {{ form.query(cols=80, rows=10, class_="border border-black
                rounded") }} {% for error in form.query.errors %}
                <span class="text-red-500">[{{error}}]</span>
                {% endfor %}
            </p>
            <br />
            <p>
                {{ form.submit(class_="border p-1 border-black rounded
                bg-[var(--primary)]") }}
            </p>
        </form>
    </div>
    <!-- Inspecion of specific element -->
    <div id="inspectDBEntryContainer" class="col-span-1">
        {% if inspection['table'] %}
        <!-- If a table has been specified -->
        <table id="inspectionTable" class="border-2 border-black">
            <tr id="inspectionObject">
                <!-- inspect entry -->
                <td>{{ items }}</td>
                <th class="text-left">{{ inspection['selection'] }}</th>
            </tr>
            <!-- For each column in the table, display the name of the column and the value in the column -->
            {% for item in inspection['items'] %}
            <tr id="{{ item }}" class="border-t-2 border-black">
                <th>{{ item }}</th>
                <td>{{ inspection['selection'][item] }}</td>
            </tr>
            {% endfor %}
        </table>
        {% endif %}
    </div>
    <!-- Show each table in the database (These can be clicked to inspect them) -->
    <table class="w-full border-2 border-black grid-cols-3">
        <tr class="">
            <th class="border-r-2 border-b-2 border-black">Tables</th>
            <td class="border-b-2 border-black">
                {% autoescape false %} {{ tableText.upper() }} {% endautoescape
                %}
            </td>
        </tr>
        <!-- Display each table w/ entry for small database -->
        {% for table in tables %}
        <tr class="">
            <th class="border-r-2 border-b-2 border-black">{{ table }}</th>
            <td class="border-b-2 border-black">
                {% for item in tableModels[table].query.paginate(page=1,
                per_page=5, error_out=False) %} {% if
                table=='collection_for_posts' %}
                <a
                    href="{{ url_for('admin', table=table, collection=item.collection_id, post=item.post_id) }}"
                    >{{ item }}</a
                >
                {% else %}
                <a href="{{ url_for('admin', table=table, view=item.id) }}"
                    >{{ item }}</a
                >
                {% endif %} {% endfor %}
            </td>
        </tr>
        {% endfor %}
    </table>
</div>
```
```py
if current_user.email in app.config['ADMINS']:
    
    sql_form = AdminSQLForm()
    tables = list(db.metadata.tables.keys())
    tableModels = {"user": User, "post": Post, "collection": Collection,
                    "collection_for_posts": CollectionForPosts}

    # Init variables
    table = None
    view = None
    collection = None
    post = None
    selection = None

    # Inspect a database entry
    if request.args.listvalues():
        
        # If non-existent -> None
        table = request.args.get('table')
        view = request.args.get('view')
        collection = request.args.get('collection')
        post = request.args.get('post')

        # collection_for_posts doesn't have an 'id' column, so it needs to be handled differently
        if table == 'collection_for_posts':
            selection = tableModels[table].query.filter(
                tableModels[table].collection_id == collection).filter(tableModels[table].post_id == post).first()
        else:
            selection = tableModels[table].query.filter(
                tableModels[table].id == view).first()
    
    # Running SQL Query
    if sql_form.validate_on_submit():
        sql = sql_form.query.data

        # Execute SQL Statement, must be converted to SQL text to execute
        results = db.session.execute(text(sql))
        # commit if changing any values
        db.session.commit() # <--- This is what was causing the issue

        # Delete does not return a result
        if 'delete' in sql.lower():
            flash(f"Executed: {text(sql)}")
            return redirect('admin')
        else:
            results = [tuple(row) for row in results.all()]
            flash((results))
            return redirect('admin')
    items = dir(selection)
    print(items)
    return render_template(
        'admin.html',
        title=f"Admin Panel",
        app=app,
        form=sql_form,
        db=db,

        tableText="<br>".join(tables),
        tables=tables,
        tableModels=tableModels,

        inspection={"table": table, "view": view,
                    "selection": selection, "items": items},
    )
```

## Conclusion

A lot has happened last week to work with the web application, but seeinga as I've got a week left of both assignments, I'm going to take a step back to work on the Data Science side of the project, as the Web app has taken a large focus of the project, and I would like to get the Data Science side of things working before I continue with the web app. I've still got the rest of the year to work on them both and get them working together, but for the upcoming week I will be working on the Data Science side of things to be able to submit the assignment, as this is, at the moment, in a submittable state.

| To Do                                                                                       | Done |
| ------------------------------------------------------------------------------------------- | ---- |
| Figure out connection method for W.I.N.S.T.O.N.                                             |      |
| Setup connection to W.I.N.S.T.O.N. to allow data flow for CV                                |      |
| Setup a python flask server                                                                 | x    |
| Create a Home Page                                                                          | x    |
| Create Users (with Username, Password [Hashed] and Avatar)                                  | x    |
| Add admin page (For anything that might need to be sent to or from W.I.N.S.T.O.N. directly) | /x   |
| Create Profile pages (Ideas to what to add for Users will add here)                         | x    |
| Add user collections                                                                        | /x   |
| Create a W.I.N.S.T.O.N. page where the render will be streamed                              | x    |
| Display live stream                                                                         |      |
| Setup Database Structure                                                                    | x    |
| Add Users and Posts tables to DB                                                            | x    |
| Any other ideas will be added to the table if this changes                                  |      |
