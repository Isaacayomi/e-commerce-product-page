const mainEl = document.querySelector("main");
const openIcon = document.querySelector(".hamburger__menu");
const closeIcon = document.querySelector(".close__menu");
const navLinks = document.querySelector(".nav__links");

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slides");

const prevBtn = document.querySelector(".prev__btn");
const nextBtn = document.querySelector(".next__btn");

const collections = document.querySelectorAll(".sneakers__collections");
const collectionSlider = document.querySelector(".collections");

const increaseBtn = document.querySelector(".increase__btn");
const decreaseBtn = document.querySelector(".decrease__btn");
const itemsQuantity = document.querySelector(".items__quantity");
const cartIcon = document.querySelector(".cart");
const addToCartBtn = document.querySelector(".add__to__cart__btn");
const displayItemsQuantity = document.querySelector(".items__number");
const displayCheckoutMenu = document.querySelector(".cart__checkout__display");

const itemSelected = document.querySelector(".item__selected");
const selectedQuantity = document.querySelector(".no__items__selected");
const totalCost = document.querySelector(".total");
const checkOutBtn = document.querySelector(".checkout__btn");

const deleteIcon = document.querySelector(".delete__icon");

// lightbox feature
const lightbox = document.querySelector(".lightbox");
const lightboxSlides = document.querySelectorAll(".lightbox__slide");
const lightboxPrevBtn = document.querySelector(".lightbox__prev__btn");
const lightboxNextBtn = document.querySelector(".lightbox__next__btn");
const lightboxCloseBtn = document.querySelector(".close__lightbox");
const overlay = document.querySelector(".overlay");

let curSlide = 0;
let maxSlide = slides.length - 1;
slider.style.overflow = "hidden";

const openNav = () => {
  mainEl.style.filter = "blur(2px)";
  navLinks.style.opacity = "100%";
  navLinks.style.left = "0";

  // Shows nav after the animation is complete
  setTimeout(() => {
    navLinks.style.display = "block";
  }, 300);
};

const closeNav = () => {
  mainEl.style.filter = "blur(0px)";
  navLinks.style.opacity = "0";
  navLinks.style.left = "-250px";

  // Hides nav completely after the animation is complete
  setTimeout(() => {
    navLinks.style.display = "none";
  }, 300);
};

