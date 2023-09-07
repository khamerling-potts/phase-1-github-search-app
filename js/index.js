//Github API configuration object for GET fetch requests
const configObj = {
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
};

//creating variables for commonly used elements
const toggle = document.getElementById("toggleSearch");
const searchBar = document.getElementById("search");

//toggling search users vs repo
toggle.addEventListener("click", (event) => {
  if (toggle.className === "userSearch") {
    toggle.className = "repoSearch";
    searchBar.placeholder = "Searching repos...";
    toggle.innerText = "Search Users";
  } else {
    toggle.className = "userSearch";
    searchBar.placeholder = "Searching users...";
    toggle.innerText = "Search Repos";
  }
});

//calls respective search function when a search was submitted
document.getElementById("github-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (toggle.className === "userSearch") {
    searchUser(event);
  } else {
    searchRepo(event);
  }
});

//Searches for users and displays them in user list
function searchUser(event) {
  const name = searchBar.value;
  fetch(`https://api.github.com/search/users?q=${name}`, configObj)
    .then((res) => res.json())
    .then((data) => data.items.forEach(appendUser));
}

//Displays a user in the user list
function appendUser(user) {
  console.log(user);
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = user["avatar_url"];
  console.log(img.src);
  const name = document.createElement("p");
  name.addEventListener("click", userRepos);
  name.innerText = user.login;
  const profileURL = document.createElement("p");
  profileURL.innerText = user["html_url"];

  li.append(img, name, profileURL);
  document.getElementById("user-list").appendChild(li);
}

//Fetches a users repo when clicking on their username
function userRepos(event) {
  fetch(`https://api.github.com/users/${event.target.innerText}/repos`)
    .then((res) => res.json())
    .then((data) => data.forEach(addRepo));
}

//Adds a repo name to the repo list
function addRepo(repo) {
  const li = document.createElement("li");
  li.innerText = repo["full_name"];
  document.getElementById("repos-list").appendChild(li);
}

//Searches for repos based on keyword and displays them in the repo list
function searchRepo(event) {
  const keyword = searchBar.value;
  console.log(keyword);
  fetch(`https://api.github.com/search/repositories?q=${keyword}`, configObj)
    .then((res) => res.json())
    .then((data) => data.items.forEach(addRepo));
}
