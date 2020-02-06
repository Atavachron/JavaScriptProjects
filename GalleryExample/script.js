function Gallery(gallery) {
  if (!gallery) {
    return;
  }

  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  let currentImage; //To track the currently opened image

  function showImage(el) {
    if (!el) {
      console.info("There is no image to display");
      return;
    }
    modal.querySelector("img").src = el.src;
    modal.querySelector("h2").textContent = el.title;
    modal.querySelector("figure p").textContent = el.dataset.description;
    currentImage = el;
  }

  images.forEach(image =>
    image.addEventListener("click", event => {
      showImage(event.currentTarget);
    })
  );
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
