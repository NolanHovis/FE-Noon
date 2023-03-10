const form = document.querySelector("#form-resource");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  onCreateResource(event);
});

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
  }).then((res) => res.json());
}
