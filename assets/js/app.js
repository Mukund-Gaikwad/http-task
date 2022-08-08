let cl = console.log;

const imgArray = document.getElementById("imgArray");
const tbody = document.getElementById("tbody");
const loader = document.getElementById("loader");

let apiUrl = "https://fakestoreapi.com/products";

let postArray = [];
let newArray = [];

function fetchData(methodName, Url, tempfun, data) {
  loader.classList.remove("d-none");

  let xhr = new XMLHttpRequest();

  xhr.open(methodName, Url);

  xhr.onload = function () {
    cl(xhr.response);
    cl(xhr.status);

    if ((xhr.status === 200 || xhr.status === 201) && xhr.readyState === 4) {
      loader.classList.add("d-none");
      if (methodName === "GET") {
        postArray = JSON.parse(xhr.response);
        templating(postArray);
      }
    }
    if (xhr.status === 404) {
      alert("page not found");
    }
  };
  xhr.send(data);
}
fetchData("GET", apiUrl, templating);

function templating(arr) {
  let result = "";
  arr.forEach((ele) => {
    result += `
        <div class="col-md-3 col-sm-4">
            <div class="card mb-3" data-id="${ele.id}">     
                 <div class="card-body">
                     <figure class="mycard">
                         <img src="${ele.image}" alt="">
                     </figure>
                 <div class="mt-2 text-right">
                    <button class="btn btn-primary btn-lg" onclick="OnAddHandler(this)">Add</button>
                    <button class="btn btn-danger btn-lg d-none"onclick="OnRemoveHandler(this)">Remove</button>
                </div>
            </div>
        </div>
    </div>
        `;
  });
  imgArray.innerHTML = result;
}

function tableData(tableArr) {
  let result = "";
  tableArr.forEach((ele) => {
    result += `
            <tr>
                <td>${ele.id}</td>
                <td><img src="${ele.image}"></td>
                <td>${ele.title}</td>
            </tr>
        `;
  });
  tbody.innerHTML = result;
}

const OnAddHandler = (e) => {
  e.classList.add("d-none");
  e.nextElementSibling.classList.remove("d-none");
  let Id = +e.closest(".card").dataset.id;
  let obj = postArray.find((ele) => {
    return ele.id === Id;
  });
  cl(obj);

  let newobj = {
    id: obj.id,
    image: obj.image,
    title: obj.title,
  };
  // cl(newobj);
  newArray.push(newobj);
  cl(newArray);
  tableData(newArray);

  e.addEventListener("submit", tableData);
};

const OnRemoveHandler = (event) => {
  event.classList.add("d-none");
  event.previousElementSibling.classList.remove("d-none");

  let getId = +event.closest(".card").dataset.id;
  newArray = newArray.filter((ele) => {
    return ele.id != getId;
  });
  tableData(newArray);

  event.addEventListener("click", tableData);
};
