const closeTodoMenu = () => {
  const closeBtn = document.querySelector(".fa-regular")
  const modal = document.getElementById("modalmenu")

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hide")
  })
}

export default closeTodoMenu
