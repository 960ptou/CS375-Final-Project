# CS375-Final-Project


#### [Template](https://www.figma.com/file/nJrHOSYPBl8C7SFzxBh3N7/groupB?node-id=0%3A1)


#### Some notes:
```
Why do app.use(express.static( __dirname + "/../public/login")); for every file? Why not app.use(express.static( __dirname + ".../public")); ?

A: 2 parts
- I want to keep thing separated they won't need all to be within the public folder.
- from the first part, I also want the route to be simple, so no login/login.html...
```

# Requirements
- node.js
- python3
- postgres
- Linux|Macos -> for running the automated data filling

#### Quick show
<video src="assets/quickDemo.mp4" controls="controls" style="max-width: 730px;">
</video>

### Run instruction
```bash
# create a env.json that looks like
Replace the username and password (make sure account has proper crediential); keep the other ones.
'
{
    "user": "username",
    "host": "localhost",
    "database": "test",
    "password": "your password to db",
    "port": 5432
}
'
pip install -r dummy_setup/requirements.txt # please note, pip19.x might not work. -> update your pip
npm install

# in the project directory

# to add some book -> there are 2 options at this point (connection between user & book are not current set)

# so just adding the books to the 'books' folder will do it.
# option 1 script (generate random txt via Faker)
# then to generate some random content books
python dummy_setup/makeDummybooks.py N # N is the number of random books to generate

# run the follow to get cvs will generated data 
python dummy_setup/fillDatabaseFromBooks.py N # N > 0 is the number of random users to generate in the csv; not all users will hold a book, but all book with by held by a user 
bash dummy_setup/filldb.bash # puts the csv generated by script to the database

# OR just -> same stuff but easier
bash dummy_setup/refreshNload.bash N


# option 2 
# I've crawl some books from "https://www.gutenberg.org/"
# you can download them from "https://drive.google.com/file/d/1G4NSnKCIMymaZBU_fL-yy84qkdYkQVX1/view?usp=sharing" # but please note that some of the books are "empty" due to my poor scraping skills
# NOTE -> you the directory won't have the actual book name, you want to do it in the one by one method to allow that
# unzip the file and upload the each folder after you login. or 

# run this, after you put the folder books in the folder into the "./books" folder in the repo (create it first)
bash dummy_setup/refreshNload.bash N

# start server
npm run start

# At this point you can really just go to
"http://localhost:3000/", it will have some random books with images to links

# at this point it's more about the actual UI.
# For Readers, just click on any book on the main page, you can do search by genre, author, book id, book name
# Note, they are automatic, so if you type something like "fantasy", it will know you mean the genre
# book name in specific allows some degree of blur search, I.E. "bookname" can be found by "boname"

# For people who wants to upload here's few notes:
# You can upload book for PUBLIC and PRIVATE,
# You can ONLY DELETE PRIVATE book that YOU uploaded.
# if a book is decided to be private, then only YOU can read it.


# Instruction to UPLOAD:
# after login, you will be bring to your profile page, on the left there's a "add book" button,
# you will be redirected to a page for uploading your book
# please fill the required fields( author, book name,language , genres(up to 5, min 1),and whether you want it private or not).
# To upload a book, you need your folder structured and just drag that folder to the box.
# the structure should look like
- DIRECTORY
    - cover.png/jpg
    - Volume1 (please index this correctly)
        - arc1.txt
        - arc2.txt
    - volume2... 
# please note that the volume name will be used as the title for that volume, same for the arcs
```



## Group Members:
<table>
<thead>
	<tr><th>Adesewa Adesida</th><th>Weijie Chen</th></tr>
</thead>
</table>

# Format to upload
```
{
    "cover" : img...,
    "title" : title,
    "author" : author,
    "version" : language,
    "books" : [
        "/folder/cover.image" : content of the image (only 1)
        "/folder/volume/chapter.txt" : content of the txt
        "txts"....
    ]
}
```
# Book storage format (currently only txt, will add cover image)
```
- books
    - dir (represented by a bookid)
        - cover.png( or other image format )
        - 1-volume_name
            - 1-arc_name.txt
            - 2-arc_name.txt
            - ...
        - 2-volume_name
        - 3-volume_name
        - ...
```


## Features
<table>
	<thead>
		<tr><th>Features</th><th>Complete?</th></tr>
	</thead>
	<tbody>
        <tr><td>Allowing user to add folder</td>    <td>Yes</td></tr>
        <tr><td>Home Page</td>                      <td>Yes</td> </tr>
        <tr><td>Page for login</td>                 <td>Yes</td> </tr>
        <tr><td>Page for sign up</td>               <td>Yes</td> </tr>
        <tr><td>Page-Book display(reader page)</td> <td>Yes</td> </tr>
        <tr><td>Database</td>                       <td>Yes</td> </tr>
        <tr><td>Reading list</td>                   <td>Yes</td> </tr>
        <tr><td>Stay Login(cookies)</td>            <td>Yes</td> </tr>
        <tr><td>Search (author, genre?,title)</td>  <td>Yes</td> </tr>
        <tr><td>User option formatting(fonts,size, spacing, profile color)</td> <td>Yes</td> </tr>
    </tbody>
</table>

## Potential features
<table>
	<thead>
		<tr><th>Features</th><th>Complete?</th></tr>
	</thead>
	<tbody>
        <tr><td>Search hint? (Google)</td> <td>No</td></tr>
   </tbody>
</table>
