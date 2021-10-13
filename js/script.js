//This div is where my profile information will appear
const overview = document.querySelector(".overview");
const username = "amberlehua";
const repoList = document.querySelector(".repo-list");
const repoInfoDisplay = document.querySelector(".repos");
const repoDataDisplay = document.querySelector(".repo-data");



const gitUserInfo = async function () {
  const userInfo = await fetch (`https://api.github.com/users/${username}`);
   const data = await userInfo.json();
   displayInfo(data)
};

gitUserInfo()

const displayInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
    `;
    overview.append(div);
    gitRepoInfo();
};

const gitRepoInfo = async function () {
  const repoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`)
  const repoData = await repoInfo.json();
  repoDisplay(repoData);
};

const repoDisplay = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(repoItem);
  }
};

// At the bottom of your code, create an event listener called repoList for a click event on the unordered list 
//  with a class of “repo-list.” Pass the event (e) in the callback function. 

repoList.addEventListener ("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchInfo.json();
 
  //Grab languages
  const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`)
  const languageData = await fetchLanguages.json();

  //Make a list of languages
  const languages = [];
  for (let language in languageData) {
    languages.push(language);
  }

  displayRepoInfo(repoInfo,languages);
};

  const displayRepoInfo = function (repoInfo, languages) {
    repoDataDisplay.innerHTML = ""
    repoDataDisplay.classList.remove("hide");
    repoInfoDisplay.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML =   `
      <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
  repoDataDisplay.append(div);
};