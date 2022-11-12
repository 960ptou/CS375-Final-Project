# CS375-Final-Project


#### [Template](https://www.figma.com/file/nJrHOSYPBl8C7SFzxBh3N7/groupB?node-id=0%3A1)


### Run instruction
```bash
# by default you will run "npm run" but for since db doesn't exist;
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
# in the project directory
bash ./dummy_setup/refreshdb.bash # refresh the db

# to add some book -> there are 2 options at this point (connection between user & book are not current set)

# so just adding the books to the 'books' folder will do it.
# option 1 script (generate random txt via Faker)
pip install -r dummy_setup/requirements.txt
# then to generate some random content books
python dummy_setup/makeDummybooks.py N # N is the number of random books to generate

# option 2 
# first, make a directory called books in the same place as root
# download https://drive.google.com/drive/folders/1iyjwiT2JEcub1a-WFCVo-FsfX37N-Csu?usp=sharing (a fake book generated via faker) -> put that in the books folder

# start server
npm run start

# to see that book, please go to 
`http://localhost:3000/book/BOOKID/volumes`
# BOOKID is the long number in the books folder
- books
    - 12345678 # go to http://localhost:3000/book/12345678/volumes to see it.
    - ...
# The looks in there are the arc contents.

# for testing adding a user
bash ./dummy_setup/testUser.bash # adds a user "test" with pass "test"
# Then you will need to login into the site to login
"http://localhost:3000/login.html"
# You can't find a cookie, but in the broswer console do, you will see that if you are logged in.
'fetch("/cred/loggedin").then((response) => {console.log(response)})'
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
        "arc1" : [files... sorted],
        "arc2" : [files... sorted]
    ]

}
```
# Book storage format (currently only txt, will add cover image)
```
- books
    - dir (represented by a bookid)
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
        <tr><td>Allowing user to add folder</td>    <td>No</td></tr>
        <tr><td>Home Page</td>                      <td>No</td> </tr>
        <tr><td>Page for login</td>                 <td>Yes</td> </tr>
        <tr><td>Page for sign up</td>               <td>Yes</td> </tr>
        <tr><td>Page-Book display(reader page)</td> <td>Yes</td> </tr>
        <tr><td>Database</td>                       <td>Yes</td> </tr>
        <tr><td>Reading list</td>                   <td>No</td> </tr>
        <tr><td>Stay Login(cookies)</td>            <td>Yes</td> </tr>
        <tr><td>Search (author, genre?,title)</td>  <td>No</td> </tr>
        <tr><td>User option formatting(fonts,size, spacing, profile color)</td> <td>No</td> </tr>
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
