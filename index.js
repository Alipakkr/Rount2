const regenratebttn = document.getElementById("btn");
const jokegenrate = document.getElementsByClassName("dadjoke")[0];

const options = {
    method: "GET",
    headers: {
        "Accept": "application/json"
    },
};

const apiURL = "https://icanhazdadjoke.com/search?term=dad&limit=1";

async function getJoke() {
    try {
        jokegenrate.innerText = "Updating Please Wait....";
        regenratebttn.disabled = true;
        regenratebttn.innerText = "Please Searching From Api";
        const response = await fetch(apiURL, options);
        const data = await response.json();
        console.log(data)
        regenratebttn.disabled = false;
        regenratebttn.innerText = "Generate a  new joke";
        jokegenrate.innerText = data.results[0].joke;

    } catch (error) {
        jokegenrate.innerText = "Something Went Wrong ";
        regenratebttn.disabled = false;
        regenratebttn.innerText = "Generate a  new joke";
        console.log(error);
    }
}

regenratebttn.addEventListener("click", getJoke);
const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", saveToDatabase);
async function saveToDatabase() {
    const jokeText = jokegenrate.innerText;

    if (!jokeText || jokeText === "Updating Please Wait...." || jokeText === "Something Went Wrong ") {
        return;
    }
    try {
        const response = await fetch("/api/saveJoke", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                joke: jokeText,
            }),
        });
        const data = await response.json();
        if (data.success) {
            alert("Joke saved successfully!");
        } else {
            alert("Failed to save joke. Please try again.");
        }
    } catch (error) {
        console.error("Error saving joke to database:", error);
        alert("An error occurred while saving the joke. Please try again later.");
    }
}
