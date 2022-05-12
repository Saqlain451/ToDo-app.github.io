let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");


let deletePost = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    // console.log(data);
    };

let editTask=(e)=>{
   let selectedTask = e.parentElement.parentElement;
   textInput.value = selectedTask.children[0].innerHTML;
   dateInput.value = selectedTask.children[1].innerHTML;
   textarea.value = selectedTask.children[2].innerHTML;
   deletePost(e);
   add.innerHTML="Update" 
}


let addPost = ()=>{
    tasks.innerHTML = "";
    add.innerHTML = "Add";
    data.map((x,y)=>{
        tasks.innerHTML+=`
    <div class = "${y}">
    <span class="fw-bold">${x.text}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.info}</p>

    <span class="options">
      <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
      <i onClick ="deletePost(this)" class="fas fa-trash-alt"></i>
    </span>
  </div>
    `
    })
    
    resetformData();
  
}

let resetformData = ()=>{
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
} 
let data = [];
let storeData = ()=>{
    data.push({
        text : textInput.value,
        date : dateInput.value,
        info : textarea.value
    })
    console.log(data.text);
    console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    addPost();
}
(()=>{
    data = JSON.parse(localStorage.getItem("data")) ||[] ;
    addPost();
    console.log(data);
})()

let formValidation = (e)=>{
          e.preventDefault();
          textInput.value ===''? alert("Title field can not be emty") : storeData();     
}
form.addEventListener("submit",formValidation);