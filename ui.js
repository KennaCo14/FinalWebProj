function addTask() {
    var input = document.getElementById("taskInput");
    var task = input.value;
    input.value= "";

    if (task === "") {
        alert("Please enter a task!")
        return;
    }

    var taskList = document.getElementById("taskList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(task));
    taskList.appendChild(li);
}
//sticky
document.addEventListener("DOMContentLoaded", function() {
    const addNoteBtn = document.getElementById("add-note-btn");
    const noteInput = document.getElementById("note-input");
    const stickyContainer = document.getElementById("sticky-container");
    let noteCount = 0;
  
    // Load saved notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    savedNotes.forEach(function(note) {
      const newNote = createStickyNoteElement(note.content);
      stickyContainer.appendChild(newNote);
    });
  
    addNoteBtn.addEventListener("click", function() {
      if (noteCount <= 3 && noteInput.value.trim() !== "") {
        const newNote = createStickyNoteElement(noteInput.value);
        stickyContainer.appendChild(newNote);
        saveNoteToLocalStorage(noteInput.value);
        noteInput.value = "";
        noteCount++;
  
        // Check if note limit reached
        if (noteCount > 3) {
          addNoteBtn.disabled = true;
          noteInput.disabled = true;
        }
      }
    });
  
    // Event delegation to handle close button clicks
    stickyContainer.addEventListener("click", function(event) {
      if (event.target.classList.contains("close-btn")) {
        event.target.closest(".sticky-note").remove();
        noteCount--;
  
        // Re-enable input if note limit was reached and note is removed
        if (noteCount < 3) {
          addNoteBtn.disabled = false;
          noteInput.disabled = false;
        }
        removeNoteFromLocalStorage(event.target.closest(".sticky-note").querySelector(".sticky-body p").textContent);
      }
    });
  
    function createStickyNoteElement(content) {
        const newNote = document.createElement("div");
        newNote.classList.add("sticky-note");
    
        const header = document.createElement("div");
        header.classList.add("sticky-header");
        const closeBtn = document.createElement("span");
        closeBtn.classList.add("close-btn");
        closeBtn.textContent = "×";
        header.appendChild(closeBtn);
    
        const body = document.createElement("div");
        body.classList.add("sticky-body");
        const paragraph = document.createElement("p");
        paragraph.textContent = content;
        body.appendChild(paragraph);
    
        newNote.appendChild(header);
        newNote.appendChild(body);
    
        return newNote;    }
  
    function saveNoteToLocalStorage(content) {
      const savedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
      savedNotes.push({ content: content });
      localStorage.setItem("stickyNotes", JSON.stringify(savedNotes));
    }
  
    function removeNoteFromLocalStorage(content) {
      const savedNotes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
      const updatedNotes = savedNotes.filter(note => note.content !== content);
      localStorage.setItem("stickyNotes", JSON.stringify(updatedNotes));
    }
  });
