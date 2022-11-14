let result = document.getElementById("result");
document.getElementById("search").addEventListener("click", () => {
    fetch("/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            search: document.getElementById("search").value,
        })
    }).then((response) => {
        if (response.status === 200) {
            result.textContent = "Search successful";
            result.classList.remove("error");
        } else {
            response.json().then((error) => {
                result.textContent = error.error;
                result.classList.add("error");
            })
        }
    }
    );
});