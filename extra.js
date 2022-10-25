$(document).ready(function() {

    // Add event listener so when enter is pressed while in text field, it is submitted the same as clicking button
    $('#js-word').on('keypress', (e) => {
        if (e.key === 'Enter' && document.getElementById('js-word') == document.activeElement) {
          document.getElementById('js-enter-word').click();
        }
    });

    // Add event listener so that when the button is clicked, the text field empties
    $('#js-enter-word').on('click', () => {
        let inputfield = document.getElementById('js-word');
        if (inputfield.value.length > 0) {
            inputfield.value = '';
        }
    });
});