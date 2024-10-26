// scripts

const posts_api =
  "https://api.github.com/repos/ArunGovil/arungovil.github.io/contents/posts";

async function getPosts() {
  try {
    const response = await fetch(posts_api);
    const posts = await response.json();
    if (posts.length > 0) {
      const element = document.getElementById("posts");
      posts.forEach((post) => {
        const postItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = post.name;
        link.href = `${post.path}`;
        postItem.appendChild(link);
        element.appendChild(postItem);
      });
    }
  } catch (e) {
    console.error("Error fetching posts", e);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const page = window.location.pathname;

  if (page === "/" || "/posts") getPosts();
});
