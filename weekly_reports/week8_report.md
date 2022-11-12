## 1. "Group B" = Members:  
<table>
<thead>
	<tr><th>Adesewa Adesida</th><th>Weijie Chen</th></tr>
</thead>
</table>

##### [ProjectLink](https://github.com/960ptou/CS375-Final-Project)

#### 2 Nextweek.
- Adesewa
  - Things Completed last week
    -  find 10~20 text file for testing (42min)
      - I got 15 text files from an online website & divided their chapters into different folders.
    - adding a page for uploading files (book) using drag & drop (3hrs)
      - Took longer than expected to understand the idea of uploading, but the actual drag & drop didn't take as long.
    - doing the profile page & redirect from login (3hrs)
      - Having trouble connecting to the login.

  - Things to be done next week:
    - Profile search for books in profile (2hrs)
    - UI for the uploading of books (4hrs)

  - Commits:
    - 

- Weijie
  - Things Completed last week
    - decide formats for storing text in local 
      - (2hrs planned 2hrs, needed to test things out with running the server.. took longer than expected but very important)
    - Parsing files into html, allowing navigation to different vol, arcs..
      - (6hrs planned 3hrs, on the server side I just sent the txt file, but client side is the issue)
      - I suppose I just needed to have that done with adding the parsing.
      - But now it has some basic formatting & allows going to different volumes | arcs properly.
    - Created the page for nagivation between all the arcs of the book (3hrs)
      - Wasn't actually planned, but needed to navigation on the pages..
  
  - Things to be done next week:
    - Fill up the database with some data for testing and image for cover (private books ...) -> (5hrs including testing)
    - search on genre, name, ~blur search? (3hrs)
  - Commits:
    - [adding book volumes page](https://github.com/960ptou/CS375-Final-Project/commit/39328aa608e82cdd35824eefbbbc751975cbea84)
    - [styling and dynamic redirecting of the arc pages](https://github.com/960ptou/CS375-Final-Project/commit/1a2558b24904a8853583ec0304df0b411e120a95)
      - [minor Python script to add fake books(via faker)](https://github.com/960ptou/CS375-Final-Project/commit/299380dbb0e9c083c5b4f988e4b6f193cb959033)
  

#### 3. Logisitical or technical obstacles
- Weijie Chen
  - Trying to combine async functions w/ normal functions (for now I just used the sync way to read files)

- Adesewa Adesida
  - Trying to combine the upload to the databases.


#### 4.Reflection
- The main things to work on is the main page & the user page for uploading ... Once those are done, we can just work on auth and other additional stuff.


#### 5. question for professors
- (weijie) I'm trying to parse the directory in a async way, but b/c the directory has 2 layers, I can't think of a way that works. - book -> volume -> (arcs..)
