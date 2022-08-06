const d = document;
const sliderContainer = d.getElementById(
  "slider-container"
);
const slider = d.getElementById("slider");
const btnLeft = d.getElementById("btn-left");
const btnRight = d.getElementById("btn-right");

const sliderElements = document.querySelectorAll(".slide");

const rootStyles = d.documentElement.style;

let slideCounter = 0;
let isInTransition = false;

const DIRECTION = {
  RIGHT: "RIGHT",
  LEFT: "LEFT",
};

const getTransformValue = () =>
  Number(
    rootStyles
      .getPropertyValue("--slide-transform")
      .replace("px", "")
  );

const reorderSlide = () => {
  const transformValue = getTransformValue();
  rootStyles.setProperty("--slide-transition", "none");
  if (slideCounter === sliderElements.length - 1) {
    slider.appendChild(slider.firstElementChild);
    rootStyles.setProperty(
      "--slide-transform",
      `${
        transformValue +
        sliderElements[slideCounter].scrollWidth
      }px`
    );
    slideCounter--;
  } else if (slideCounter === 0) {
    slider.prepend(slider.lastElementChild);
    rootStyles.setProperty(
      "--slide-transform",
      `${
        transformValue -
        sliderElements[slideCounter].scrollWidth
      }px`
    );
    slideCounter++;
  }

  isInTransition = false;
};

const moveSlide = (direction) => {
  if (isInTransition) return;
  const transformValue = getTransformValue();
  rootStyles.setProperty(
    "--slide-transition",
    "transform 0.5s ease-in-out"
  );
  isInTransition = true;
  if (direction === DIRECTION.LEFT) {
    rootStyles.setProperty(
      "--slide-transform",
      `${
        transformValue +
        sliderElements[slideCounter].scrollWidth
      }px`
    );
    slideCounter--;
  } else if (direction === DIRECTION.RIGHT) {
    rootStyles.setProperty(
      "--slide-transform",
      `${
        transformValue -
        sliderElements[slideCounter].scrollWidth
      }px`
    );
    slideCounter++;
  }
};

btnRight.addEventListener("click", () =>
  moveSlide(DIRECTION.RIGHT)
);
btnLeft.addEventListener("click", () =>
  moveSlide(DIRECTION.LEFT)
);

slider.addEventListener("transitionend", reorderSlide);

reorderSlide();
