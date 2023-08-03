document.addEventListener("DOMContentLoaded", () => {
  const serviceButtons = document.querySelectorAll(".service__button");
  const serviceDetailsContainer = document.querySelector(
    ".service__details__container"
  );
  async function fetchServiceDetails(serviceId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${serviceId}`
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  function addServiceDetailsBlock(servicesBlock) {
    const serviceDetailsBlock = document.createElement("div");
    serviceDetailsBlock.classList.add("service__details");

    let blockTitle = document.createElement("h3");
    blockTitle.textContent = servicesBlock.title;

    let blockBody = document.createElement("p");
    blockBody.textContent = servicesBlock.body;

    serviceDetailsBlock.appendChild(blockTitle);
    serviceDetailsBlock.appendChild(blockBody);

    return serviceDetailsBlock;
  }

  function clearServiceDetailscontainer() {
    serviceDetailsContainer.innerHTML = "";
  }

  async function showRandomServiceDetails() {
    clearServiceDetailscontainer();
    let numberOfBlocks = 3;
    for (let i = 0; i < numberOfBlocks; i++) {
      const randomServiceId = Math.floor(Math.random() * 100) + 1;
      const serviceDetails = await fetchServiceDetails(randomServiceId);
      const serviceDetailsBlock = addServiceDetailsBlock(serviceDetails);
      serviceDetailsContainer.appendChild(serviceDetailsBlock);
    }
  }

  async function handleServiceButtonClick(e) {
    showRandomServiceDetails();
  }

  serviceButtons.forEach((button) => {
    button.addEventListener("click", handleServiceButtonClick);
  });
});

function changeButtonClass() {
  console.log("success");
}

function promptForClose() {
  let the_answer = confirm(
    "This window has been inactive for 10 seconds.  Would you like it to close?"
  );
  if (the_answer == true) {
    top.opener = self;
    top.window.close();
  } else {
    setTimeout("promptForClose()", 10000);
  }
}

function definitelyClose() {
  top.opener = self;
  top.window.close();
}

window.addEventListener("load", function () {
  let loader = document.getElementById("loading");
  this.window.setTimeout(function () {
    console.log("5 seconds have passed.");
    loader.classList.add("loader_hidden");
  }, 5000);
});

window.onscroll = function () {
  myFunction();
};

function myFunction() {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// IMAGES API

const apiKey = "vhYQqA4t1tkmTTwYz3YGHWX0qF271wTxS9qr81_2Q6M";
const apiUrl = `https://api.unsplash.com/photos/random/?count=2&client_id=${apiKey}`;
async function fetchRandomBlocks() {
  try {
    const response1 = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const response2 = await fetch(
      "https://jsonplaceholder.typicode.com/posts/2"
    );
    const data1 = await response1.json();
    const data2 = await response2.json();
    return [data1, data2];
  } catch (err) {
    console.error("Error fetching random blocks:", err);
  }
}

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const imagesDiv = document.getElementById("images");
    const contentDiv = document.getElementById("latest__news-content");

    data.forEach((imageData) => {
      const imageUrl = imageData.urls.regular;
      const image = document.createElement("img");
      image.src = imageUrl;
      imagesDiv.appendChild(image).classList.add("ivan");
    });

    fetchRandomBlocks().then((blocksData) => {
      blocksData.forEach((block) => {
        const blockDiv = document.createElement("div");
        blockDiv.innerHTML = `<h2>${block.title}</h2><p>${block.body}</p>`;
        contentDiv.appendChild(blockDiv);
      });
    });
  })
  .catch((error) => console.error("Error fetching random images:", error));
