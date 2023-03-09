getResources().then((data) => {
  console.log(data);
  data.forEach((resource) => {
    appendResourceToDOM(resource);
  });
});

function getResources() {
  return fetch("http://localhost:3000/resources", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const btn = document.querySelector("#create");
btn.addEventListener("click", (event) => {
  event.preventDefault();
  onCreateResource(event);
});
