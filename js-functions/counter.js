// make the elemnts
let count = 0;
let buo = document.querySelector(".heart");

function counter() {
  count++;
  buo.innerHTML = `<i class="fa-solid fa-heart"></i>
    <br>
    ${count}`;
}
