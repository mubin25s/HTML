const PI = 3.14169;
let radious;
let Ci;

document.getElementById("submit").onclick = function () {
  document.getElementById("mytext").value;
  radius = Number(radious);
  Ci = 2 * PI * radious;
  document.getElementById("Myh3").textContent = Ci + "cm";
  document.getElementById("Myh3").style.color = "red";
};
