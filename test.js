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
    tableaufiltre = data.filter(todo => !todo.done);
    for (let toDo of tableaufiltre) {
        html += `
            <div class="d-flex justify-content-center align-items-center">
                <a class="btn btn-light mr-2 mt-3" data-toggle="collapse" href="#collapseExample${toDo.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <h5>${toDo.title}</h5> 
                </a>
                <a href="#"><i data-delete-id=${toDo.id} class="far fa-trash-alt pt-4"></i></a>
<div>
                <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${toDo.id}">
  Modifier
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal${toDo.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp value="${toDo.title}">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <input type="email" class="form-control" id="content" aria-describedby="emailHelp" value="${toDo.content}">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
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
    postList.innerHTML = html;
}

getPost();

// AJOUTER UN TODO
$ajouter.addEventListener("click", addPost);
function addPost() {
const title = document.getElementById("title").value;
const content = document.getElementById("content").value;
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
        .then(data => getTodoList(data))
        .catch(err => handleError(err));
}

//   // ecoute du click edit du modal qui va fetcher en patch

//   document.addEventListener('click', function (e) {
//     const $target = e.target;
//     if ($target.hasAttribute("data-edit-id")) {
//         const $id = Number($target.getAttribute("data-edit-id"));
//         editToDo($id);
//     }
// });

// //   fonction edit todo : fetch

// function editToDo($id) {
//     const titleContent = document.getElementById("exampleInputEmail1").value;
//     const contentContent = document.getElementById("content").value;

//     const data = {
//         'title': titleContent,
//         'content': contentContent,

//     }

//     fetch(`http://localhost:3000/api/v1/todos/${$id}`, {
//             method: "PATCH",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         })
//         .then(res => res.json())
//         .then(data => getTodoList(data))
//         .catch(err => handleError(err));

// }