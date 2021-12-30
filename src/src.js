import FieldBlock from "./components.js";

async function main() {

    // Load the JSON file.
    var response = await fetch(window.location.href + '/data.json').then(response => response.json());

    const frames = document.querySelectorAll('.timeframes');
    const fields = document.querySelector('.fields');

    // We will use the FieldBlock class to create and modify each field block using the JSON data;
    const field = new FieldBlock();
    var className = '';

    //Radio input ('daily', 'weekly', 'monthly') value -- Default 'weekly'.
    var selectedTime = 'weekly';

    // Add eventlistener to each radio element and assign the data-time attribute of the checked one to the 'selectedTime' variable.
    frames.forEach(elm => {
        elm.addEventListener('input', handleChange);

        if (elm.checked) {
            selectedTime = elm.dataset.time;
        }
    });

    // Create a field block based on the JSON data.
    // If we update the JSON file by removing or adding fields, those fields will be dynamically added or removed in our webpage.
    for (let i = 0; i < response.length; i++) {
        className = response[i].title.replace(' ', '-').toLowerCase();
        // Create a new block
        fields.append(field.createBlock(className, response[i].title, response[i].timeframes.weekly.current, response[i].timeframes.weekly.previous));
        // Update the page depending on the selected radio button.('daily', 'weekly', 'monthly').
        field.modifyBlock(className, selectedTime, response[i].timeframes);
    }

    // When the user change the timeframe update the page using the JSON data.
    function handleChange(e) {

        const frames = document.querySelectorAll('.timeframes');
        frames.forEach(elm => {
            if (elm.checked) {
                selectedTime = elm.dataset.time;
            }
        });

        let className = '';
        for (let i = 0; i < response.length; i++) {
            className = response[i].title.replace(' ', '-').toLowerCase();
            field.modifyBlock(className, selectedTime, response[i].timeframes);
        }
    }
}
window.addEventListener('DOMContentLoaded', main);