document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("noteInput");
  const saveButton = document.getElementById("saveButton");
  const downloadButton = document.getElementById("downloadButton");
  const italicButton = document.getElementById("italicButton");
  const boldButton = document.getElementById("boldButton");
  const newNoteButton = document.getElementById("newNoteButton");
  const helpButton = document.getElementById("helpButton");
  const notesContainer = document.getElementById("notesContainer");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");
  const notification = document.getElementById("notification");

  newNoteButton.addEventListener("click", function () {
    sidebar.classList.remove("hidden");
    noteInput.value = ""; // Clear the note input when a new note is created.
  });

  closeSidebarButton.addEventListener("click", function () {
    sidebar.classList.add("hidden");
  });

  loadSavedNotes();

  saveButton.addEventListener("click", function () {
    const noteText = noteInput.value.trim(); // Trim leading/trailing spaces
    if (noteText.length > 0) {
      saveNoteToStorage(noteText);
    } else {
      showNotification("Note cannot be empty.");
    }
  });

  downloadButton.addEventListener("click", function () {
    const noteText = noteInput.value;
    const noteTitleElement = document.querySelector(".note-title.active");
    const newTitle = noteTitleElement ? noteTitleElement.textContent : "Untitled Note";
    downloadTextFile("my_note.txt", noteText, newTitle);
  });

  italicButton.addEventListener("click", function () {
    toggleItalicStyle();
  });

  boldButton.addEventListener("click", function () {
    toggleBoldStyle();
  });

  helpButton.addEventListener("click", function () {
    alert("This is a note-taking app. You can type your notes here and use the formatting buttons to style your text.");
  });

  noteInput.addEventListener("input", function () {
    // You can add validation or character counting logic here if needed.
  });

  function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  }

  function loadSavedNotes() {
    chrome.storage.sync.get(["notes", "editedTitles"], function (result) {
      const notes = result.notes || [];
      const editedTitles = result.editedTitles || {};

      notesContainer.innerHTML = "";
      notes.forEach(function (note, index) {
        const noteElement = createNoteElement(note, index, editedTitles[index]);
        notesContainer.appendChild(noteElement);
      });
    });
  }

  function saveNoteToStorage(noteText) {
    chrome.storage.sync.get(["notes", "editedTitles"], function (result) {
      const notes = result.notes || [];
      const editedTitles = result.editedTitles || {};

      notes.push(noteText);
      editedTitles[notes.length - 1] = "Untitled Note"; // Set an initial title for the new note

      chrome.storage.sync.set({ "notes": notes, "editedTitles": editedTitles }, function () {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          showNotification("Failed to save the note.");
        } else {
          showNotification("Note saved successfully!");
          clearNoteInput();
          loadSavedNotes();
        }
      });
    });
  }

  function createNoteElement(noteText, index, editedTitle) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    const noteTitle = editedTitle || (index === 0 ? "Untitled Note" : `Untitled Note ${index}`);
    noteElement.innerHTML = `<span class="note-title" data-index="${index}">${noteTitle}</span><button class="edit-button" data-index="${index}">Edit</button><button class="delete-button" data-index="${index}">X</button>`;
    noteElement.addEventListener("click", function () {
      noteInput.value = noteText;
    });

    const deleteButton = noteElement.querySelector(".delete-button");
    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      deleteNoteByIndex(index);
    });

    const editButton = noteElement.querySelector(".edit-button");
    editButton.addEventListener("click", function (event) {
      event.stopPropagation();
      changeNoteTitle(index);
    });

    return noteElement;
  }

  function deleteNoteByIndex(index) {
    chrome.storage.sync.get(["notes", "editedTitles"], function (result) {
      const notes = result.notes || [];
      const editedTitles = result.editedTitles || {};

      if (index >= 0 && index < notes.length) {
        notes.splice(index, 1);
        delete editedTitles[index]; // Remove the edited title as well

        chrome.storage.sync.set({ "notes": notes, "editedTitles": editedTitles }, function () {
          if (!chrome.runtime.lastError) {
            loadSavedNotes();
          } else {
            showNotification("Failed to delete the note.");
          }
        });
      }
    });
  }

  function toggleItalicStyle() {
    noteInput.style.fontStyle = noteInput.style.fontStyle === "italic" ? "normal" : "italic";
  }

  function toggleBoldStyle() {
    noteInput.style.fontWeight = noteInput.style.fontWeight === "bold" ? "normal" : "bold";
  }

  function clearNoteInput() {
    noteInput.value = "";
  }

  function downloadTextFile(filename, content, title) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title + ".txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function changeNoteTitle(index) {
    const noteTitleElement = document.querySelector(`.note-title[data-index="${index}`);
    const currentTitle = noteTitleElement.textContent;
    const newTitle = prompt("Enter a new title:", currentTitle);

    if (newTitle !== null && newTitle.trim() !== "") {
      noteTitleElement.textContent = newTitle;
      noteTitleElement.classList.add("active");
      updateSavedNoteTitle(index, newTitle);
    }
  }

  function updateSavedNoteTitle(index, newTitle) {
    chrome.storage.sync.get(["notes", "editedTitles"], function (result) {
      const notes = result.notes || [];
      const editedTitles = result.editedTitles || {};

      if (index >= 0 && index < notes.length) {
        notes[index] = newTitle + "\n" + notes[index].split("\n").slice(1).join("\n");
        editedTitles[index] = newTitle; // Store the edited title

        chrome.storage.sync.set({ "notes": notes, "editedTitles": editedTitles }, function () {
          if (!chrome.runtime.lastError) {
            showNotification("Title updated successfully!");
          } else {
            showNotification("Failed to update the title.");
          }
        });
      }
    });
  }
});