slides.forEach(function (slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`;
});

const goTo = function () {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
};

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goTo();
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goTo();
};

const miniCollections = function () {
  collections.forEach(function (collection) {
    collection.addEventListener("click", function () {
      const collectionSrc = collection.getAttribute("src");

      slides[curSlide].setAttribute("src", collectionSrc);
    });
  });
};

miniCollections();

let count = 0;

const increaseCount = function () {
  count++;
  itemsQuantity.textContent = count;
};

const decreaseCount = function () {
  count--;
  if (count < 0) {
    count = 0;
  }
  itemsQuantity.textContent = count;
};

const displayCartMenu = function () {
  if (displayCheckoutMenu.style.opacity === "0") {
    displayCheckoutMenu.style.opacity = 100;
    prevBtn.style.opacity = 0;
    nextBtn.style.opacity = 0;
  } else {
    displayCheckoutMenu.style.opacity = 0;
    prevBtn.style.opacity = 100;
    nextBtn.style.opacity = 100;
  }
};

const addToCart = function () {
  if (itemsQuantity.textContent === "0") {
    displayItemsQuantity.textContent = "";
    checkOutBtn.style.display = "none";
    document.querySelector(".checkout__display").textContent =
      "Your cart is empty.";
    return;
  }

  // Show the items in the checkout menu
  displayItemsQuantity.textContent = itemsQuantity.textContent;
  displayItemsQuantity.style.display = "block";
  checkOutBtn.style.display = "block";
  displaySelectedItems();
};

const deleteSelectedItems = function () {
  itemSelected.style.display = "none";
  checkOutBtn.style.display = "none";

  document.querySelector(".checkout__display").style.display = "block";
  itemsQuantity.textContent = "0";
  displayItemsQuantity.style.display = "none";

  // Reset item quantity
  itemsQuantity.textContent = 0;
  count = 0;
  console.log(itemsQuantity.textContent);

  console.log("Cart has been cleared!");
};

const displaySelectedItems = function () {
  if (parseInt(itemsQuantity.textContent) === 0) {
    // Display 'Empty Cart' when no items are selected
    document.querySelector(".checkout__display").style.display = "block";
    document.querySelector(".checkout__display").textContent =
      "Your cart is empty.";
    itemSelected.style.display = "none";
    checkOutBtn.style.display = "none";
    displayItemsQuantity.style.display = "none";
  } else {
    // Display the selected item details when items are present
    document.querySelector(".checkout__display").style.display = "none";
    itemSelected.style.display = "flex"; // Show item details

    let html = `
      <img
        src="./images/shoe1.png"
        alt="sneaker-selected"
        class="sneaker__selected"
      />
      <div class="items__selected__details">
        <p class="sneaker__edition">Fall Limited Edition Sneakers</p>
        <p class="sneaker__price">
          $125.00 x <span class="no__items__selected">${
            itemsQuantity.textContent
          }</span>
          <span class="total">$${
            125 * parseInt(itemsQuantity.textContent)
          }</span>
        </p>
      </div>
      <img
        src="./images/delete-icon.png"
        alt="delete-icon"
        class="delete__icon"
      />
    `;
    itemSelected.innerHTML = html;
    checkOutBtn.style.display = "block";
    displayItemsQuantity.style.display = "block";
  }

  // Reassign event listener to the delete icon
  const deleteIcon = document.querySelector(".delete__icon");
  if (deleteIcon) {
    deleteIcon.addEventListener("click", deleteSelectedItems);
  }
};
displaySelectedItems();
// Nav events
openIcon.addEventListener("click", openNav);
closeIcon.addEventListener("click", closeNav);
mainEl.addEventListener("click", () => {
  displayCheckoutMenu.style.opacity = 0;
  prevBtn.style.opacity = 100;
  nextBtn.style.opacity = 100;
  // closeNav();
});

// Sliders events
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Cart events
increaseBtn.addEventListener("click", increaseCount);
decreaseBtn.addEventListener("click", decreaseCount);
addToCartBtn.addEventListener("click", addToCart);

// cartIcon.addEventListener("click", displayCartMenu);
cartIcon.addEventListener("click", function () {
  displayCartMenu();
  // displaySelectedItems();
});

const mediaQuery = window.matchMedia("(min-width: 1024px)");

// Lightbox functionalities
let currentLightboxSlide = 0;
const maxLightboxSlide = lightboxSlides.length - 1;

// Function to show the lightbox and update the image
const displayLightBox = function () {
  if (mediaQuery.matches) {
    lightbox.style.display = "block";
    overlay.style.display = "block";
    updateLightboxImage(currentLightboxSlide);
  }
};

// Function to close the lightbox
const closeLightbox = function () {
  lightbox.style.display = "none";
  overlay.style.display = "none";
};

// Function to update lightbox images based on the current slide index
const updateLightboxImage = function (index) {
  lightboxSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${150 * (i - index)}%)`;
  });
};

// Event listeners for lightbox navigation
lightboxNextBtn.addEventListener("click", function () {
  currentLightboxSlide = (currentLightboxSlide + 1) % lightboxSlides.length;
  updateLightboxImage(currentLightboxSlide);
});

lightboxPrevBtn.addEventListener("click", function () {
  currentLightboxSlide =
    (currentLightboxSlide - 1 + lightboxSlides.length) % lightboxSlides.length;
  updateLightboxImage(currentLightboxSlide);
});

// Event listener for closing the lightbox
lightboxCloseBtn.addEventListener("click", closeLightbox);

// Initializing the lightbox display when clicking the main slider
slider.addEventListener("click", function () {
  displayLightBox();
  mainEl.style.overflow = "hidden";
});

// Ensure slides are positioned correctly at the start
lightboxSlides.forEach(function (slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`;
});

slider.addEventListener("click", function () {
  console.log("working");
  displayLightBox();
});
