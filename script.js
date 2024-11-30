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
        if (post.name.endsWith(".md")) {
          const postItem = document.createElement("li");
          const link = document.createElement("a");
          link.textContent = post.name;
          link.href = `/${post.path}`;
          postItem.appendChild(link);
          element.appendChild(postItem);
        }
      });
    }
  } catch (e) {
    console.error("Error fetching posts", e);
  }
}

async function getPhotos() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const photos = await response.json();
    return photos;
  } catch (e) {
    console.error("Error fetching photos", e);
  }
}

function renderPhotos(toRender) {
  console.log("Rendering", toRender);
  if (toRender.length > 0) {
    const element = document.getElementById("gallery");
    toRender.forEach((photo) => {
      const photoItem = document.createElement("li");
      photoItem.classList.add("photo");
      const image = document.createElement("img");
      image.classList.add("image");
      image.src = photo.url;
      photoItem.appendChild(image);
      element.appendChild(photoItem);
    });
  }
}

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

async function handlePhotos() {
  const photos = await getPhotos();
  let toRender = photos.slice(0, 15);

  const observer = new IntersectionObserver((item) => {
    const isIntersecting = item[0].isIntersecting;
    if (isIntersecting) {
      const newItems = photos.slice(toRender.length, toRender.length + 15);
      toRender = [...toRender, ...newItems];
      renderPhotos(toRender);
      observer.observe(document.querySelector(".photo:last-child"));
    }
  }, options);

  renderPhotos(toRender, observer);
  observer.observe(document.querySelector(".photo:last-child"));
}

document.addEventListener("DOMContentLoaded", function () {
  const page = window.location.pathname;

  if (page === "/posts/") getPosts();
  if (page === "/photos/") handlePhotos();
});
