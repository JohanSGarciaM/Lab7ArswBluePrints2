//author JohanGarcia



const button = document.querySelector("button");


function getBlueprintsByAuthor(){
    const totalPoints = document.getElementById("totalPoints");
    const author = document.querySelector("#author-input").value
    document.getElementById("author").textContent = author
    totalPoints.textContent = "Total points is 0"
}