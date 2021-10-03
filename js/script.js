//This div is where my profile information will appear
const overview = document.querySelector(".overview");
const username = "amberlehua";
const display = document.querySelector(".repo-list")

const gitUserInfo = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayInfo(data)
};

gitUserInfo()

const displayInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add = ("user-info");
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
    display.append(repoItem);
  }
};