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
    - Profile UI (5 hrs)
    -Add book(2 hrs)
    - upload api (8 hrs)

  - Things to be done next week:
    - make all api from lastweek work properly (6 hrs)
    -link to database (3 hrs)
    -complete profile functionality (6 hrs)

  - Commits:
    - https://github.com/960ptou/CS375-Final-Project/commit/919cf8e3cda0770134725606595c4de035531302
    -https://github.com/960ptou/CS375-Final-Project/commit/f2595b71ae8a4f2bed61f0d4efbb706d5788c937
    - https://github.com/960ptou/CS375-Final-Project/commit/407fb4c271afa3327d3b09311d0b7fa2d6991b99

- Weijie
  - Things Completed last week
    - Fill up the database with some data for testing and image for cover (private books ...) -> (5hrs)
      - nothing much to say here... I was trying to be creative with some AI image, took longer than expect and found nothing... (I don't want faces as my book cover)
    - Main page interaction for search (1hr)
      - Not planned, but I did the search so I just do that to display..
    - search on genre, name, ~blur search? (2hrs)
      - Needs a extension for postgres, the coding part wasn't hard.
  
  - Things to be done next week (want to save a week for testing):
    - the private I/O
      - reading private book (prevent other people from reading) ~ 2hrs
      - removing private books (if they have a public book they can't remove it-> I hate that) ~ 2hrs
    - user option - background | font | color (with localstorage to long term) ~2hrs
    - cleaning up (since I want to finish it) ~ 3-4hrs
    - 
  - Commits:
    - [Adding search in main + main page displaying book links](https://github.com/960ptou/CS375-Final-Project/commit/72a4cafc9438b9d2e62511bc6cac9d3ee9b7b944)
      - [the above is split into 2 -> this is the minor one](https://github.com/960ptou/CS375-Final-Project/commit/e8c0e1219eb0d6d43a88d29177e70d37ec56bc4f)
    - [adding script for filling up database book+user info](https://github.com/960ptou/CS375-Final-Project/commit/623b71940824232a24514ff982338b74c90042a2)

#### 3. Logisitical or technical obstacles
- Weijie Chen
  - was actually quick simple after finding the extension for fuzzy search

- Adesewa Adesida
  - I'm locked out of my main postgres account so I have trouble loading our project for testing
  - having trouble linking the new upload to the database because it is very specific form of input
  -drag and drop clicks and drags but does not open
  


#### 4.Reflection
- So the reading part of the code is done (90% need some styling for UI), there's the upload book, private delete, reading private books.. 

- (sewa) Need to do more research into linking files to database, adding and deletion etc


#### 5. question for professors
- (weijie) -> I have 2 route, "cred" and "search", for private search I need a dictionary (for cookie session) from the credientialRoute.js in the searchRoute.js. (-> I don't want to store session in database..)

- is there a way we can specifically collect folders in our upload api

