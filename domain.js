//Calendar
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons i");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  const fragment = document.createDocumentFragment(); // Create a fragment to hold the elements

  // Add inactive days from previous month
  for (let i = firstDayofMonth; i > 0; i--) {
    const li = document.createElement("li");
    li.textContent = lastDateofLastMonth - i + 1;
    li.classList.add("inactive");
    fragment.appendChild(li);
  }

  // Add active days of the current month
  for (let i = 1; i <= lastDateofMonth; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    if (i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
      li.classList.add("active");
    }
    fragment.appendChild(li);
  }

  // Add inactive days from next month
  for (let i = lastDayofMonth; i < 6; i++) {
    const li = document.createElement("li");
    li.textContent = i - lastDayofMonth + 1;
    li.classList.add("inactive");
    fragment.appendChild(li);
  }

  // Clear previous content and append the new content
  while (daysTag.firstChild) {
    daysTag.removeChild(daysTag.firstChild);
  }
  daysTag.appendChild(fragment);

  // Update current date
  currentDate.textContent = `${months[currMonth]} ${currYear}`;
};

renderCalendar();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
