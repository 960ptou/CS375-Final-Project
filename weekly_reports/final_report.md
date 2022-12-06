## 1. "Group B" = Members:  
<table>
<thead>
	<tr><th>Adesewa Adesida</th><th>Weijie Chen</th></tr>
</thead>
</table>

##### 2 [ProjectLink](https://github.com/960ptou/CS375-Final-Project)


##### 3. The contract
1. Ability to upload ebooks and have them processed into styled html
- YES, the user can upload a folder of a book with format stated in the README, they need to sign up in order to upload their book to the server! The styled html is understood differently, we don't have way to bold or italicize words as the book data source we have doesn't require them, but overall the user can choose their style while reading.

2. Search through ebooks by author (title search)
- YES, the user can search through books by author, bookname (these 2 support blur search), bookid or genre. The user only have to type in the search bar, the server will interpret what the user is trying to search by.

3. Reader mode(view ebook and set the styling)
- YES, the user can find the styling option by clicking anywhere in the reading page while having a book open, their preference will be stored so they will see the same styling while on the reading pages. (on the book.html, click on the center of the page, you will see a bar showing on top of you page, by default it's hidden to not be annoying).

4. Create accounts and save books to public library and delete from personal account
- YES, a bit different. They can upload book in option of "private" or "public" if they upload using private, they are the only person that can read it and delete it. If they are uploading public, they won't be able to delete it (because I don't want "suddenly can't read" to happen -> as I'm making the rules)

5. Only an uploader should be able to delete a book from their current account but they can delete it from their profile
- I think this is also mentioned on the 4th agreement, so YES, only the uploader can delete their book.

##### 4.
### Adesewa Adesida
-  Week6 [commit](https://github.com/960ptou/CS375-Final-Project/commit/71ab8ba3b62690ac9112b06dc91b23b786076611)
  - Estimates 
    - I created the prototype using figma (2-3 hrs)
    - I created all the html of the  main page and linked it to the login and signup creating the side bar and the hover highlight
    - I added some parts to the database
    - I started on the search functionality

- Actual
  - Yes the prototype actually took about 2-3 hrs to create if not more because I started off watching youtube videos on how to do figma's widget to html functionality, it was taking alot of time so i just ended up doing it regularly which is what you see. (2 hrs)
  - Actually coding the html probably took like two hours because of bugs but positioning and design where like another hour (3 hrs)
  - I didn't add much to the database so (5 minutes)
  - The search functionality  because of my issues with postgres , I spent like an extra hour trying to figure that out (2hrs)

- Week7 [commit](https://github.com/960ptou/CS375-Final-Project/commit/44105f6efe01b62eee519653e589fb936d60db3c)
  - Estimates
    - find 10~20 text file for testing (30min)
    - adding a page for uploading files (book) using drag & drop (3hrs)
    - doing the profile page & redirect from login (3hrs)

  - Actual
    - find 10~20 text file for testing, I got 15 text files from an online website & divided their chapters into different folders. (42min)
    - adding  uploading files (book) using drag & drop (couldn't get it to work properly, so this isnt even the total time, Took longer than expected to understand the idea of uploading, but the actual drag & drop didn't take as long.) (3hrs)
    - doing the profile page & redirect from login, Having trouble connecting to the login. The html for the profile page probably took like an hour the rest was creating the logout functionality redirect etc (3hrs)


- Week8  [commits](https://github.com/960ptou/CS375-Final-Project/commit/f2595b71ae8a4f2bed61f0d4efbb706d5788c937)
- [and](https://github.com/960ptou/CS375-Final-Project/commit/407fb4c271afa3327d3b09311d0b7fa2d6991b99)
  - Estimates
    - Profile search for books in profile (2hrs)
    - UI for the uploading of books (4hrs)

  - Actual 
    - Profile UI, so I started on the profile search functionality (Weijie ended up making this better, then it would display some of the books), then we were also trying to do an edit profile thing then so I had to watch vidoes on how to allow the users upload a profile picture to the database etc, the logout and other buttons worked (we ended up scrapping thiz) (5 hrs) 
    - Add book, basically just a redirect but this also includes the functionality for the add book(2 hrs)  
    - upload api, the drag and drop took alot of my time because I was still having issues with postgres then so it was hard to test plus even though the page would collect it it was not storing it, (Weijie ended up helping with this but I did spend alot of  time on it) (8 hrs)

- Week9 [commits](https://github.com/960ptou/CS375-Final-Project/commit/919cf8e3cda0770134725606595c4de035531302)
  - Estimates
    - make all api from lastweek work properly (6 hrs)
    - link to database (3 hrs)
    - complete profile functionality (6 hrs)

  - Actual
    - Everything worked well now with my teammates help so (2 hrs)
    - I linked to database (2 hrs)
    -  The profile functionality here was about cookies and user data ( 3hrs)


- Week11 [commits](https://github.com/960ptou/CS375-Final-Project/commit/07bd5a17f8315a33826478c5fc8b0d12985b7817)
  - Estimates
    - Bug Fixes (2 hrs)
    - Website Styling (1 hr)

  - Actual
    -   We were done with all our main functionality so it was really just touchups and testing so (3 hrs)
### Weijie Chen
- Week7
  - Estimates:
    - Getting the user login to work and allow the user to stay logged in via cookie (1-2hrs)
    - Create some queries to do database IO (1hr)
    - Set up the login/sign up page (2hr)
    - Prepare the database for the books (1-3hr)
  - Actual:
    - Getting user login & signup to work with database (5hours)    
    - create some queries/scripts for cmd test (40min)
    - Set up the login/sign up page (30min)
    - Creating the database with ER model (2hours)
- Week8
  - Estimates:
    - decide formats for storing text in local (1hr)
    - upload books (sort, store) (3hrs)
    - parsing file into html ( client side rendering) (3hrs)
  - Actual:
    - decide formats for storing text in local 
      - (2hrs planned 1hr, needed to test things out with running the server.. took longer than expected but very important)
    - Parsing files into html, allowing navigation to different vol, arcs..
      - (6hrs planned 3hrs, on the server side I just sent the txt file, but client side is the issue)
    - Created the page for nagivation between all the arcs of the book (3hrs)
- Week9
  - Estimates:
    - Fill up the database with some data for testing and image for cover (private books ...) -> (5hrs including testing)
    - search on genre, name, ~blur search? (3hrs)
  - Actual:
    - Fill up the database with some data for testing and image for cover (private books ...) -> (5hrs)
    - Main page interaction for search (1hr)
    - search on genre, name, ~blur search? (2hrs)
- Week11
  - Estimates:
    - the private I/O
      - reading private book (prevent other people from reading) ~ 2hrs
      - removing private books (if they have a public book they can't remove it-> I hate that) ~ 2hrs
    - user option - background | font | color (with localstorage to long term) ~2hrs
    - cleaning up (since I want to finish it) ~ 3-4hrs
  - Actual:
    - Private read -> (2hrs)
    - Private delete -> (1hr)
    - Upload -> (6hrs)
    - Cleaning -> (4hrs)
    - Bug fix (3hrs)
- Major commits
  - [login/signup cookie for session](https://github.com/960ptou/CS375-Final-Project/commit/3a2059b47137a7af3a1d9bb56cb524bafb177fc0)
  - [adding book volumes page](https://github.com/960ptou/CS375-Final-Project/commit/39328aa608e82cdd35824eefbbbc751975cbea84)
  - [Adding search in main + main page displaying book links](https://github.com/960ptou/CS375-Final-Project/commit/72a4cafc9438b9d2e62511bc6cac9d3ee9b7b944)
  - [Upload book](https://github.com/960ptou/CS375-Final-Project/commit/e12d7acb18adff7b9bfd2ab04326751b5546c4e8)
  - [Delete book](https://github.com/960ptou/CS375-Final-Project/commit/58c4a59ad5675925f76284a8d161144ceaba49ad)

#### Q4-> Weijie Chen Reflection
- It appear I tend to underestimate the time I need for most things, but mostly on thing I don't have any knowledge of previously, like cookies, middleware and uploading. Another thing that I basically didn't do well is in planning what work I should be working on, often if not most of the time if I want to do A, B is normally required and I didn't notice that so a lot of time was spent on doing things not on the plan and sometimes unable to complete according to the plan. 
- Another thing is the time spent on planning for things, like what structure should we use and what format to use, the time shown above I will say is 90% not true, because I don't count time where I just set on the subway and think about what I should do for things like database design and other structure things and even now I don't know how much time I spent doing them.
- While I don't have a good estimate on how much time spent thinking about the structure, for the coding part at max I spent more than 3hours but for general cases were 30min-1hour.

### Q4 -> Adesewa Adesida Reflection
- This project pushed me alot and it even helped me realize  some of the mistakes I had been making in my past assignments
- Having a team member that is also very experienced was very helpful because most of the time if I had an issue i can ask and it made things easier
- I gained alot of new skills and I am happy with our product, the backend definitely took the most time, in hindsight I would focus entirely on the backend first because bugs were annoying.
- Actual times we put into this projec cannot actually be known because there was also some stuff I added I ended up scrapping



##### 5 - suppose we are going by opinion..
- Weijie
  - The upload part in the server and client side.
    - In the server side there's a huge chain of nested promises for the user to upload, it does insert into database, separate files into directory, sorting, session validation, likely the single biggest function i've wrote for this project. Likely the hardest and most important piece of code that needs to be rewrite once I learn to use async correctly. 
    - with both the server and client side, it's able to read Chinese (or other none ASCII I suppose) characters sent by formData which by default will be some garbage characters. But after hours of research, I come up with the idea to encode (encodeURI) in client and decode in server to allow those characters to be stored properly.

- Adesewa
 - I am most proud of the drag and drop api and how easily everytyhing is linked, I love that our website is cohesive which is what I was aiming for.



##### 6
- The upload method, currently to upload, the user has to send the whole book including cover image in one restricted format. I want to support different ways for the user to upload like volume by volume, but I was mostly concerned with speed at that point. If I picked the different method, it should make future expansion of upload and modify easier.
- On the logicistic side, outside of class we meet on some Fridays via Zoom and mostly communicate via text. While some issue related to using github (collision) didn't happen, we could used a different way to communicate our progress to make updates easier.
- I definitely feel more research ahead of time would have made things a bit smoother.