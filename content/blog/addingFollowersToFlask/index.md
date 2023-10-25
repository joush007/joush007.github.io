---
title: Adding Followers to our Flask App
date: 2023-03-27
tags: ["Web Development", "Flask", "Python"]
---

Following on from last week, we now have a method of error handling in place. This week we're going to be adding followers to our app. This will allow users to follow other users and be saved in a database, which is a bit more confusing than you'd expect. This is due to the fact that you'd normally expect connections with many to many relations in a database to be between two seperate tables, such as with a student-teacher relationship structured as:

![student-teacher](https://blog.miguelgrinberg.com/static/images/mega-tutorial/ch08-students-teachers.png)

In this case, though, the connection uses a single table, the Users table, as Users follow other Users, therefore the table looks more like this:

![user-user](https://blog.miguelgrinberg.com/static/images/mega-tutorial/ch08-followers-schema.png)

This may seem a bit confusing, and that was my first thought too, but it makes a bit of sense as the follower user is the user following the followed user. Therefore there are 2 distinct users being talked about. For exmple (because I'm quite unclear in my previous explanation), if User1 follows User2, then User1 is the follower and User2 is the followed user as depicted in the schema above.

## Creating the tables in the database
To get started with doing any of this, the database needs to be up to date to hold the information of the followers to store who is following who.

We start that with a new model in the `models.py` file as a direct translation of the schema above:

```py
followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('user.id'))
)
```

Now that the followers table is defined, we can create the new relationship between the tables

```py
class User(UserMixin, db.Model):
    # ...
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')
```

This is a bit of a mouthful to understand, so I'll explain what each of these parameters do:

* 'User' is defining that the relationship is from this table (the user table as stated by the class) back into itself, the user table.

* The secondary is showing what the relationship is going into, which is shown to be the followers table

* The primaryjoin and secondaryjoin are defining the conditions for the join, which is the same as the schema shown earlier

* The backref is defining the name of the relationship back to the user table, which is followers and the query execution method is given by the lazy parameter, which is dynamic

## Following and Unfollowing
Due to the nature of using SQLAlchemy, we can use a simple method of following and unfollowing users. This is done for a user (user2) following another user (user1) by using `user1.followed.append(user2)`, and can be unfollowed by `user1.followed.remove(user2)`

We can, therefore, create a new method for the User model to follow and unfollow a user:

```py
class User(UserMixin, db.Model):
    #...

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0
```

The following and unfollowing functions use the exact same method as depicted in the previous section, using the append and remove methods to add and remove the user from the followed list. The is_following function uses the filter method to check if the user is in the followed list, and returns a boolean value, which is then used to indicate whether a user can follow or unfollow another user by checking if they are already following.

## Showing Posts from Followed Users
The most logical next step in the application involves grabbing all users that a user is following and displaying their latest posts, and most would think the best way to do this is to query for the posts of every user, which isn't efficient as the more people you follow, the more queries you have to do. This issue can be avoided through the use of a bit of a complex query, which is shown below:

```py
class User(UserMixin, db.Model):
    #...
    def followed_posts(self):
        return Post.query.join(
            followers, (followers.c.followed_id == Post.user_id)).filter(
                followers.c.follower_id == self.id).order_by(
                    Post.timestamp.desc())
```

This query is also a bit of a mouthful, so lets break it down again:

* The first part is joining the posts table with the followers table, to grab the posts of the users that the current user is following

* The first and second condition makes sure it grabs only the posts of the users that the current user is following and narrows it down to all of those posts that are from the users that the current user is following
    * The first condition grabs all the posts of users that have followers
    * The second condition filters the posts to the posts that the current user is following

* The last part is ordering the posts by the timestamp, with the most recent posts at the top

Now we're missing a few posts, our own, which should be grabbed with the others. This can be fixed by adding it to return with the other posts, which is shown below:

```py
    def followed_posts(self):
        followed = Post.query.join(
            followers, (followers.c.followed_id == Post.user_id)).filter(
                followers.c.follower_id == self.id)

        own = Post.query.filter_by(user_id=self.id)
        return followed.union(own).order_by(Post.timestamp.desc())
```

As can be seen, the last 2 lines have a few changes, where instead of going straight to the order by after the filter, we grab our own posts before the ordering and then union them with the followed posts, essentially combining the two, then they can be ordered by their timestamps.

#### Note
There was a bit of talk on tests in the tutorial, but I don't have the space to write about it here, so I'll leave it for now and come back to it later, this is also due to the fact that the tutorial doesn't cover the testing in much detail just yet and will explain it in a later chapter that I'm not up to

Next we will need to implement the following and unfollowing buttons on the user profile page, which will be done in the next post but more condensed as I am running out of space here.

## Conclusion
I have been running out of space in this blog post to write about the rest of the tutorial, so I will be splitting it up and talking about the rest in another post, but that may be due to the depth I went into today with explanations of SQLAlchemy and the database, which I will be attempting to cut down on in the next post. I will be smashing out the rest of the tutorial throughout the week so that I can start work on a project afterwards but also to gain enough understanding to apply Flask to a new environment and start building my own projects.