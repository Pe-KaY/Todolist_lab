const addTodoBtn = () => {
  const addTodo_btn = document.getElementById("addtodo")
  const modal = document.querySelector(".modal")

  addTodo_btn.addEventListener("click", (e) => {
    e.preventDefault()
    modal.classList.remove("hide")

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0]
    // Set the min attribute to today's date
    document.getElementById("date").setAttribute("min", today)
  })
}

export default addTodoBtn
