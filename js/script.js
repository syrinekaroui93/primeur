// global variables
var countries = [];

window.onload = function exampleFunction() {
    // Loading all countries
    readJSONFileContent('./assets/data/countries.json');
}

document.addEventListener('DOMContentLoaded', function() {

    // local variables
    var input = document.querySelector('input');

    // functions
    function autocomplete(val) {
        // update new displayed countries
        var countries_return = [];
        for (i = 0; i < countries.length; i++) {
            if (val.toUpperCase() === countries[i].name.toUpperCase().slice(0, val.length)) {
                countries_return.push(countries[i]);
            }
        }
        return countries_return;
    }

    // Filter countries according to user input
    input.onkeyup = function(e) {
        input_val = this.value; // updates the variable on each ocurrence

        if (input_val.length > 0) {
            var countries_to_show = [];

            autocomplete_results = document.getElementById("autocomplete-results");
            autocomplete_results.innerHTML = '';
            countries_to_show = autocomplete(input_val);

            // insert new elements into the list of countries (update <ul> element children)
            for (i = 0; i < countries_to_show.length; i++) {
                autocomplete_results.innerHTML += '<li>' + countries_to_show[i].name + '</li>';

            }
            autocomplete_results.style.display = 'block';
        } else {
            countries_to_show = [];
            autocomplete_results.innerHTML = '';
        }
    }
});

function openFile() {
    // download test file
    window.open('./assets/files/Test.pdf');
}

// read data file
function readJSONFileContent(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = false;

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if ((JSON.parse(this.response)).countries.length > 0) {
                countries = (JSON.parse(this.response)).countries;
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
    xhttp.onerror = function(XMLHttpRequest, textStatus, errorThrown) {
        alert('The countries file failed to load. Make sure the web server is running');
        console.log(JSON.stringify(XMLHttpRequest));
    };
}