const postList = document.getElementById("listPost")

function updateView() {
    fetch("http://localhost:3000/api/v1/todos/")
        .then(res => res.json())
        .then(data => listPost(data))
        .catch(err => handleError(err));
}

// function handleError(err) {
//     console.error(err);
// }

function listPost(data) {
    let html = "";
    for (let toDo of data) {
        html += `
            <div class="col text-center rounded border border-light">
            <h4>Liste des Posts</h4>
            <p>
                <a class="btn btn-primary mt-3" data-toggle="collapse" href="#collapseExample" role="button"
                    aria-expanded="false" aria-controls="collapseExample">
                    ${toDo.title}
                </a>
            </p>
            <div class="collapse" id="collapseExample">
                <div class="card card-body">
                ${toDo.content}
                </div>
            </div>
        </div>
            `
    }
    postList.innerHTML = html;
}


updateView();