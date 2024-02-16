const tasksByDay = {
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: []
};

function addTask() {
  const taskInput = document.getElementById('task');
  const dueDateInput = document.getElementById('dueDate');
  const task = taskInput.value;
  const dueDate = new Date(dueDateInput.value);

  const dayOfWeek = getDayOfWeek(dueDate);

  tasksByDay[dayOfWeek].push({ task, dueDate });

  renderTasks();
}

function renderTasks() {
  // Clear existing tasks
  Object.keys(tasksByDay).forEach(day => {
    const dayElement = document.getElementById(day);
    dayElement.innerHTML = `<h3>${capitalizeFirstLetter(day)}</h3>`;
  });

  // Render tasks
  Object.entries(tasksByDay).forEach(([day, tasks]) => {
    const dayElement = document.getElementById(day);
    tasks.forEach(({ task, dueDate }) => {
      const taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.textContent = `${task} - ${dueDate.toLocaleDateString()}`;
      taskElement.style.backgroundColor = getTaskBackgroundColor(dueDate);
      dayElement.appendChild(taskElement);
    });
  });
}

function getTaskBackgroundColor(dueDate) {
  const timeDifference = dueDate - new Date();
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  if (daysDifference > 7) {
    return '#b3e0ff'; // Azul se falta mais que uma semana
  } else if (daysDifference > 0) {
    return '#ff9999'; // Vermelho se falta menos que uma semana
  } else {
    return '#ffffff'; // Branco para tarefas passadas
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDayOfWeek(date) {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return daysOfWeek[date.getUTCDay()];
}