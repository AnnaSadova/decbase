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
    // clearServiceDetailscontainer();
    // const randomServiceIds = [];

    // while (randomServiceIds.length < 5) {
    //   const randomId = Math.floor(Math.random() * 100) + 1; // Вибираємо випадкові ідентифікатори з діапазону 1-100
    //   if (!randomServiceIds.includes(randomId)) {
    //     randomServiceIds.push(randomId);
    //   }
    // }

    // for (let i = 0; i < randomServiceIds.length; i++) {
    //   const serviceId = randomServiceIds[i];
    //   const serviceDetails = await fetchServiceDetails(serviceId);
    //   const serviceDetailsBlock = addServiceDetailsBlock(serviceDetails);
    //   serviceDetailsContainer.appendChild(serviceDetailsBlock);
    // }
    clearServiceDetailscontainer();
    let randomNum = Math.floor(Math.random() * 10);
    let numberOfBlocks;
    if (randomNum >= 0 && randomNum <= 4) {
      numberOfBlocks = 3;
    }
    for (let i = 0; i < numberOfBlocks; i++) {
      const serviceDetails = await fetchServiceDetails(numberOfBlocks);
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
