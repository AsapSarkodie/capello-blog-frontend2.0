const postBtn = document.querySelector("#post-btn");

postBtn.addEventListener("click", () => {
  window.location.href = "./admin.html";
});

//fetch all poems
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const allPoems = await fetch(
      `https://58xknscq-5000.uks1.devtunnels.ms/poems`,
    );
    const data = await allPoems.json();
    console.log(data);

    //selecting ul
    const poemContainer = document.querySelector(".poem-container");
    poemContainer.classList.add("mail-list");
    //modal
    let promptBox = document.querySelector(".prompt");
    //modal buttons
    let Button = document.querySelectorAll("#btn");
    //correct way to set the id
    let currentId = null;
    let cardMap = new Map();
    //option button
    Button.forEach((btn) => {
      btn.addEventListener("click", async () => {
        if (btn.className === "no-btn") {
          promptBox.classList.remove("active");
          currentId = null;
        } else {
          promptBox.classList.remove("active");
          const card = cardMap.get(currentId);
          if (card) {
            card.style.display = "none";
          }

          try {
            const deletePoem = await fetch(
              `https://58xknscq-5000.uks1.devtunnels.ms/poems/remove/${currentId}`,
              {
                method: "DELETE",
              },
            );
            const deletedata = await deletePoem.json();
            console.log(deletedata);
            if (deletedata.message === "FAILED_TO_DELETE") {
              alert("failed to delete.");
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    });
    //selecting edit pox
    let editBox = document.querySelector(".edit-box");
    // edit content
    let editTitle = document.querySelector("#edit-title");
    let editContent = document.querySelector("#edit-textarea");

    //edit changes
    let editBtn = document.querySelector("#done-btn");
    editBtn.addEventListener("click", async () => {
      try {
        const updateData = {
          title: editTitle.value,
          content: editContent.value,
        };
        const updatePoem = await fetch(
          `https://58xknscq-5000.uks1.devtunnels.ms/poems/edit/${currentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          },
        );
        const updateD = await updatePoem.json();
        console.log(updateData);
        if (updatePoem.ok) {
          currentId = null;
          editBox.classList.remove("appear");
        }
      } catch (error) {
        console.log(error);
      }
    });
    //looping through the data
    data.forEach((poem) => {
      let poemCard = document.createElement("div");
      let title = document.createElement("h4");
      let image = document.createElement("img");
      let trash = document.createElement("img");
      trash.src = "../images/trash.png";
      title.textContent = poem.title;
      image.src = `https://58xknscq-5000.uks1.devtunnels.ms/${poem.image_path}`;
      poemCard.classList.add("mail-item");

      image.classList.add("avatar");
      title.classList.add("sender");
      trash.classList.add("trash");

      poemCard.append(image, title, trash);
      poemContainer.append(poemCard);
      cardMap.set(poem.id, poemCard);
      //delete a poem+
      trash.addEventListener("click", () => {
        promptBox.classList.add("active");
        currentId = poem.id;
      });
      poemCard.addEventListener("dblclick", () => {
        editBox.classList.toggle("appear");
        //edit stuff

        //assign their values
        editTitle.value = poem.title;
        editContent.value = poem.content;
        currentId = poem.id;
      });
    });
  } catch (err) {
    console.log(err);
  }
});
