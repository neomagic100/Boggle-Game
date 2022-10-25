// This jQuery function verifies that the HTML document has loaded
$(document).ready(function () {

    const boggle = function() {

        // Initialize constant container equal to HTML element id "js-boggle"
        const container = document.getElementById("js-boggle");

        // Initialize array grid to an empty array (i.e. use let versus var to control variable scope throughout task 4.)
        let grid = new Array();

        // Initialize variable isCustomGrid to false
        var isCustomGrid = false;

        // Declare variable customGrid
        var customGrid;

        // Create global game settings
        // Declare object settings, using the object initializer methodology to add the following
        // properties/values
        var settings = {
            'gridsize': 4,
            'min': 3,
            'max': 6,
            'letters': 'AAAAAAAAABBCCDDDDDEEEEEEEEEEEEEFFGGGHHHHIIIIIIIIJKLLLLMMNNNNNOOOOOOOOPPQRRRRRRSSSSSTTTTTTTUUUUVVWWXYYZ'
        };

        // Write function initializeGrid to do the following
        function initializeGrid(arg) {
            console.log('init grid function');
            // Parameter list includes one parameter, arg
            // Initialize variable gridsize equal to zero (i.e. 0)
            let gridsize = 0;
            // Initialize variable setLength equal to zero (i.e. 0)
            let setLength = 0;
            // if the typeof parameter arg is identical to 'number'
            if (typeof (arg) === 'number') {
                // set property gridsize equal to parameter arg
                gridsize = arg;
            }
            // else if Object.prototype.toString.call(arg) is identical to '[object Array]'

            else if (Object.prototype.toString.call(arg) === '[object Array]') {
                // set variable isCustomGrid equal to true
                isCustomGrid = true;
                // set variable customGrid equal to parameter arg
                customGrid = arg;
                // error checking and exception handling
                // do not remove (!important)
                arg.forEach(function (set, i) {
                    if (setLength === 0) {
                        setLength = set.split('').length;
                    }

                    if (set.split('').length !== setLength) {
                        throw new Error(`Custom grid sets must be of equal length. Please check customGrid at index ${i}, ${set}`);
                    }
                });

                // set property gridsize equal to parameter arg's length property
                gridsize = arg.length;
            }

            // error checking and exception handling
            // do not remove (!important)
            if (gridsize < settings.min || gridsize > settings.max) {
                throw new Error(`Grid size must be between ${settings.min} and ${settings.max} inclusive`);
            }

            // referencing object settings, set property gridsize equal to variable gridsize
            settings.gridsize = gridsize;
            // return object settings

            return settings;
        } // end function initializeGrid


        // Write function setGrid to do the following
        function setGrid() {
            console.log('setGrid called');
            // Initialize variable counter to property gridsize of object settings
            let counter = settings.gridsize;
            // If variable isCustomGrid is true
            if (isCustomGrid) {
                // Append each letter to the Boggle board in all uppercase, do not remove (!important)
                customGrid.forEach(function (set) {
                    grid.push(set.toUpperCase().split(''));
                });

                // return array grid
                return grid;
            }

            // Loop while variable counter is greater than 0 
            // Referencing array grid, call function push, pass as an argument function call setLetters()
            // decrement loop control variable counter by one


            /* EXPERIMENTAL CODE */

            if (counter <= 0) { counter = 4; }
            /* END EXPERIMENTAL CODE */

            while (counter > 0) {
                grid.push(setLetters());
                counter--;
            }

            return grid;
            // return array grid
        } // end function setGrid


        // Write function setLetters to do the following
        function setLetters() {
            console.log('setLetters called');
            // Initialize variable i to value 0
            let i = 0;
            // Initialize variable len to property gridsize of object settings
            let len = object.gridsize;
            // Declare variable randomLetter
            let randomLetter;
            // Initialize array letters to an empty array
            let letters = new Array();
            // Loop "len" number of times
            for (; i < len; i++) {
                // set variable randomLetter equal to object settings, property letter, randomly selecting one of the leters
                randomLetter = settings.letters[Math.floor(Math.random() * settings.letters.length)];
                // add randomLetter to array letters
                letters.push(randomLetter);
            } // end loop

            // return array letters
            return letters;
        } // end function setLetters


        // Write function renderGrid to do the following
        function renderGrid() {
            console.log('render grid');

            // Initialize variable render to and empty string
            let render = '';

            // Reference array grid, call function .forEach() 
            // Function .forEach() receives one parameter, an anonymous function
            // anonymous function receives one parameter, row
            grid.forEach((row) => {
                // in the anonymous function, append to variable render explicity HTML code '<div class="row">'
                render += '<div class="row">';

                // Reference parameter row, call function .forEach
                // Function .forEach() receives one parameter, an anonymous function
                // anonymous function receives two parameters, (letter, i)
                row.forEach((letter, i) => {

                    // in the anonymous function, append to variable render explicity HTML code `<span> ${letter} </span>`
                    render += `<span> ${letter} </span>`;
                })

                // append to variable render explicity HTML code '</div>'
                render += '</div>';
            })

            // Set variable container, innerHTML, equal to variable render
            container.innerHTML = render;

        } // end function renderGrid

        // Write function init to do the following
        function init() {
            console.log('in init');

            // If the typeof array arguments at index 0 is NOT identical to explicit text 'undefined' 
            // Call funciton initialiseGrid, pass as an argument array arguments, index 0
            if (typeof (arguments[0]) !== 'undefined') {
                initializeGrid(arguments[0]);
            }

            // Call function setGrid
            setGrid();
            // Call function renderGrid
            renderGrid();
        }// end function init


        // call function init
        return
        {
            init: init
        };

       
    }();
    // end of const boggle = function()


    // Referencing object boggle, call function init, pass as an argument the value of 4 (i.e. this the size of the Boggle board)
    boggle().init(4);


});
// end of $(document).ready(function()


//******** GLOBAL VARIABLES AND FUNCTIONS ********//

// words array initialization
let words = new Array();

// idx variable initilization
let idx = 0;

// function addWord 
function addWord() {

    // update words array at index idx to the value of HTML element id "js-word"
    words[idx] = document.getElementById("js-word").value;

    // increment variable idx by one
    idx++;

    // update the value of HTML element id "js-word" to an empty string
    words[idx] = document.getElementById("js-word");
    words[idx] = '';

    // call function displayWords, passing zero arguments
    displayWords();
}

// function displayWords
function displayWords() {

    let wordStr = '<hr>';

    words.forEach((item, index) => {
        wordStr += `${item}<br />`;
    });

    // Update the value of HTML element id "js-words-found" to variable wordStr
    document.getElementById("js-words-found").innerHTML = wordStr;
}
