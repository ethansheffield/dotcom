const container = document.getElementById("container");
const headerImg = document.querySelector('.header-img'); // Select the header image
const imageOne = document.querySelector(".image-1");
const imageTwo = document.querySelector(".image-2");
const btnYes = document.querySelector(".btn-yes");
const btnNo = document.querySelector(".btn-no");

function getRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function moveButton() {
  const containerHeight = container.getBoundingClientRect().height;
  const containerWidth = container.getBoundingClientRect().width;
  const btnHeight = btnNo.getBoundingClientRect().height;
  const btnWidth = btnNo.getBoundingClientRect().width;

  const newTop = getRandomNumber(0, containerHeight - btnHeight);
  const newLeft = getRandomNumber(0, containerWidth - btnWidth);

  btnNo.style.top = `${newTop}px`;
  btnNo.style.left = `${newLeft}px`;
}

setInterval(moveButton, 700);

btnYes.addEventListener("click", (e) => {
  btnNo.classList.add("hide");
  imageOne.classList.add("hide");
  imageTwo.classList.remove("hide");
  headerImg.src = '/date assets/date images/letsgo1.gif'; // Update the header image source
});

