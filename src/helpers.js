function appendResourceToDOM(resource) {
  const container = document.querySelector(".resource-container");
  const card = document.createElement("div");
  const contentElem = document.createElement("a");
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", () => {
    onEditResource(resource, card, { contentElem, link: resource.link });
  });
  card.appendChild(editBtn);

  card.classList.add("card");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteResource(resource.id).then((data) => {
      card.remove();
    });
  });
  card.appendChild(deleteBtn);

  contentElem.href = resource.link;
  contentElem.target = "_blank";
  contentElem.textContent = resource.content;

  card.appendChild(contentElem);
  container.appendChild(card);
}

const onCreateResource = (e) => {
  console.log(e);
  const content = e.target.content.value;
  const link = e.target.link.value;
  const resource = { content, link };

  createResource(resource).then((data) => {
    if (data.errors) {
      console.log(data.errors);
    } else {
      appendResourceToDOM(data);
    }
  });
};

const onEditResource = (resource, card, cardElements) => {
  const editForm = document.createElement("form");
  const contentInput = document.createElement("input");
  const linkInput = document.createElement("input");
  const submitBtn = document.createElement("button");

  submitBtn.textContent = "Submit";
  contentInput.value = resource.content;
  linkInput.value = resource.link;
  editForm.appendChild(contentInput);
  editForm.appendChild(linkInput);
  editForm.appendChild(submitBtn);
  card.appendChild(editForm);
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const content = contentInput.value;
    const link = linkInput.value;
    const updatedResource = { content, link };
    updateResource(resource.id, updatedResource).then((data) => {
      if (data.errors) {
        console.log(data.errors);
      } else {
        card.removeChild(editForm);
        cardElements.contentElem.textContent = data.content;
        cardElements.contentElem.href = data.link;
      }
    });
  });
};
