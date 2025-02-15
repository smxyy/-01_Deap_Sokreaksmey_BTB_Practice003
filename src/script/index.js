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

const date = new Date();
console.log(date);

const current_day = date.getDate();
const current_month = date.getMonth() + 1;
const current_year = date.getFullYear();

const formatted_date = `${String(current_month).padStart(2, '0')}-${String(current_day).padStart(2, '0')}-${current_year}`;
console.log(formatted_date);  // Output: 02-01-2025

// Add an event listener to the form's submit event
taskForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Retrieve the values from the input fields
  const taskName = taskNameInput.value.trim();
  const taskDate = taskDateInput.value;
  const taskPriority = taskPriorityInput.value;

  // Validate the inputs
  if (!taskName || !taskDate || !taskPriority) {
    errorMessage.innerHTML = "* Please fill in all fileds";
    return;
  }else{
    errorMessage.innerHTML = "";
  }

  if(taskDate <= formatted_date){
    errorMessage.innerHTML = "* No past date or today is allowed!";
    return;
  }else{
    errorMessage.innerHTML = "";
  }

  // Display the collected data (or send it to a server)
  console.log('Task Name:', taskName);
  console.log('Task Date:', taskDate);
  console.log('Task Priority:', taskPriority);
  
  let inputted_date = taskDate.split("-");
  const validate_input_date = `${inputted_date[2]}/${String(inputted_date[0]).padStart(2, '0')}/${String(inputted_date[1]).padStart(2, '0')}`;

  taskToDo.push({
    taskName: taskName,
    taskDate: validate_input_date,
    taskPriority: taskPriority,
    taskStatus: "Pending"
  }); 
  
  // generateTaskRows();

  // Optionally, reset the form after submission
  taskForm.reset();
});

// Array of objects

// let taskToDo = [
//   {
//     taskName: "Complete JavaScript Project",
//     taskDate: "2023/12/01",
//     taskPriority: "High",
//     taskStatus: "Pending"
//   },
//   {
//     taskName: "Review Team Documentation",
//     taskDate: "2023/12/03",
//     taskPriority: "Medium",
//     taskStatus: "Pending"
//   }
// ];

// Function to generate task rows dynamically
function generateTaskRows() {
  const taskListContainer = document.getElementById("task-list");

  taskToDo.forEach(task => {
    const row = document.createElement("tr");
    row.classList.add("bg-white", "border-b", "border-gray-200");

    const taskNameCell = document.createElement("th");
    taskNameCell.classList.add("px-6", "py-4", "font-medium", "whitespace-nowrap");
    taskNameCell.textContent = task.taskName;

    const taskDateCell = document.createElement("td");
    taskDateCell.classList.add("px-6", "py-4", "w-32");
    taskDateCell.textContent = task.taskDate;
    const taskPriorityCell = document.createElement("td");
    taskPriorityCell.classList.add(
      "px-2", 
      "py-1", 
      "font-medium", 
      "w-32",  // Fixed width for the table cell
      "h-20",  // Fixed height for the table cell
      "flex", 
      "items-center", 
      "justify-center"
    );

    // Create a div wrapper for the text content
    const priorityWrapper = document.createElement("div");
    priorityWrapper.classList.add(
      "inline-block", 
      "px-2",
      "py-1",          
      "rounded"       
    );

    // Set the color and background of the priority wrapper based on the priority value
    if (task.taskPriority === "High") {
      priorityWrapper.classList.add("text-red-500", "bg-red-200");
    } else if (task.taskPriority === "Medium") {
      priorityWrapper.classList.add("text-amber-500", "bg-amber-200");
    } else {
      priorityWrapper.classList.add("text-green-500", "bg-green-200");
    }

    // Set the text content
    priorityWrapper.textContent = task.taskPriority;

    // Append the priority wrapper to the taskPriorityCell
    taskPriorityCell.appendChild(priorityWrapper);

    const statusCell = document.createElement("td");
    statusCell.classList.add("px-6", "py-4");

    const statusButtonContainer = document.createElement("div");
    statusButtonContainer.classList.add("flex", "justify-center", "items-center");

    const statusButton = document.createElement("button");
    statusButton.classList.add("px-6", "py-3", "text-white", "bg-amber-500", "rounded-lg", "focus:outline-none", "transition-all", "duration-300", "ease-in-out");
    statusButton.textContent = task.taskStatus;

    // Add event listener to the status button to toggle between 'Pending' and 'Completed'
    statusButton.addEventListener("click", () => {
      if (statusButton.textContent.trim() === "Pending") {
        statusButton.textContent = "Completed";
        statusButton.classList.remove("bg-amber-500");
        statusButton.classList.add("bg-green-500");
      } else {
        statusButton.textContent = "Pending";
        statusButton.classList.remove("bg-green-500");
        statusButton.classList.add("bg-amber-500");
      }
    });

    statusButtonContainer.appendChild(statusButton);
    statusCell.appendChild(statusButtonContainer);

    // Append cells to the row
    row.appendChild(taskNameCell);
    row.appendChild(taskDateCell);
    row.appendChild(taskPriorityCell);
    row.appendChild(statusCell);

    // Append the row to the table body
    taskListContainer.appendChild(row);
  });
}

// Call the function to generate the rows when the page loads
generateTaskRows();
