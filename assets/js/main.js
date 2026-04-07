document.addEventListener("DOMContentLoaded", () => {

  const adultInput = document.getElementById("adultCount");
  const child15Input = document.getElementById("child15Count");
  const childBelow15Input = document.getElementById("childBelow15Count");
  const totalSpan = document.querySelector(".total-box span");

  function calculateTotal() {
    const adults = parseInt(adultInput.value) || 0;
    const child15 = parseInt(child15Input.value) || 0;
    const childBelow15 = parseInt(childBelow15Input.value) || 0;

    const total =
      (adults * 100) +
      (child15 * 50) +
      (childBelow15 * 25);

    totalSpan.textContent = total;
  }

  adultInput.addEventListener("input", calculateTotal);
  child15Input.addEventListener("input", calculateTotal);
  childBelow15Input.addEventListener("input", calculateTotal);

});

// ---------------- AGREEMENT CHECKBOX CONTROL ----------------
const agreeCheckbox = document.getElementById("agreeRules");
const payBtn = document.getElementById("payBtn");

agreeCheckbox.addEventListener("change", () => {
  payBtn.disabled = !agreeCheckbox.checked;
});
