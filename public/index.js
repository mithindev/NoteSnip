const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");

getNotes().forEach((note) => {
  const noteEl = createNoteEl(note.id, note.content);
  appEl.insertBefore(noteEl, btnEl);

});

function createNoteEl(id, content) {
  const element = document.createElement("textarea");
  element.classList.add("note");
  element.placeholder = "Empty Note";
  element.value = content;

  element.addEventListener("dblclick", ()=> {
    const warning = confirm(localStorage.getItem("name") + ", Do wanna delete this note?😊");
    if (warning) {
      deleteNote(id, element);
    }
  });


  element.addEventListener("input", ()=> {
    updateNote(id, element.value);
  });

  return element;
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note)=>note.id != id);
  saveNote(notes);
  appEl.removeChild(element);
}

function updateNote(id, content) {
  const notes = getNotes();
  const target = notes.filter((note)=>note.id == id)[0];
  target.content = content;
  saveNote(notes);
}

function addNote() {
  const notes = getNotes(0);

  const noteObj = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteEl = createNoteEl(noteObj.id, noteObj.content);
  appEl.insertBefore(noteEl, btnEl);

  notes.push(noteObj);

  saveNote(notes);
}

function saveNote(notes) {
  localStorage.setItem("note-app", JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click", addNote)


// On loading site, ask for name for personalisation
if (!localStorage.getItem("hasLoadedBefore")) {
  const name = prompt("Please enter a username");
  localStorage.setItem("name", name);
  localStorage.setItem("hasLoadedBefore", true);
  if (!localStorage.getItem('isPageLoaded')) {
    localStorage.setItem('isPageLoaded', true);
    location.reload();
  }
}
else{
  const name = localStorage.getItem("name");
  document.getElementById("name").innerHTML = name;
  document.title = name + "'s Temp Notes📝";
}