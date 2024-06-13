const saveAndFilter = () => {
  // variables for todo user input
  const title = document.getElementById("title")
  const description = document.getElementById("description")
  const date = document.getElementById("date")
  //   save button to add todo
  const saveBtn = document.getElementById("saveBtn")
  // filter button
  const filterBtn = document.getElementById("filter")
  // display div to show the todo list
  const displayTodos = document.querySelector(".todo__list")

  // global edit id checker
  let taskexist

  //   Arrays to hold todolist by filter
  let inProgress = []

  // Functions expresstions start here

  // Display todolist function
  const displayTodo = (command) => {
    let todos = [...inProgress]

    // displays completed todolist
    if (command === "completed") {
      todos = todos.filter(({ completed }) => completed)
    }

    // displays  todolist in progress(uncompleted)
    if (command === "inprogress") {
      todos = todos.filter(({ completed }) => !completed)
    }

    // displays todolist in ascending order(time added)(Default)
    if (command === "sortnew") {
      todos = [...inProgress]
    }
    // displays  todolist in descending order(time added)
    if (command === "sortold") {
      todos = todos
        .filter(({ completed }) => !completed)
        .sort((a, b) => a.id - b.id)

      // BY DEFAULT todolist is in ascending order(time added)
    }

    // displays todo objects in the array
    displayTodos.innerHTML = todos
      .map(({ title, description, date, id }) => {
        return `<div>
<div class="title">
  <h1>${title}</h1>
  <p>${description}</p>
  <p><span class="duedate">Date Due: </span>${date}</p>
</div>
<span>
  <button taskid="${id}">Done</button>
  <button taskid="${id}">Edit</button>
  <button taskid="${id}">Delete</button>
</span>
</div>`
      })
      .join("")
  }

  // calls displayTodos upon window load
  displayTodo("inprogress")

  //   saving todo Function
  const saveTodo = () => {
    let todoTitle = title.value.trim().toUpperCase()
    let todoDescription = description.value.trim()
    let todoDate = date.value
    let taskid = Date.now()

    if (taskexist) {
      const index = inProgress.indexOf(taskexist)
      inProgress[index].title = todoTitle
      inProgress[index].description = todoDescription
      inProgress[index].date = todoDate

      if (
        inProgress[index].date !== taskexist.date ||
        inProgress[index].title !== taskexist.title ||
        inProgress[index].description !== taskexist.description
      ) {
        inProgress[index].completed = false
      }
      displayTodo("all")

      taskexist = null

      return
    }

    if (!todoTitle) {
      alert(`Bossu Title cannot be empty`)
      return
    }

    //Adds a new todo object to the inprogress task array
    inProgress.unshift({
      title: todoTitle,
      description: todoDescription,
      date: todoDate,
      id: taskid,
      completed: false,
    })

    // displays todolist
    displayTodo("all")
  }

  //  marked/completed todo  function
  const completedTodo = (taskid) => {
    const completedTaskId = parseInt(taskid)
    const completedTask = inProgress.findIndex(
      ({ id }) => id === completedTaskId
    )
    inProgress[completedTask].completed = true
    // update display
    displayTodo("inprogress")
  }

  // delete todo function
  const deleteTodo = (taskid) => {
    const taskToDelete = parseInt(taskid)
    inProgress = inProgress.filter(({ id }) => id !== taskToDelete)
    // display todolist
    displayTodo("all")
  }

  // filter todolist function
  const filter = (val) => {
    if (val === "completed") {
      displayTodo("completed")
    }
    if (val === "inprogress") {
      displayTodo("inprogress")
    }
    if (val === "sortold") {
      displayTodo("sortold")
    }
  }

  // Edit Todo
  const editTodo = (taskid) => {
    const taskToEdit = inProgress.find(({ id }) => id === parseInt(taskid))
    const { title: t, description: d, date: dte } = taskToEdit
    document.getElementById("addtodo").click()
    title.value = t
    description.value = d
    date.value = dte

    taskexist = taskToEdit
  }

  // This function will handle todolist completed/Done, Delete and Edit
  const todoButtonsManipulate = (e) => {
    const target = e.target
    const command = target.textContent

    if (target.matches("button")) {
      // fetches the id of the target task
      const taskId = target.getAttribute("taskid")

      //  marked/completed todo list
      if (command === "Done") {
        completedTodo(taskId)
      }

      //  delete a todo
      if (command === "Delete") {
        deleteTodo(taskId)
      }
      if (command === "Edit") {
        editTodo(taskId)
      }
    }
  }

  //   adding  Event listeners

  // Event deligation to the display container to handle all the todo button clicks
  displayTodos.addEventListener("click", todoButtonsManipulate)

  // Adds Click event on the save button to save todo
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault()
    saveTodo()
    //   cleans user input field
    title.value = ""
    description.value = ""
    date.value = ""

    // closes todo add menu
    const closeBtn = document.querySelector(".fa-regular")
    closeBtn.click()
  })

  // change event on the select to filter display of todolist
  filterBtn.addEventListener("change", (e) => {
    const filterMode = e.target.value
    filter(filterMode)
  })
}

export default saveAndFilter
