// This jQuery function verifies that the HTML document has loaded
$(document).ready(function () {
  // Set constant boggle equal to an anonymous function
  const boggle = (function () {
    // Initialize constant container equal to HTML element id "js-boggle"
    const container = document.getElementById("js-boggle");
    // Initialize array grid to an empty array (i.e. use let versus var to control variable scope throughout task 4.)
    let grid = [];
    // Initialize variable isCustomGrid to false
    let isCustomGrid = false;
    // Declare variable customGrid
    let customGrid;
    // Create global game settings
    // Declare object settings, using the object initializer methodology to add the following
    let settings = {
      gridsize: 4,
      min: 3,
      max: 6,
      letters:
        "AAAAAAAAABBCCDDDDDEEEEEEEEEEEEEFFGGGHHHHIIIIIIIIJKLLLLMMNNNNNOOOOOOOOPPQRRRRRRSSSSSTTTTTTTUUUUVVWWXYYZ",
    };

    function initializeGrid(arg) {
      // Parameter list includes one parameter, arg
      // Initialize variable gridsize equal to zero (i.e. 0)
      let gridsize = 0;
      // Initialize variable setLength equal to zero (i.e. 0)
      let setLength = 0;

      // if the typeof parameter arg is identical to 'number'
      if (typeof arg === "number") {
        // set property gridsize equal to parameter arg
        gridsize = arg;
      }
      // else if Object.prototype.toString.call(arg) is identical to '[object Array]'
      else if (Object.prototype.toString.call(arg) === "[object Array]") {
        // set variable isCustomGrid equal to true
        isCustomGrid = true;
        // set variable customGrid equal to parameter arg
        customGrid = arg;
        // error checking and exception handling
        // do not remove (!important)
        arg.forEach(function (set, i) {
          if (setLength === 0) {
            setLength = set.split("").length;
          }

          if (set.split("").length !== setLength) {
            throw new Error(
              `Custom grid sets must be of equal length. Please check customGrid at index ${i}, ${set}`
            );
          }
        });

        // set property gridsize equal to parameter arg's length property
        gridsize = arg.length;
      }

      // error checking and exception handling
      // do not remove (!important)
      if (gridsize < settings.min || gridsize > settings.max) {
        throw new Error(
          `Grid size must be between ${settings.min} and ${settings.max} inclusive`
        );
      }

      // referencing object settings, set property gridsize equal to variable gridsize
      settings.gridsize = gridsize;
      // return object settings
      return settings;
    } // end function initializeGrid

    function setGrid() {
      // Initialize variable counter to property gridsize of object settings
      let counter = settings.gridsize;

      // If variable isCustomGrid is true
      if (isCustomGrid) {
        // Append each letter to the Boggle board in all uppercase, do not remove (!important)
        customGrid.forEach(function (set) {
          grid.push(set.toUpperCase().split(""));
        });

        // return array grid
        return grid;
      }

      // Loop while variable counter is greater than 0
      while (counter > 0) {
        // Referencing array grid, call function push, pass as an argument function call setLetters()
        // decrement loop control variable counter by one
        grid.push(setLetters());
        counter -= 1;
      }

      // return array grid
      return grid;
    } // end function setGrid

    function setLetters() {
      // Initialize variable i to value 0
      let i = 0;
      // Initialize variable len to property gridsize of object settings
      let len = settings.gridsize;
      // Declare variable randomLetter
      let randomLetter;
      // Initialize array letters to an empty array
      let letters = [];
      // Loop "len" number of times
      for (; i < len; i += 1) {
        // set variable randomLetter equal to object settings, property letter, randomly selecting one of the leters
        randomLetter =
          settings.letters[Math.floor(Math.random() * settings.letters.length)];
        // add randomLetter to array letters
        letters.push(randomLetter);
      } // end loop

      // return array letters
      return letters;
    } // end function setLetters

    function renderGrid() {
      // Initialize variable render to and empty string
      let render = "";

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
        });

        // append to variable render explicity HTML code '</div>'
        render += "</div>";
      });

      // Set variable container, innerHTML, equal to variable render
      container.innerHTML = render;
    } // end function renderGrid

    function init() {
      // If the typeof array arguments at index 0 is NOT identical to explicit text 'undefined'
      if (typeof arguments[0] !== "undefined") {
        // Call funciton initialiseGrid, pass as an argument array arguments, index 0
        initializeGrid(arguments[0]);
      }

      // Call function setGrid
      setGrid();

      // Call function renderGrid
      renderGrid();
    } // end function init

    return init;
    {
      init: init;
    }
  })();
  // end of const boggle = function()

  // Add event listener so when enter is pressed while in text field, it is submitted the same as clicking button
  $("#js-word").on("keypress", (e) => {
    if (
      e.key === "Enter" &&
      document.getElementById("js-word") == document.activeElement
    ) {
      document.getElementById("js-enter-word").click();
    }
  });

  // Add event listener so that when the button is clicked, the text field empties
  $("#js-enter-word").on("click", () => {
    let inputfield = document.getElementById("js-word");
    if (inputfield.value.length > 0) {
      inputfield.value = "";
    }
  });

  // Call boggle init
  boggle.call(boggle.init, 4);
});
// end of $(document).ready(function()

//******** GLOBAL VARIABLES AND FUNCTIONS ********//

// words array initialization
var words = [];

// idx variable initilization
var idx = 0;

function addWord() {
  // Check to see if word already exists
  if (words.includes(document.getElementById("js-word").value) === false) {
    // update words array at index idx to the value of HTML element id "js-word"
    words[idx] = document.getElementById("js-word").value;
    // increment variable idx by one
    idx++;
    // update the value of HTML element id "js-word" to an empty string
    words[idx] = "";
    // call function displayWords, passing zero arguments
  } else {
    // Display duplicate warning for 2 seconds
    $(".warn-duplicate")
      .css("visibility", "visible")
      .show()
      .delay(2000)
      .fadeOut();
  }

  displayWords();
}

function displayWords() {
  // initialize variable wordStr equal to HTML element <hr />
  let wordStr = "<hr>";

  // loop through the array words
  words.forEach((item, index) => {
    wordStr += `${item}<br />`;
  });
  // append to variable wordStr the current element in array words concatenated with HTML element <br />

  // Update the value of HTML element id "js-words-found" to variable wordStr
  document.getElementById("js-words-found").innerHTML = wordStr;
}
