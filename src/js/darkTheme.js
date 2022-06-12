btn = document.querySelector(".dark-theme-btn");
darkIcon = document.querySelector(".dark-icon");
lightIcon = document.querySelector(".light-icon");
body = document.body;

if (localStorage.getItem("current-theme") == "dark") {
    lightIcon.classList.remove("invisible");
    darkIcon.classList.add("invisible");
    body.classList.add("dark");
}

btn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
        // go to light
        lightIcon.classList.add("invisible");
        darkIcon.classList.remove("invisible");
        
        body.classList.remove("dark");
        localStorage.setItem("current-theme", "light")
        
    } else {
        // go to dark
        lightIcon.classList.remove("invisible");
        darkIcon.classList.add("invisible");
        
        body.classList.add("dark");
        localStorage.setItem("current-theme", "dark")
    }
});
