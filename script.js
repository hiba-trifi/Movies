// HEADER STYLE ///////////////////
var header = document.getElementById('header')
var modeCheck
function mode() {
    if (document.getElementById('mySwitch').checked) {
        modeCheck == false
        header.style.backgroundColor = "#FFC001"
        header.style.transition = "0.5s"
        document.getElementById('boody').style.backgroundColor = "#1E0E34"
        document.querySelector('.table').style.borderColor = "white"
        document.getElementById('tbody').style.color = "white"
        document.querySelector('.fa-solid').style.color = "#FFC001"
        document.querySelector('.btn').style.backgroundColor = "#1E0E34"
        document.getElementById('name1').style.display = "block"
        document.getElementById('name2').style.display = "none"
        document.getElementById('darkMod').style.color = "#1E0E34"
        document.getElementById('headers').style.color = "#FFC001"
    }
    else {
        modeCheck == true
        header.style.backgroundColor = "#1E0E34"
        header.style.transition = "0.5s"
        document.getElementById('boody').style.backgroundColor = "white"
        document.querySelector('.table').style.borderColor = "#1E0E34"
        document.getElementById('tbody').style.color = "#1E0E34"
        document.querySelector('.fa-solid').style.color = "#1E0E34"
        document.querySelector('.btn').style.backgroundColor = "#FFC001"
        document.getElementById('name1').style.display = "none"
        document.getElementById('name2').style.display = "block"
        document.getElementById('darkMod').style.color = "#FFC001"
        document.getElementById('headers').style.color = "#FFC001"
    }
}
function show() {
    header.style.opacity = "1"
}
const checkpoint = 180;
window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll < checkpoint) {
        header.style.transition = "0.6s"
        header.style.opacity = "1"
    } else {
        header.style.opacity = "0.8"
    }

});


// XHTTP REQUEST  ////////////////////////////////////
var xhttp = new XMLHttpRequest();
xhttp.open('GET', "data.json");
xhttp.onreadystatechange = function () {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var data = JSON.parse(xhttp.responseText)
        for (let i = 0; i < data.movies.length; i++) {
            console.log(data.movies[i])

            //  TABLE FILL ////////////////////////////////////
            // ROW & CELLS CREATE /////////////////////////////
            var table = document.getElementById("tbody");
            for (movies in data) {
                var row = table.insertRow();
                var cell2 = row.insertCell();
                var cell1 = row.insertCell();
                var cell3 = row.insertCell();
                var cell4 = row.insertCell();
                var cell5 = row.insertCell();
                var cell6 = row.insertCell();
                var cell7 = row.insertCell();
            }
            // CELLS CONTENT ////////////////////////
            cell1.innerHTML = "<a target='_blank' href=" + data.movies[i].Poster + "><img class='img-fluid' src=" + data.movies[i].Poster + " ></a>"
            cell2.innerHTML = data.movies[i].title;
            cell3.innerHTML = data.movies[i].director;
            cell4.innerHTML = data.movies[i].time;
            cell5.innerHTML = data.movies[i].yearOfProducyion;
            for (let j = 0; j < data.movies[i].Festivals.length; j++) {
                cell6.innerHTML += "<li>" + data.movies[i].Festivals[j] + "</li>";
            }
            for (let k = 0; k < data.movies[i].Actors.length; k++) {
                cell7.innerHTML += "<li> <br> Nom" + " : " + data.movies[i].Actors[k].name + "<br>" + "Prénom " + " : " + data.movies[i].Actors[k].lastName + "<br>" + "Nationalité" + " : " + data.movies[i].Actors[k].nationality + "<br> </li>";
            }
        };
        // SEARCH /////////////////////////////////////////
        var input = document.querySelector('.form-control')
        var table = document.getElementById('table');
        input.addEventListener('input', () => {
            table.querySelectorAll('tr').forEach(row => row.hidden = row.cells[0].innerText.toUpperCase().indexOf(input.value.toUpperCase()) === -1)
        })
        ///// SORT ////////////////////////////
        th = document.getElementsByTagName('th')
        for (let c = 0; c < th.length; c++) {
            th[c].addEventListener('click', item(c))
        }
        function item(c) {
            return function () {
                sortTable(c)
            }
        }
        function sortTable(c) {
            var table = document.getElementById("table");
            var switching = true;
            while (switching) {
                switching = false;
                var rows = table.rows;
                for (var z = 1; z < (rows.length - 1); z++) {
                    shouldSwitch = false;
                    var x = rows[z].getElementsByTagName("TD")[c];
                    var y = rows[z + 1].getElementsByTagName("TD")[c];
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        rows[z].parentNode.insertBefore(rows[z + 1], rows[z]);
                        switching = true;
                        break;
                    }
                }
            }
        }


    }
}
xhttp.send()


