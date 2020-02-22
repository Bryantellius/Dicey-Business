let diceContainer = document.getElementById('diceContainer');
let generatorBtn = document.getElementById('generatorBtn');
let rollBtn = document.getElementById('rollBtn');
let sumBtn = document.getElementById('sumBtn');
let feedback = document.getElementById('feedback');
let newDie;
let dieArr = [];

generatorBtn.addEventListener('click', () => {
    let die = new Die();
    console.log(die);
})

rollBtn.addEventListener('click', () => {
    console.log(dieArr);
    dieArr.forEach((object) => {
        object.value = Math.round(Math.random() * (6 - 1) + 1);
        object.div.textContent = object.value;
    })
})

sumBtn.addEventListener('click', () => {
    const sum = (acc, object) => acc + object.value;
    if(dieArr.length===1){
        feedback.textContent = "The die's value is " + dieArr[0].value;
    }else{
        feedback.textContent = 'The sum of the dice = ' + dieArr.reduce(sum, 0);
    }
})

class Die {
    constructor() {
        this.value;
        this.div;
        this.roll();
        this.createDie();
        dieArr.push(this);
    }

    createDie = () => {
        newDie = document.createElement('div');
        newDie.className = 'die';
        newDie.textContent = this.value;
        newDie.addEventListener('click', (event) => {
            this.roll();
            this.div.textContent = this.value;
            event.preventDefault();
        })
        newDie.addEventListener('dblclick', () => {
            this.div.remove();
            dieArr.forEach((object) => {
                if (object === this) {
                    dieArr = dieArr.filter((object) => !(object === this));
                }
            })

        })
        this.div = newDie;
        diceContainer.appendChild(newDie);
    }

    roll = () => {
        this.value = Math.round(Math.random() * (6 - 1) + 1);
    }

}
