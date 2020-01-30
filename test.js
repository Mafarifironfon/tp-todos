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
    for (let toDo of data) {
        html += `

            <div class="d-flex justify-content-center align-items-center">
                <a class="btn btn-light mr-2 mt-3" data-toggle="collapse" href="#collapseExample${toDo.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                   <h5>${toDo.title}</h5> 
                </a>
                <a href="#"><i data-id=${toDo.id} class="far fa-trash-alt pt-4"></i></a>
            </div>
            <div class="collapse" id="collapseExample${toDo.id}">
                <div class="card card-body">
                <h5>${toDo.content}</h5> 
                </div>
            </div>`
    }
    postList.innerHTML = html;
}

getPost();

// AJOUTER UN TODO
$ajouter.addEventListener("click", addPost);
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
