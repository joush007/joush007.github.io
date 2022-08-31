# CSS Frameworks
## Web Dev
### 24/07/2022

In web dev this week I was able to look into some of the things that I should have looked into for the final assessment item of last semester, that being CSS Frameworks. The content that was covered in the week have to do with the different frameworks out there, and three in particular, those being Bootstrap, probably the most well known, Materialize, and Tailwind, which is my personal favourite at the moment.

CSS Frameworks are libraries that allow for easier, more compliant web designs. There are a lot of different frameworks publicly available, but the 3 that were focused on in class this week were Bootstrap Materialize and Tailwind. The frameworks all have similar classes and components, but some require a bit more work than others.

Bootstrap is probably the most beginner-friendly of the lot, with a lot of documentation and examples that allow for creation of a simple, responsive and nice looking design. It's one of the most well-known of the tree, or at least I think so, and has enough components to create many variations of designs for a webpage whilst not having to create the designs from scratch.

Using the latest bootstrap version I was able to create this:

![Danko Homepage Bootstrap](/pictures/dankobs.png)

The navbar html looked like this:
```html
<nav class="navbar nav-pills navbar-dark bg-dark sticky-top">
    <div class="container-fluid justify-content-start">
        <a class="navbar-brand" href="../AI_1/index.html">
            <img src="./assets/logo.png" alt="DANKO logo - The store">
        </a>
        <a class="nav-item nav-link active" href="./index.html">Home</a>
        <a class="nav-item nav-link" href="./products.html">Products</a>
        <a class="nav-item nav-link" href="./quiz.html">Take the Quiz!</a>
        <a class="nav-item nav-link" href="./contact.html">Contact Us</a>
    </div>
</nav>
```

This snippet also shows the use of the CSS Frameworks by using classes, and shows the short amount of html that needs to be written that can produce a product that is at a presentable standard.

After that I looked into Materialize, which has a more relaxed feel to it, and managed to recreate the homepage again, but with this framework.

The product:

![Danko Homepage Materialize](/pictures/DankoMat.png)

The navbar snippet differs from the bootstrap version as it uses different classes and is quite a bit more simple. It was written as follows:

```html
<nav>
    <div class="nav-wrapper">
        <a href="./index.html" class="right brand-logo">Danko&reg;</a>
        <ul id="nav-mobile" class="left">
            <li><a class="nav" href="./index.html">Home</a></li>
            <li><a href="./products.html">Products</a></li>
            <li><a href="./quiz.html">Take the Quiz!</a></li>
            <li><a href="./contact.html">Contact Us</a></li>
        </ul>
    </div>
</nav>
```

Finally came Tailwind. Tailwind differs significantly from the other two frameworks but also is very similar. Tailwind offers a greater variety of options to choose from as it gives you components that have a lot more flexibility. While in Bootstrap you might have had to use a card and modify it with other classes, in Tailwind you have to create the card yourself and each component within it. There are a few components that Materialize and Bootstrap have that Tailwind doesn't, but the possibilities are there nonetheless.

The Tailwind version of the page looks a lot different but also required a bit more code to create:

![Danko Hompage Tailwind](/pictures/DankoTail.png)

The code:

```html
<div class="inline-block h-min min-w-full align-middle text-white bg-black">
    <a class="float-left mx-auto" href="../AI_1/index.html">
        <img class="object-contain h-12 w-30" src="./assets/logo.png" alt="DANKO logo - The store">
        </a>
    <a class="float-left h-full p-2 border-4 border-black hover:border-gray-700 hover:border-dashed" href="./index.html">Home</a>
    <a class="float-left h-full p-2 border-4 border-black hover:border-gray-700 hover:border-dashed" href="./products.html">Products</a>
    <a class="float-left h-full p-2 border-4 border-black hover:border-gray-700 hover:border-dashed" href="./quiz.html">Take the Quiz!</a>
    <a class="float-left h-full p-2 border-4 border-black hover:border-gray-700 hover:border-dashed" href="./contact.html">Contact Us</a>
</div>
```

Looking back over the week I was pretty happy with my basic understanding of the 3 frameworks. My hope in next week is to look further into the applications of the frameworks and even recreate a webpage or just create a whole new one using the frameworks that looks presentable. 

The week ran by well and I used my time effectively to get through each of the CSS frameworks. I was able to push through and recreate each page using each library and then continue to do some explorations of them on my own. Overall I have enjoyed the week and getting to know these libraries as I hadn't understood what they were or how to use them previously. I'm glad that I know of them now, though, as it will hopefully improve the pages that I create in further projects, and bump my confidence in Web Dev.