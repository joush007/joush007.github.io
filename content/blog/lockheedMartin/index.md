---
title: "Lockheed Martin CyberQuest"
date: 2023-03-06
tags: ["Web Development", "Cyber Security", "CTF"]
---

Before you say anything, yes I know this is meant for my web dev blogs, but I feel this was quite important for what I've been doing in class and outside of class to develop a greater understanding of using my problem solving and programming skills for a good purpose, so here's the blog:

Last week, I did something pretty awesome. A few mates and I decided to do the Lockheed Martin CyberQuest, a cyber security capture the flag (CTF) competition held by, you guessed it, Lockheed Martin. It was a competition against 4 other teams, as I'm assuming it's less known in Australia than America where there are a lot more people, that went on for 2 hours. We had prepared a bit for it in and out of class as seen in the blog 2 weeks ago and we were ready for it, but it held slightly different challenges than we were expecting.

## What did it cover?
There were a few different types of challenges in the CTF, but the main ones were:
- Web Exploits
- Forensics
- Stegonography
- Cryptography
- Reverse Engineering
- Binary Exploits
- Networking
(Or along the lines of, as they might have been a bit different)

## What did we do?
Well, we mainly focused on the networking challenges, as we had the most confidence in them (except for the 75 point question), but we did try a few of the other challenges. We managed to get pretty far with them, getting 25 points off the bat thanks to us doing the early bird challenges, and then we started off doing the others. The team worked really well together in the challenge with Hamish, Morgan, Michael, Sam and I all bringing a different skill set to the table. Morgan was the first to get any points on the table with a reverse-engineering question which I still don't understand but also didn't get enough time to look into. After that it was all uphill, a lot of questions with not enough time to get all of them done. If we wanted to win this, we had to divide and conquer, so that's what we did. We started by splitting off into different categories, but all ended up back in the Networking category working on different questions, I guess that worked though.

One of the questions that I did had to do with using windows prefetch files, if you don't know what those are, don't worry I didn't either, but they're pretty much files on your windows computer keeping track of how many times you've opened an application and other details such as when it was created, first opened and each time it was used. To complete each of these challenges I had to look into the data of the prefetch files and find some specific information. For this I found a tool called WinPrefetchView which was quite accurate up until getting the right dates, where it just couldn't read it correctly, but that's ok because I was able to use an app installed on the virtual machine supplied by LM to get the correct dates. If you'd like to try it yourself, download it below and try finding the date it was created and first opened as well as the last time it was opened and the number of times it was opened. If you need help, use google to find how to access prefetch files, it's a pretty interesting topic and skill to have, although not highly applicable depending on what you do.
{{< button href="./7ZFM.EXE-56DE4F9A.pf">}}
Prefetch File
{{< /button >}}

## What did we learn?
Well, the competition taught me a lot, such as the fact that I know less than I initially thought I did, but also that I need to learn more concepts and topics to make sure I can answer more questions with ease, therefore I need to practice more and collaborate with more people to learn all the different tricks to learning cyber security well.

## How did we go?
So, we did the competition, divided and conquered, figured out a few new things, but how did we go overall? We were asking the same thing when it came back to the meeting in the zoom, but to our delight, Burgmann came 3rd, or at least one of our teams, that being the year 11s (I know I threw you off there). In second came Marist College with 80 points and in first was... **US** with 105 points, winning by 25 points, which is the equivalent to 5 easy questions or 2.5 hard questions, although we would have won by 30 points if I hadn't spent 5 on a clue that I ended up not solving. Either way, our team, the "Royal 🤨🤨 Tornado 2: The SQL" is now the 2023 Lockheed Martin CyberQuest Champions for Australia, and we're pretty proud of getting there. We'll be going into other competitions this year such as PECAN+ trying to get more experience and understanding of cyber security as well as trying to get another win in the bag.

## Conclusion
So, that's the blog for this week, I know it wasn't fully web dev related nor did I go through the whole process of how I did the questions nor all of the questions, but we still got a lot done this week, and I wanted to share at least the prefetch challenge with you if none else. I'll also link 2 others that I wasn't able to get in Stegonography, but I'll leave that for you to try if you want to, those being stego-pcap and John Snow. If you get them, let me know in the github repo, or let me know in person (if you ever find me). So as usual, I'll make sure I post next week too to keep you updated on what I'm doing for web dev, which is the same old, same old doing the mega tutorial, but I'll try to make it more interesting for you to read. Until then, have a good one!
{{< button href="./stego-pcap.zip">}}
stego-pcap
{{< /button >}}
{{< button href="./JohnSnowFull.zip">}}
John Snow
{{< /button >}}