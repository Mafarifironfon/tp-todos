const postList = document.getElementById("listPost");
const form = document.querySelector('form');
const $ajouter = document.querySelector(".Ajouter");

// Ajouter un Todo
$ajouter.addEventListener("click", addPost);
// Afficher un nouveau todo
function addPost() {
const title = document.getElementById("exampleInputEmail1").value;
const content = document.getElementById("exampleInputPassword1").value;
const data = {
    "title": title,
    "content": content
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

// Récupérer la liste des Todos
function getPost() {
    fetch("http://localhost:3000/api/v1/todos/", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => listPost(data))
        .catch(err => handleError(err));
}

function handleError(err) {
    console.error(err);
}

// Afficher la liste des posts
function listPost(data) {
    let html = "";
    for (let toDo of data) {
        html += `

            <p>
                <a class="btn btn-primary mt-3" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    ${toDo.title}
                </a>
                <a href="#"><i data-id=${toDo.id} class="fas fa-trash text-light"></i></a>
            </p>
            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                ${toDo.content}
                </div>
            </div>`
    }
    postList.innerHTML = html;
}

getPost();

document.addEventListener('click', function (e) {
    const $target = e.target;
    if ($target.hasAttribute("data-id")) {
        const $id = Number($target.getAttribute("data-id"));
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
        .then(data => getTodoList(data))
        .catch(err => handleError(err));

}

document.addEventListener('click', function (e) {
    const $target = e.target;
    if ($target.hasAttribute("data-id")) {
      const $id = Number($target.getAttribute("data-id"));
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
        .then(data => getTodoList(data))
        .catch(err => handleError(err));

}