const postList = document.getElementById("listPost");
const form = document.querySelector('form');
const $ajouter = document.querySelector(".plus");

// RECUPERER LA LISTE DES TODOS
function getPost() {
    fetch("http://localhost:3000/api/v1/todos/", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => listPost(data))
        .catch(err => handleError(err));
}

// MESSAGE D'ERREUR
function handleError(err) {
    console.error(err);
}

// AFFICHER LA LISTE DES POSTS 
function listPost(data) {
    let html = "";
    tableaufiltre = data.filter(toDo => !toDo.done);
    for (let toDo of tableaufiltre) {
        html += createHtml(toDo)
    }
    postList.innerHTML = html;


function createHtml(toDo) {
    let checkboxAttribute = "";
    if (toDo.done) {
        checkboxAttribute = "checked";
    }
    return `
    <!-- Collapse -->
    <div class="d-flex justify-content-center align-items-center ">

        <!-- Checkedbox -->
        <div class="form-check">
            <input class="form-check-input" data-checked-id=${toDo.id} type="checkbox" ${checkboxAttribute}>
            <label class="form-check-label" for="defaultCheck1"></label>
        </div>
 
        <a class="btn btn-light mr-2 mt-3" data-toggle="collapse" href="#collapseExample${toDo.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
            <h5>${toDo.title}</h5>
        </a>
        <div>
        <a href="#"><i data-delete-id=${toDo.id} class="far fa-trash-alt pt-4"></i></a>        
        <a href="#"><i data-toggle="modal" data-target="#exampleModal${toDo.id}"class="far fa-edit"></i></a>
        </div>
    <div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal${toDo.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <input type="text" class="form-control" id="titre" aria-describedby="emailHelp" value="${toDo.title}">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" id="bodyModal" aria-describedby="emailHelp" value="${toDo.content}">
                    </div>
                        <h5>${new Date(toDo.createdAt).toLocaleString()}</h5>
                    <div class="modal-footer">
                        <button type="button" data-edit-id=${toDo.id} class="btn btn-primary" data-dismiss="modal">Enregistrer</button>
                    </div>
                </div>
            </div>
        </div>   
    </div>
    </div>
        
        <div class="collapse" id="collapseExample${toDo.id}">
            <div class="card card-body">
                <h5>${toDo.content}</h5>
            </div>
        </div>`
    }
}

getPost();

// AJOUTER UN TODO
$ajouter.addEventListener("click", addPost);

function addPost() {
    let title = document.getElementById("title").value;
    let body = document.getElementById("body").value;
    const data = {
        "title": title,
        "content": body
    };

    fetch("http://localhost:3000/api/v1/todos/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => listPost(data))
        .catch(err => handleError(err));    
}

title.value = "";
body.value = "";

// SUPPRIMER UN TODO
document.addEventListener('click', function (e) {
    const $target = e.target;
    if ($target.hasAttribute("data-delete-id")) {
        const $id = Number($target.getAttribute("data-delete-id"));
        deleteTodo($id);
    }
});

function deleteTodo($id) {

    fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => listPost(data))
        .catch(err => handleError(err));
}

// MODIFIER UN TODO
document.addEventListener('click', function (e) {
    const $target = e.target;
    if ($target.hasAttribute("data-edit-id")) {
        const $id = Number($target.getAttribute("data-edit-id"));
        editToDo($id);
    }
});

function editToDo($id) {
    const titleContent = document.getElementById("titre").value;
    const contentContent = document.getElementById("bodyModal").value;

    const data = {
        'title': titleContent,
        'content': contentContent,
    }

    fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => listPost(data))
        .catch(err => handleError(err));
}

  // CHECK TODO
  document.addEventListener('click', function (e) {
    const $target = e.target;
    if ($target.hasAttribute("data-checked-id")) {
        const $id = Number($target.getAttribute("data-checked-id"));
        const isDone = $target.checked;
        todoDone($id, isDone);
    }
});

function todoDone($id, isDone) {
    const data = {
        'done': isDone,
    }

    fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => listPost(data))
        .catch(err => handleError(err));
}