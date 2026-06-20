//toggle nav dropbox
let loaderContainer = document.querySelector(".loader-con");
let loader = document.getElementById("loader");
let header = document.querySelector("#home-page");
window.addEventListener("load", () => {
  loaderContainer.classList.add("off");
});
let dropbox = document.querySelector(".dropdown-box");
let menu = document.querySelector("#menu");
const API_BASE =
  window.location.hostname === `localhost`
    ? "http://localhost:5000"
    : `https://58xknscq-5000.uks1.devtunnels.ms`;

const toggle = () => {
  if (menu.src.includes("ham.png")) {
    menu.src = "images/close.png";
  } else {
    menu.src = "images/ham.png";
  }

  dropbox.classList.toggle("toggle");
};

menu.addEventListener("click", toggle);

//access poem page by clicking explore more btn
let exploreMoreBtn = document.querySelector("#more");

exploreMoreBtn.addEventListener("click", () => {
  window.location.href = "/poem.html";
});

//animate on scroll
const anis = document.querySelectorAll(".ani");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
});
anis.forEach((ani) => {
  observer.observe(ani);
});

//fectch recents to home page
const cardContainer = document.querySelector(".card-container");
const getRecents = async () => {
  try {
    const latest = await fetch(
      `https://58xknscq-5000.uks1.devtunnels.ms/poems/recents`,
    );
    const data = await latest.json();
    console.log(data);
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
      image.src = `https://58xknscq-5000.uks1.devtunnels.ms/${card.image_path}`; //
      image.classList.add("recent-img");
      con.classList.add("conn");
      con.append(image);
      poemCard.classList.add("ani", "card");
      poemCard.append(con, title, content, category);
      cardContainer.append(poemCard);
      observer.observe(poemCard);
    });
  } catch (error) {
    console.log(error);
  }
};
document.addEventListener("DOMContentLoaded", getRecents);

// sign up form
let form = document.querySelector("form");
let userName = document.querySelector("#name");
let userEmail = document.querySelector("#email");
let userPassword = document.querySelector("#password");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const userData = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };
    if (!userData.name) {
      alert("Please Enter Your Name");
    } else if (!userData.email) {
      alert("Please provide an email");
    } else if (!userData.password) {
      alert("please provide a password");
    } else {
      const details = await fetch(
        `https://58xknscq-5000.uks1.devtunnels.ms/auth/register`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );
      const feedback = await details.json();
      console.log(feedback);
      if (feedback.message === "USER_CREATED_SUCCESSFULLY") {
        alert(`registration successful ${userData.name}`);
      }

      const token = feedback.token;
      localStorage.setItem("signUpToken", token);

      form.reset();
    }
  } catch (error) {
    console.log(error);
  }
});

//sign in logic

const signInForm = document.querySelector("#in-form");
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //get elements from the html file
  const signInEmail = document.querySelector("#email-in");
  const signInPassword = document.querySelector("#password-in");

  //get their value in a form
  const signInFormData = {
    email: signInEmail.value,
    password: signInPassword.value,
  };
  try {
    const signIn = await fetch(
      "https://58xknscq-5000.uks1.devtunnels.ms/auth/login",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(signInFormData),
      },
    );
    //get response and save it to be sent later
    let response = await signIn.json();
    console.log(response);

    const token = response.token;

    localStorage.setItem("mainToken", token);

    signInForm.reset();

    if (response.message === "LOGGED_IN_SUCCESSFUL") {
      alert("login succeful 🎉");
    }
  } catch (error) {
    console.log(error);
  }
});

//go to admin page

let adminLink = document.querySelector("#admin-page");

/*adminLink.addEventListener("click", async () => {
  let token = localStorage.getItem("mainToken");
  const getAdmin = await fetch(
    `https://58xknscq-5000.uks1.devtunnels.ms/auth/admin`,
    {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (getAdmin.ok) {
    window.location.href =
      "https://58xknscq-5000.uks1.devtunnels.ms/auth/admin-page";
  } else {
    alert("Access denied");
    console.log(getAdmin.json());
  }
}); */

adminLink.addEventListener("click", () => {
  window.location.href =
    "https://58xknscq-5000.uks1.devtunnels.ms/auth/admin-page";
});
//login in

let Link = document.querySelectorAll("#link");
let signIn = document.querySelector("#in-form");
let signUp = document.querySelector("#up-form");

//switch between sign in and sign up
Link.forEach((link) => {
  link.addEventListener("click", () => {
    if (link.textContent === "Sign In") {
      signUp.style.display = "none";
      signIn.style.display = "block";
    } else if (link.textContent === "Sign up") {
      signIn.style.display = "none";
      signUp.style.display = "block";
    }
  });
});
