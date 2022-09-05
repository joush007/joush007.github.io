# Random Sampling
## Data Science
### 05/09/2022

I don't have as much to write about in Data Science as I do in Web Dev this week, as I spent a majority of the time I had working on the updating of the blog website, but I did spend time on understanding random sampling.

If you don't know, random sampling is a method of taking a large amount of data and sampling only a small portion of it to reduce existing bias to ensure an equal chance of selecting any data point which will provide a more accurate data selection.

There are multiple different types of random sampling techniques, including Simple Random Sampling,Stratified Random Sampling, Cluster Random Sampling and Systematic Random Sampling. These each have their pros and cons and can be used in different situations that would fit different needs.

### Simple Random Sampling
Simple random sampling is done by generating numbers to choose a sample of the data. For example, if you have a dataset of all members of a population, you're able to take each person randomly and assign it a number (usually sequential) and then sample the first *n* numbers from the dataset.

This could in theory remove almost all bias from a dataset but also have the chance to strengthen bias in a dataset depending on the sample selected.

### Stratified Random Sampling
Stratified sampling seperates the dataset into groups by similar attributes and then randomly samples a certain amount of entries from each group. This method ensures that every group is equally represented to claim minimal bias.

### Cluster Random Sampling
Cluster sampling takes a dataset and seperates it out into clusters that represent the entire dataset (It takes the distribution of certain populations of groups and processes them in smaller clusters). This sampling method then takes samples from each cluster to provides an even distribution of each certain attribute and then randomly sample them

### Systematic Random Sampling
Systematic sampling is quite similar to simple sampling when you think about it, but instead of choosing random entries, you choose each entries in intervals. For example if you have a population dataset showing a certain amount of people, you can define the length of the dataset and the amount of entries you want to choose and then it will find which entries you'll use. (e.g. length = 100 entries, choosing 10 entries, you selecty every 10th entry -> 100/10 = 10)

---

The use of the random library in python is very useful here as it has built in methods to randomly select and sort different arrays to get a (mostly) reliable data selection, which is useful to process large datasets.

In hindsight, there was a lot more I probably could have worked on in class that would have benefitted my understanding of Random Sampling, and although I do have a decent understanding of the concepts, I could have had a greater understanding if I put in more time. The fact that I was asking questions in class was critical in ensuring that I knew what was being talked about and that I would be able to apply it in future cases. My focus at the moment is to not get too sidetracked by other projects unless they have a good reason, for example updating this page, which I though was decently important to me. I will make sure that I continue focusing on what is being taught in the class, and possibly looking into some online resources for different things that would be useful that might not be explicitly talked about in this course.