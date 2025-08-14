console.log("This is a ToDos WebApp");

// Creating all necessary variables
const addBtn = document.getElementById("addNoteBtn");
let notesObj;
const notes = localStorage.getItem('notes');
const noteContainer = document.getElementById("allNotes");
const query = document.getElementById("query");

if (notes == null){
    notesObj = [];
}
else{
    notesObj = JSON.parse(notes);
}


// Show all the notes from the localstorage
const showNotes = ()=>{
    let html = "";
    if (notesObj.length != 0){
        notesObj.forEach((note, index)=>{
            html += `<li class="my-2 mx-4 rounded noteCards" id="noteCard">
            <div class="bg-white border-2 border-gray-200 w-full py-6 px-8  h-auto space-y-4">
                <h1 class="mx-4 font-bold text-xl">${note.title}</h1>
                <p class="mx-4 text-base" id="content">${note.content}</p>
                <button class="mx-4 text-sm order-last bg-blue-600 shadow-inner rounded-md text-white py-2 px-4 hover:bg-blue-700 duration-300 active:bg-blue-500 active:duration-100 md:w-1/4" onclick="deleteNote(this.id)" id="${index}">Delete</button>
            </div>
        </li>`
        });
        noteContainer.innerHTML = html;
    }

    else{
        html = `<p class="text-xl font-semibold" id="content">You are all clear! Nothing to do</p>`
        noteContainer.innerHTML = html
    }
}

// Deleting a note
const deleteNote = (index)=>{
    let a = confirm("Are you sure you want to delete this note")
    if (a == true){
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
    }
    showNotes();
}

// if user adds a note, add it to the local storage
addBtn.addEventListener('click', ()=>{
    let noteContent = document.getElementById("noteContent");
    let ttl = document.getElementById("title");
    if (noteContent.value.trim() == '' && ttl.value.trim() == ''){
alert('Cannot Add Empty Notes');
return;
}
else {
notesObj.push({
        title : ttl.value,
        content:noteContent.value
    });
  localStorage.setItem("notes",JSON.stringify(notesObj));
    noteContent.value = "";
    ttl.value = "";
    showNotes();
}
})


// Search notes
query.addEventListener('input', ()=>{
    let inputVal = query.value;
    let noteCards = document.getElementsByClassName("noteCards");
    Array.from(noteCards).forEach(element => {
        let cardTxt = element.getElementsByTagName('p')[0];
        if (!cardTxt.innerText.toLowerCase().includes(inputVal.toLowerCase())){
            element.style.display = "none";
        }
        else{
            element.style.display = "block";
        }
    });
})

showNotes();
