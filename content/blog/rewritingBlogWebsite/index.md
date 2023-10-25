---
title: Rewriting my Blog Website
date: 2023-03-14
tags: ["Web Development", "Blog", "Markdown"]
---

Last week I decided it's been enough of the old blog website design, so I rewrote it using the [Blowfish](https://github.com/nunocoracao/blowfish) theme, which is a [Hugo](https://gohugo.io/) theme created by [Nuno Coração](https://github.com/nunocoracao).

The old website was created by hand and can be found in the archived version of the website under the branch [archive_10-03-23_Walrus](https://github.com/joush007/joush007.github.io/tree/archive_10-03-23_Walrus). The old website was created using [Bootstrap](https://getbootstrap.com/) and [jQuery](https://jquery.com/) to implement the responsive design, listing of all posts and the clock functionality where it shows ms since epoch on hover over the clock.

Creating the new website was a lot easier than I thought it would be, as all I had to do was find the theme and follow the instructions to install it. From there I had to create each page as md files and add a bunch of toml files to configure the theme to my liking and create the menu and tags. I then rewrote each of the old posts to add in the header section that is read in from the theme and added to the site and tested it. From there I just had to add the old posts to the new website and I was done.

Now I've just got a bunch of errors to fix, so this blog post will only be seen by those who access the github, not the page, as the build and deploy are creating a bunch of errors which I have already brought up as an issue in the theme's github repo. Now I just have to wait for a response in order to figure out a solution to the problem as I haven't been able to find myself one yet.

On the other side of things, I also had an exam on the MVC at the start of the week and a few other exams throughout the rest of the week which impacted the amount of work I was able to get done throughout the week. Therefore there wasn't much that I was able to get done on the I.T. work from the previous work that I will be following through with this week. I did however get a lot of work done on the website, as it was a quick and easy task to do. I say quick, but in reality it did take me a while to setup.