// modified from execerise.

let result = document.getElementById("result");

document.getElementById("create").addEventListener("click", ()=>{
    let username = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    fetch("/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: username,
			userpass: pass,
		})
	}).then((response) => {
        console.log(response);
		if (response.status === 200) {
			result.textContent = "Account was created";
			result.classList.remove("error");
		} else {
            response.json().then((error) => {
                result.textContent = error.error;
			    result.classList.add("error");
            })
		}
    })
})