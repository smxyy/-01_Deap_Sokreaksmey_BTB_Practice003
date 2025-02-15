let taskToDo = [
  {
    taskName: "Complete JavaScript Project",
    taskDate: "2023/12/01",
    taskPriority: "High",
    taskStatus: "Pending"
  },
  {
    taskName: "Review Team Documentation",
    taskDate: "2023/12/03",
    taskPriority: "Medium",
    taskStatus: "Pending"
  }
];

// Get references to the form elements
const taskForm = document.getElementById('task-form');
const taskNameInput = document.getElementById('task-name');
const taskDateInput = document.getElementById('task-date');
const taskPriorityInput = document.getElementById('task-priority');
const errorMessage =  document.getElementById("error-message");
const taskListContainer = document.getElementById("task-list");

const date = new Date();

const current_day = date.getDate();
const current_month = date.getMonth() + 1;
const current_year = date.getFullYear();

const formatted_date = `${String(current_month).padStart(2, '0')}-${String(current_day).padStart(2, '0')}-${current_year}`;

// Add an event listener to the form's submit event
taskForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Retrieve the values from the input fields
  const taskName = taskNameInput.value.trim();
  const taskDate = taskDateInput.value;
  const taskPriority = taskPriorityInput.value;

  // Validate the inputs
  if (!taskName || !taskDate || !taskPriority) {
    errorMessage.innerHTML = "* Please fill in all fields";
    return;
  } else {
    errorMessage.innerHTML = "";
  }

  if (taskDate <= formatted_date) {
    errorMessage.innerHTML = "* No past date or today is allowed!";
    return;
  } else {
    errorMessage.innerHTML = "";
  }

  let inputted_date = taskDate.split("-");
  const validate_input_date = `${inputted_date[2]}/${String(inputted_date[0]).padStart(2, '0')}/${String(inputted_date[1]).padStart(2, '0')}`;

  // Push new task into taskToDo array
  taskToDo.push({
    taskName: taskName,
    taskDate: validate_input_date,
    taskPriority: taskPriority,
    taskStatus: "Pending",
  });

  // Reset form after submission
  taskForm.reset();

  // Re-render the task list
  generateTaskRows();
});

// Function to generate task rows dynamically
function generateTaskRows() {
  taskListContainer.innerHTML = ""; // Clear existing rows

  taskToDo.forEach((task, index) => {
    const row = document.createElement("tr");
    row.classList.add("bg-white", "border-b", "border-gray-200");

    const taskNameCell = document.createElement("th");
    taskNameCell.classList.add("px-6", "py-4", "font-medium", "whitespace-nowrap");
    taskNameCell.textContent = task.taskName;

    const taskDateCell = document.createElement("td");
    taskDateCell.classList.add("px-6", "py-4", "w-32");
    taskDateCell.textContent = task.taskDate;

    const taskPriorityCell = document.createElement("td");
    taskPriorityCell.classList.add("px-2", "py-1", "font-medium", "w-32", "h-20", "flex", "items-center", "justify-center");

    // Create a div wrapper for the priority
    const priorityWrapper = document.createElement("div");
    priorityWrapper.classList.add("inline-block", "px-2", "py-1", "rounded");

    if (task.taskPriority === "High") {
      priorityWrapper.classList.add("text-red-500", "bg-red-200");
    } else if (task.taskPriority === "Medium") {
      priorityWrapper.classList.add("text-amber-500", "bg-amber-200");
    } else {
      priorityWrapper.classList.add("text-green-500", "bg-green-200");
    }

    priorityWrapper.textContent = task.taskPriority;
    taskPriorityCell.appendChild(priorityWrapper);

    const statusCell = document.createElement("td");
    statusCell.classList.add("px-6", "py-4");

    const statusButtonContainer = document.createElement("div");
    statusButtonContainer.classList.add("flex", "justify-center", "items-center");

    const statusButton = document.createElement("button");
    statusButton.classList.add("px-6", "py-3", "text-white", "rounded-lg", "focus:outline-none", "transition", "duration-700", "ease-in-out");

    updateStatusButton(task, statusButton);

    // Event listener to update task status
    statusButton.addEventListener("click", () => {
      taskToDo[index].taskStatus = taskToDo[index].taskStatus === "Pending" ? "Completed" : "Pending";
      generateTaskRows(); // Re-render the table to reflect updates
      console.log(taskToDo);
    });

    statusButtonContainer.appendChild(statusButton);
    statusCell.appendChild(statusButtonContainer);

    row.appendChild(taskNameCell);
    row.appendChild(taskDateCell);
    row.appendChild(taskPriorityCell);
    row.appendChild(statusCell);

    taskListContainer.appendChild(row);
  });
}

// Function to update button styles and text based on task status
function updateStatusButton(task, button) {
  if (task.taskStatus === "Pending") {
    button.textContent = "Pending";
    button.classList.add("bg-amber-500");
    button.classList.remove("bg-green-500");
  } else {
    button.textContent = "Completed";
    button.classList.add("bg-green-500");
    button.classList.remove("bg-amber-500");
  }
}

// Initial render
generateTaskRows();
