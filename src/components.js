export default class FieldBlock {


    //============== Create new field block =========================//

    createBlock(classes, field, current, previous) {
        let block = document.createElement('div');
        let nav = document.createElement('a');
        let fieldName = document.createElement('p');
        let currentTime = document.createElement('p');
        let previousTime = document.createElement('p');

        block.setAttribute('class', 'field-block field-block--' + classes);
        nav.setAttribute('class', 'navField');
        fieldName.setAttribute('class', 'fieldName');
        currentTime.setAttribute('class', 'currentTime');
        previousTime.setAttribute('class', 'previousTime');

        fieldName.textContent = field;
        currentTime.textContent = current;
        previousTime.textContent = previous;

        block.append(fieldName, nav, currentTime, previousTime);
        return block;
    }


    // =======================Modify a created field Block=============================//

    modifyBlock(field, time, timestamp) {
        const block = document.querySelector('.field-block--' + field);
        block.querySelector('.currentTime').textContent = timestamp[time].current + 'hrs';
        switch (time.toLowerCase()) {
            case 'daily':
                block.querySelector('.previousTime').textContent = 'Yesterday - ' + timestamp[time].previous + 'hrs';
                break;
            case 'weekly':
                block.querySelector('.previousTime').textContent = 'Last Week - ' + timestamp[time].previous + 'hrs';
                break;
            case 'monthly':
                block.querySelector('.previousTime').textContent = 'Last Month - ' + timestamp[time].previous + 'hrs';
                break;
            default:
                block.querySelector('.previousTime').textContent = '----';
                break;
        }

    }
}

