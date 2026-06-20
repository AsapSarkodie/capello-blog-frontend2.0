//toggle nav dropbox
let poemInfo = document.querySelector(".poem-info");
let nothingImg = document.querySelector("#poem-info-img");
let dropbox = document.querySelector(".dropdown-box");
let menu = document.querySelector("#menu");

const toggle = () => {
  if (menu.src.includes("ham.png")) {
    menu.src = "images/close.png";
  } else {
    menu.src = "images/ham.png";
  }

  dropbox.classList.toggle("toggle");
};

menu.addEventListener("click", toggle);

//load poems
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const result = await fetch(
      `https://58xknscq-5000.uks1.devtunnels.ms/poems`,
    );
    const data = await result.json();
    console.log(data);
    if (data.length === 0) {
      poemInfo.textContent = "No poems currently";
    } else {
      data.forEach((card) => {
        let poemContainer = document.querySelector(".poem-box");
        let poemCard = document.createElement("div");
        let title = document.createElement("h2");
        let content = document.createElement("p");
        let image = document.createElement("img");
        let con = document.createElement("div");
        let category = document.createElement("p");
        title.textContent = card.title;
        title.classList.add("title-r");
        content.textContent = card.content;
        content.classList.add("content-r");
        category.textContent = `category: ${card.categories}`;
        category.classList.add("category-r");
        image.src = `https://58xknscq-5000.uks1.devtunnels.ms/${card.image_path}`;
        image.classList.add("recent-img");
        con.classList.add("conn");
        con.append(image);
        poemCard.classList.add("card");
        poemCard.append(con, title, content, category);
        poemContainer.append(poemCard);
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//filter through poems based on their category

const filterBtn = document.querySelectorAll("#filter-btn");
const poemContainer = document.querySelector(".poem-box");
filterBtn.forEach((btn) => {
  btn.addEventListener("click", async () => {
    filterBtn.forEach((btn) => {
      btn.classList.remove("active-btn");
    });
    btn.classList.add("active-btn");

    try {
      const category = btn.textContent;
      const filter = await fetch(
        `https://58xknscq-5000.uks1.devtunnels.ms/poems/filter/${category}`,
      );
      const data = await filter.json();
      if (data.length === 0) {
        poemInfo.textContent = "Not Available";
        nothingImg.src =
          "images/DrawKit Vector Illustration Mental Health & Psychology (8).png";
        nothingImg.classList.add("n-img");
        poemContainer.innerHTML = "";

        return;
      } else {
        poemContainer.innerHTML = "";
        poemInfo.textContent = null;
        nothingImg.src = "";
        data.forEach((card) => {
          let poemCard = document.createElement("div");
          let title = document.createElement("h2");
          let content = document.createElement("p");
          let image = document.createElement("img");
          let con = document.createElement("div");
          let category = document.createElement("p");
          title.textContent = card.title;
          title.classList.add("title-r");
          content.textContent = card.content;
          content.classList.add("content-r");
          category.textContent = `category: ${card.categories}`;
          category.classList.add("category-r");
          image.src = `https://58xknscq-5000.uks1.devtunnels.ms/${card.image_path}`;
          image.classList.add("recent-img");
          con.classList.add("conn");
          con.append(image);
          poemCard.classList.add("card");
          poemCard.append(con, title, content, category);
          poemContainer.append(poemCard);
        });
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });
});
