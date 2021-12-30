import FieldBlock from "./components.js";

async function main() {

    const frames = document.querySelectorAll('.timeframes');
    var selectedTime = 'weekly';
    frames.forEach(elm => {
        elm.addEventListener('input', handleChange);

        if (elm.checked) {
            selectedTime = elm.dataset.time;
        }
    });
    var response = await fetch('../data.json').then(response => response.json());


    const fields = document.querySelector('.fields');
    const field = new FieldBlock();
    var className = '';
    console.log(response);
    for (let i = 0; i < response.length; i++) {
        className = response[i].title.replace(' ', '-').toLowerCase();
        fields.append(field.createBlock(className, response[i].title, response[i].timeframes.weekly.current, response[i].timeframes.weekly.previous));
        field.modifyBlock(className, selectedTime, response[i].timeframes);
    }

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