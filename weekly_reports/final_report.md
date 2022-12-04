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
### Weijie Chen
- Week6
  - Estimates:
    - Getting the user login to work and allow the user to stay logged in via cookie (1-2hrs)
    - Create some queries to do database IO (1hr)
    - Set up the login/sign up page (2hr)
    - Prepare the database for the books (1-3hr)
  - Actual:
    - Getting user login & signup to work with database (5hours)    
    - Allow user to have cookie to stay logged in ( need to test via browser)
    - create some queries/scripts for cmd test (40min)
    - Set up the login/sign up page (30min)
    - Creating the database with ER model (2hours)
- Week7
  - Estimates:
    - decide formats for storing text in local (1hr)
    - upload books (sort, store) (3hrs)
    - parsing file into html ( client side rendering) (3hrs)
  - Actual:
    - decide formats for storing text in local 
      - (2hrs planned 1hr, needed to test things out with running the server.. took longer than expected but very important)
    - Parsing files into html, allowing navigation to different vol, arcs..
      - (6hrs planned 3hrs, on the server side I just sent the txt file, but client side is the issue)
      - I suppose I just needed to have that done with adding the parsing.
      - But now it has some basic formatting & allows going to different volumes | arcs properly.
    - Created the page for nagivation between all the arcs of the book (3hrs)
      - Wasn't actually planned, but needed to navigation on the pages.. 
- Week8
  - Estimates:
    - Fill up the database with some data for testing and image for cover (private books ...) -> (5hrs including testing)
    - search on genre, name, ~blur search? (3hrs)
  - Actual:
    - Fill up the database with some data for testing and image for cover (private books ...) -> (5hrs)
      - nothing much to say here... I was trying to be creative with some AI image, took longer than expect and found nothing... (I don't want faces as my book cover)
    - Main page interaction for search (1hr)
      - Not planned, but I did the search so I just do that to display..
    - search on genre, name, ~blur search? (2hrs)
      - Needs a extension for postgres, the coding part wasn't hard. 
- Week9
  - Estimates:
    - the private I/O
      - reading private book (prevent other people from reading) ~ 2hrs
      - removing private books (if they have a public book they can't remove it-> I hate that) ~ 2hrs
    - user option - background | font | color (with localstorage to long term) ~2hrs
    - cleaning up (since I want to finish it) ~ 3-4hrs
  - Actual:
    - Private read -> (2hrs)
      - wasn't that hard after knowing how to create middleware for the read
    - Private delete -> (1hr)
      - Since this is the only delete I allow, it's basically "delete", wasn't too hard
    - Upload -> (6hrs)
      - Pretty unexpected, I assumed that since client side is done, server should be easy, but the code actually stack up so much layers (should just learn to use async...). and another issue is characters, I needed to encode on client them and decode them on server to make sure different language characters don't come up as random characters.
    - Cleaning -> (4hrs)
      - More just UI/UX stuff, I don't really like front end so there's a lot of search.
    - Bug fix (3hrs)
      - an approximation, I just test around, find bug and debug them.
- Week11 -> nothing was planned, I just test around...
  - Estimates: NONE
  - Actual: NONE 

#### Q4-> Weijie Chen Reflection
- It appear I tend to underestimate the time I need for most things, but mostly on thing I don't have any knowledge of previously, like cookies, middleware and uploading. Another thing that I basically didn't do well is in planning what work I should be working on, often if not most of the time if I want to do A, B is normally required and I didn't notice that so a lot of time was spent on doing things not on the plan and sometimes unable to complete according to the plan. 
- Another thing is the time spent on planning for things, like what structure should we use and what format to use, the time shown above I will say is 90% not true, because I don't count time where I just set on the subway and think about what I should do for things like database design and other structure things and even now I don't know how much time I spent doing them.
- While I don't have a good estimate on how much time spent thinking about the structure, for the coding part at max I spent more than 3hours but for general cases were 30min-1hour.





##### 5, I suppose we are going by opinion..
- Weijie
  - The upload part in the server and client side.
    - In the server side there's a huge chain of nested promises for the user to upload, it does insert into database, separate files into directory, sorting, session validation, likely the single biggest function i've wrote for this project. Likely the hardest and most important piece of code that needs to be rewrite once I learn to use async correctly. 
    - with both the server and client side, it's able to read Chinese characters sent by formData which by default will be some garbage characters. But after hours of research, I come up with the idea to encode (encodeURI) in client and decode in server to allow those characters to be stored properly.


##### 6
- The upload method, currently to upload, the user has to send the whole book including cover image in one restricted format. I want to support different ways for the user to upload like volume by volume, but I was mostly concerned with speed at that point. If I picked the different method, it should make future expansion of upload and modify easier.
- On the logicistic side, outside of class we meet on some Fridays via Zoom and mostly communicate via text. While some issue related to using github (collision) didn't happen, we could used a different way to communicate our progress to make updates easier.