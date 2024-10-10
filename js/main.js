// get total 

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let gategory = document.getElementById("gategory");
let create = document.getElementById("submit");
let count = document.getElementById("count");
let searchOutputs = document.getElementById("search-outputs");
let tbody = document.getElementById("tbody");
let submit = document.getElementById("submit");

let mood = 'creat';
let tmp;

function totalManagement() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040"
    } else {
        total.innerHTML = '';
        total.style.background = "#a00d02"
    }
}

// creat product

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

create.onclick = function () {
    if (title.value != '' && total.innerHTML != '' && gategory.value != '') {
        let newPro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            gategory: gategory.value.toLowerCase(),
        }

        if (mood === 'creat') {
            //count
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = 'creat';
            submit.innerHTML = 'Create';
            count.style.display = 'block'
        }

        // save localStorage

        localStorage.setItem('product',JSON.stringify(dataPro));

        clearData();
        showData();
    }
}

// clear inputs 

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    gategory.value = '';
}

// read

function showData() {
    let table = '';
    totalManagement();
    for (let i = 0; i < dataPro.length;i++) {
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].gategory}</td>
                        <td><button onclick="update(${i})" id="update">update</button></td>
                        <td id="deleteTd"><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr> `;
    }

    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick='deleteAll()' id="delete">Delete All (${dataPro.length})</button>
        `;

    } else {
        btnDelete.innerHTML = '';
    }
}
showData();

// delete 

function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

// delete all

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//update

function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    gategory.value = dataPro[i].gategory;
    count.style.display = "none";
    totalManagement();
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == 'searchTitle') {
        searchMood = 'title';;
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for(let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].gategory}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td id="deleteTd"><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr> `;
            }
        }
    } else {
        for(let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].gategory.includes(value.toLowerCase())) {
                table += `<tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].gategory}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td id="deleteTd"><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr> `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
