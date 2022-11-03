// modified from execerise.
let result = document.getElementById("result");

document.getElementById("login").addEventListener("click", () => {
	fetch("/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			username: document.getElementById("username").value,
			userpass: document.getElementById("password").value,
		})
	}).then((response) => {
		if (response.status === 200) {
			result.textContent = "Login successful";
			result.classList.remove("error");
		} else {
            response.json().then((error) => {
                result.textContent = error.error;
			    result.classList.add("error");
            })
		}
	});
});