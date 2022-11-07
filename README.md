# CS375-Final-Project

##Template

https://www.figma.com/file/nJrHOSYPBl8C7SFzxBh3N7/groupB?node-id=0%3A1

### Run instruction
```bash
# by default you will run "npm run" but for since db doesn't exist;
# create a env.json that looks like
Replace the username and password; keep the other ones.
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
bash ./dummy_setup/refreshdb.bash
npm run start
# for testing adding a user
bash ./dummy_setup/testUser.bash # adds a user "test" with pass "test"
# Then you will need to login into the site to login
"http://localhost:3000/login"
# You can't find a cookie, but in the broswer console do, you will see that if you are logged in.
'fetch("/cred/loggedin").then((response) => {console.log(response)})'
```

## Group Members:
<table>
<thead>
	<tr><th>Adesewa Adesida</th><th>Weijie Chen</th></tr>
</thead>
</table>




# free-ebook.
```
# Format
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

- dir (bookid-title)
    - volume 1
        - 1-arc.txt
        - ...
    - volume 2
    - volume 3
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
        <tr><td>Page for login</td>                 <td>No</td> </tr>
        <tr><td>Page for sign up</td>               <td>No</td> </tr>
        <tr><td>Page-Book display(reader page)</td> <td>No</td> </tr>
        <tr><td>Database</td>                       <td>No</td> </tr>
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
