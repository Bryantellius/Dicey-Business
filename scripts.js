let diceContainer = document.getElementById('diceContainer');
let generatorBtn = document.getElementById('generatorBtn');
let rollBtn = document.getElementById('rollBtn');
let sumBtn = document.getElementById('sumBtn');
let newDie;
let dieArr = [];

generatorBtn.addEventListener('click', () => {
    let die = new Die();
    console.log(die);
})

rollBtn.addEventListener('click', ()=>{
    console.log(dieArr);
    dieArr.forEach((object)=>{
        object.value = Math.round(Math.random() * (6 - 1) + 1);
        newDie.textContent = object.value;
    })
})

class Die {
    constructor() {
        this.roll();
        this.createDie();
        dieArr.push(this);
        
    }

    createDie = () => {
        newDie = document.createElement('div');
        newDie.className = 'die';
        newDie.textContent = this.value;
        diceContainer.appendChild(newDie);
    }
    roll = () => {
        this.value = Math.round(Math.random() * (6 - 1) + 1);

    }

}
