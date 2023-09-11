---
title: "Winston Wk 11"
date: 2023-09-11
topics: ["Web Development", "WINSTON"]
series: ["WINSTON"]
series_order: 21
---

[Diff](https://github.com/joush007/Flask-Server-WINSTON/commit/faeb9501386e2bcf077195809a0d34fae04c44b4)

[Morgan's Blog](https://Morgan-Potter.github.io)

[Sam's Blog](https://samsidebotham.com)

[GitHub Repository - Winston](https://github.com/joush007/WINSTON) - All parts of the project are linked through submodules

# Overview
Although the diff only shows a small change, a decent bit more has occurred since last week. I have fixed the save button on the post pages and started adding a new button that will allow users to edit their posts (and later their comments). The additions weren't large but will definitely be useful to the users after I have received feedback asking for the possibility to edit posts and comments.

# Save Button
There was a small issue in the save button on the site, with the button triggering a function that would update the user colleciton in the database. This was a feature added a while ago that is quite useful and will be more useful once I add the modal that should be opened once the button is clicked to set which collection the post should be saved to. The issue that occured was that the button could be clicked multiple times and show the animation for `saving...` multiple times although it had already been saved. This was due to an event handler being added to it, but it wasn't being removed as I didn't know how to use JS for this.

To fix this issue, when I define the function being used to handle the click, I needed to add the `once` option and set it to true. This works a lot better as it will only specify to run the function once, and then they'll have to reload the page to be able to use it again, but by then the post will have been saved and the button will be disabled. This is a lot better than the attempted solution from before which did not work at all using `removeEventListener(this)` (Yes I realise my solution was silly).

Here's the section of code you'll need to get it working as mine does:

```js
save.addEventListener(
    'click',
    async function (event) {
        ...
    },
    { once: true }
);
```

# Edit Button
The edit button is a new feature that is being added, and will modify the page by changing the post (or comment) into a text box as long as it's yours. It will feature a modifiable text section with a save button and a delete post button (with a confirmation). The plan for this is to give the user who owns a comment or post the ability to tweak it slightly if they have misspelled something or want to add something to it that they left out. This should make it a lot easier for users to fix their mistakes and make their posts look a lot better instead of having to create an entirely new post.

The thought behind this would be to add the button down near the save button, and it would only be visible if the user was a) Logged in and b) the owner of the post. This would be done using the same methods of checking that have been implemented in other files, and would make sure that the user is logged in first, and if so then it would check if the user is the owner of the post. If they get through all of these checks, the button will be visible to them and they'll be able to edi the post. This will work the same for comments, but they will be implemented afterwards as they will use the same concepts to implement.

# Conclusion
Although I don't have much to say for this week I can say confidently that I am going in the right direction, although I may need to speed up on developing some of the features so that I can have a fully functional website by the end of the school year when it's due. I am also happy to say that I have been able to work on the Data Science side of the project a little bit and started to explore Neural Networks, so if you're interested in that, chuck yourself over to the other post for that!