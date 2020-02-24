let diceContainer = document.getElementById('diceContainer');
let generatorBtn = document.getElementById('generatorBtn');
let rollBtn = document.getElementById('rollBtn');
let sumBtn = document.getElementById('sumBtn');
let yahtzeeBtn = document.getElementById('yahtzeeBtn');
let orderBtn = document.getElementById('orderBtn');
let feedback = document.getElementById('feedback');
let newDie;
let dieArr = [];
let temp;
let dieFaces = [
    'https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png',
    'https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png',
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png',
    'https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png',
    'https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png',
    'https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png'
];

let clearFeedback = () => feedback.textContent = ' ';

let swap = (array, firstIndex, secondIndex) => {
    let temp = array[firstIndex].value;
    array[firstIndex].value = array[secondIndex].value;
    array[secondIndex].value = temp;
};

let indexOfMinimum = (array, startIndex) => {

    let minValue = array[startIndex].value;
    let minIndex = startIndex;

    for (let i = minIndex + 1; i < array.length; i++) {
        if (array[i].value < minValue) {
            minIndex = i;
            minValue = array[i].value;
        }
    }
    return minIndex;
};

let selectionSort = (array) => {
    let k;
    for (let i = 0; i < array.length; i++) {
        k = indexOfMinimum(array, i);
        swap(array, i, k);
    }
};

let style = (object) => {
    object.div.style = `background-image: url(${dieFaces[object.value - 1]})`;
}

let roll = (object) => {
    object.value = Math.round(Math.random() * (6 - 1) + 1);
}

let checkYahtzee = () => {
    if (dieArr.length === 5) {
        yahtzeeBtn.removeAttribute('disabled');
    } else {
        yahtzeeBtn.setAttribute('disabled', '');
    }
}

generatorBtn.addEventListener('click', () => {
    let die = new Die();
    clearFeedback();
    checkYahtzee();
})

rollBtn.addEventListener('click', () => {
    dieArr.forEach((object) => {
        // object.div.textContent = object.value;
        roll(object);
        style(object);
    })
    clearFeedback();
})

sumBtn.addEventListener('click', () => {
    const sum = (acc, object) => acc + object.value;
    if (dieArr.length === 1) {
        feedback.textContent = "The die's value is " + dieArr[0].value;
    } else {
        feedback.textContent = 'The sum of the dice = ' + dieArr.reduce(sum, 0);
    }
})

orderBtn.addEventListener('click', () => {
    selectionSort(dieArr);
    dieArr.forEach((object) => {
        // object.div.textContent = object.value;
        style(object);
    })
})

yahtzeeBtn.addEventListener('click', () => {

    while (!(dieArr.every((object) => object.value === dieArr[0].value))) {
        dieArr.forEach((object) => {
            roll(object);
            style(object);
        })
    }
    feedback.textContent = 'YAHTZEE!!!!!!!';
})

class Die {
    constructor() {
        this.value;
        this.div;
        roll(this);
        this.createDie();
        style(this);
        dieArr.push(this);
    }

    createDie = () => {
        newDie = document.createElement('div');
        newDie.className = 'die';
        // newDie.textContent = this.value;
        newDie.addEventListener('click', (event) => {
            roll(this);
            // this.div.textContent = this.value;
            event.preventDefault();
            clearFeedback();
        })
        newDie.addEventListener('dblclick', () => {
            this.div.remove();
            dieArr.forEach((object) => {
                if (object === this) {
                    dieArr = dieArr.filter((object) => !(object === this));
                }
            })
            clearFeedback();
            checkYahtzee();
        })
        this.div = newDie;
        diceContainer.appendChild(newDie);
    }
}