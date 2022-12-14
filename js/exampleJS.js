'use strict';

let searchBtn = document.querySelector('#search-btn');
let searchQuery = document.querySelector('.search');
searchBtn.addEventListener('click', function() { 

    d3.csv("data/test.csv").then(function(data) {
        console.log(data);

        data.map(function(d) {
            if (d.State == searchQuery.value) {
                let li = $('<li>');
                li.append(`<span> ${d.State}</span>`);
                li.append(`<span>: ${d.Name}</span>`);
                li.append(`<span>: ${d.Age}</span>`);
                li.append(`<span>: ${d.Gender}</span>`);
                li.append(`<span>: ${d.PhotoAmt}</span>`);
                li.append(`<img src=${d.PhotoAmt}></img>`);
                $('.searchD3').append(li);
            }
        });

    })
    .catch(function(err) {
        console.error(err);
    });

});

let inputGenerated = {inputHeadline: '', inputFeed: '', id: 2}


let headlineInputElm = document.querySelector('#headline_input');
let feedInputElm = document.querySelector('#feed_input');



headlineInputElm.addEventListener('input', function() {
    inputGenerated.inputHeadline = headlineInputElm.value;   
    //console.log(inputGenerated); 
});

feedInputElm.addEventListener('input', function() {
    inputGenerated.inputFeed = feedInputElm.value;   
    //console.log(inputGenerated); 
});


function createInputElm(input) {
    let pElm = document.createElement('p');
    let h4Elm = document.createElement('h4');
    pElm.textContent = input.inputFeed;
    h4Elm.textContent = input.inputHeadline;    


    let divElm = document.createElement('div');
    divElm.appendChild(h4Elm);
    divElm.appendChild(pElm);
    

    return divElm;
}

function styleDivElm(userInput) {
    let divElement = createInputElm(userInput);
    divElement.classList.add('full-feed');

    let placeholder = userInput.id + '-feed-full';
    divElement.setAttribute('id', placeholder);

    return divElement;
}

function styleHeadingElm(userInput) {
    let headingElm = createInputElm(userInput);
    headingElm.removeChild(headingElm.querySelector('p'));
    headingElm.classList.add('headline');
    
    let headString = userInput.id + '-feed';
    headingElm.setAttribute('id', headString);

    return headingElm;
}

let submitBtn = document.querySelector('#submit_button');

submitBtn.addEventListener('click', function(event) {    
    event.preventDefault();

    inputGenerated.id += 1;

    let finalInput = styleDivElm(inputGenerated);
    let headingInput = styleHeadingElm(inputGenerated);

    headingInput.addEventListener('click', function() {          
        headingInput.style.display = "none";
        finalInput.style.display = "block";    
    }); 
    
    finalInput.addEventListener('click', function() {
        headingInput.style.display = 'inline'; 
        finalInput.style.display = 'none';
    });
    
    //console.log(finalInput);
    //console.log(headingInput);
    let main = document.querySelector('main');

    main.appendChild(headingInput);
    main.appendChild(finalInput);
    
    console.log(inputGenerated); 
    clearInput();
    //console.log(inputGenerated);
});

function clearInput() {
    headlineInputElm.value = '';
    feedInputElm.value = '';
    inputGenerated.important = false;
}
