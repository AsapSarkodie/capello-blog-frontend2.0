//toggle nav dropbox
let dropbox = document.querySelector(".dropdown-box");
let menu = document.querySelector("#menu");
let btn = document.querySelector("#submit-btn");

const toggle = () => {
  if (menu.src.includes("menu.png")) {
    menu.src = "../images/close.png";
  } else {
    menu.src = "../images/menu.png";
  }

  dropbox.classList.toggle("toggle");
};

menu.addEventListener("click", toggle);

//upload Poem
const form = document.querySelector("form");
let titleInput = document.querySelector("#title");
let contentInput = document.querySelector("#content");
let imageInput = document.querySelector("#file");
let categoryInput = document.querySelector("#select");
let statusP = document.querySelector(".status");
//loader
let loaderContainer = document.querySelector(".loader-con");
let loader = document.getElementById("loader");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  btn.disabled = true;

  //get the data from the input
  const poemData = new FormData();

  poemData.append("title", titleInput.value);
  poemData.append("content", contentInput.value);
  poemData.append("image", imageInput.files[0]);
  poemData.append("category", categoryInput.value);
  let title = poemData.get("title");
  let content = poemData.get("content");
  let image = poemData.get("image");
  let category = poemData.get("category");

  !title && !category && !content && !image
    ? loaderContainer.classList.remove("on")
    : loaderContainer.classList.add("on");

  try {
    if (!title && !category && !content && !image) {
      statusP.textContent = "missing fields";
      statusP.style.color = "red";
    } else {
      const response = await fetch(
        `https://58xknscq-5000.uks1.devtunnels.ms/poems`,
        {
          method: "POST",
          body: poemData,
        },
      );

      if (response.ok) {
        loaderContainer.classList.remove("on");
        alert("upload successful");
        statusP.textContent = "upload successful";
        statusP.style.color = "green";
        setTimeout(() => {
          statusP.textContent = "";
        }, 2000);
      }

      const data = await response.json();
      console.log(data);
      form.reset();
      if (data.error === "MISSING_FIELDS") {
        loaderContainer.classList.remove("on");
        alert("Missing fields");
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    btn.disabled = false;
  }
});
