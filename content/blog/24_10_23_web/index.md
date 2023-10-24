---
title: "Winstogram 'Unable to edit' bug fix"
date: 2023-10-24
topics: ["Web Development","Python"]
series: ["WINSTON"]
series_order: 23
---

[Diff](https://github.com/joush007/Flask-Server-WINSTON/commit/7a7b6031542350a211519c2b5526712959714a1c)

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Bug fixing

Last week I was doing some testing of Winstogram to find things that may need to be fixed or errors that may pop up. I got one of my classmates to try to create a post and edit it, and then test deletion of the post as well. The issue they ran into had to do with being locked out of doing that. The previous posts on Winstogram have shown the implementation of the editing and deletion features of posts as well as a revamped saving feature (which can still only save to one collection, and you can't unsave it).

The issue I found, was that the requests were going through but it wasn't acting on it. I found that it had to do with the check done in the api. It was a very small part of the code, and this was something that had flown under the radar for a little bit.

The code that was blocking the editing and deletion of posts was the one which normally checks if a user is deleting their own post, otherwise it will not allow the request to go through. It looked like this previously:

```py
if not (current_user.admin or current_user.id != tables[table_name].query.get(entry_id).user_id):
    return jsonify(response="Unauthorized", status='error'), 401
```

This was meant to check if the user is an admin or if the user owns the post. It checks if the user is an admin or doesn't own the post, and then it performs a NOT on both of them. This means that if it was tested by someone and they were to try and delete a post, it would say they own the post, therefore with the `current_user.id != tables...`, the statement would evaluate to false, and therefore the not would kick in and disallow any changes, assuming that the post wasn't owned by the user. To fix this, I just needed to change the `!=` into a `==`. The final code to fix this looked like this:

```py
if not (current_user.admin or current_user.id == tables[table_name].query.get(entry_id).user_id):
    return jsonify(response="Unauthorized", status='error'), 401
```

The issue with the code, besides it not working, was the fact that this was actually a vulnerability. It meant that anyone could delete or update anyone's posts by making an http request. Now that the cookies are being checked for the user with a session id, we are able to say that the request must come from the user, and they must either own the post or be an admin in order to affect the post, otherwise it will not be allowed.