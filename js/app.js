const addBtn = document.querySelector("#addBtn")
const main = document.querySelector(".main");

let i = 0;
addBtn.addEventListener("click", function () {
    AddNote();
    // alert((++i)+" note added " );
    // console.log("added note : " + (i));
})


const SaveNote = () => {
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    // console.log(data);

        //below logic to add atleast one note
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data));
    }
    

}

const AddNote = (text ="") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool-bar">
    <div class="option">
    <img src="img/save.jpg" alt="" class="save">
    <img src="/img/trash-bin.jpg" alt="" class="trash-bin">
    </div>
    </div>  
    <textarea >${text}</textarea>
    `;
    
    // now to add some event  listners like for the save and delete
    
    note.querySelector(".trash-bin").addEventListener(
        "click",
        function () {
            note.remove();
            SaveNote();
        }
        )
        
        //this function will work so as to save in local 
        
        note.querySelector(".save").addEventListener(
            
            "click", function () {
                SaveNote()
            }
            
    )
    note.querySelector("textarea").addEventListener(

        "focusout",
        function () {
            SaveNote();
        }
    )
            main.appendChild(note);
            SaveNote(); // 
        }
        //self calling funciton so that on page load last saved notes could be retrieved
        (
            function () {
                const lsNotes = JSON.parse(localStorage.getItem("notes"));
                if (lsNotes === null) {
                    AddNote();
                }
                else {
                    lsNotes.forEach(
                        (lsNotes) => {
                            AddNote(lsNotes);
                        }
                    )
                }
            }
            )()
            