document.addEventListener("DOMContentLoaded", function () {
    const groupLists = [
        ["Audi", "Aston Martin", "BMW", "Lamborghini", "Ferrari", "Rolls-Royce", "Maserati", "Bentley", "Jaguar", "Porsche", "Chrysler", "Smart", "Land Rover", "Lincoln", "Dodge", "Volvo", "Lexus", "Jeep", "Citroen", "Cadillac", "Pontiac", "Mazda", "Nissan", "Subaru", "Suzuki", "Kia", "Buick", "Opel", "SEAT", "Fiat", "Skoda", "MINI", "Mitsubishi", "Peugeot", "Mercedes-Benz", "Chevrolet", "Hyundai", "Renault", "Honda", "Volkswagen", "Ford", "Toyota"],
        ["Наруто", "Блич", "Берсерк", "Ванпанчмен", "Евангелион", "Монстр", "Нана", "Паразит", "Тетрадь смерти", "Атака титанов", "Человек-бензопила", "Стальной алхимик", "Токийский гуль", "Крутой учитель Онидзука", "Чёрный клевер", "Сага о Винланде", "Семь смертных грехов", "Ковбой Бибоп", "Врата Штейна", "Моб Психо 100", "Город, в котором меня нет", "Класс убийц", "Нет игры — нет жизни", "Парад смерти", "Безумный азарт", "Самурай Чамплу", "Ангельские ритмы"],
        ["Яблоко", "Банан", "Груша", "Апельсин", "Мандарин", "Персик", "Слива", "Вишня", "Арбуз", "Киви", "Ананас", "Манго", "Грейпфрут", "Лимон", "Клубника", "Черника", "Малина", "Голубика", "Крыжовник", "Априкос", "Кокос", "Папайя", "Авокадо", "Шелковица", "Шиповник", "Кизил", "Гуава", "Фейхоа", "Черешня", "Клюква", "Ирга", "Шелковица", "Персиммон", "Бузина", "Жимолость", "Рябина", "Карамбола", "Личи", "Померанец"]
    ]
    function getRandomWord(groupIndex) {
        return groupLists[groupIndex][Math.floor(Math.random() * groupLists[groupIndex].length)]
    }
    let groupIndex = 0;
    let word = getRandomWord(groupIndex);
    let hiddenWord = "_".repeat(word.length);
    let attempts = 6;

    const wordElement = document.getElementById("word");
    const attemptsElement = document.getElementById("attempts");
    const letterInput = document.getElementById("letter-input");
    const guessButton = document.getElementById("guess-button");
    const themeSelect = document.getElementById("theme-select");
    const gameContainer = document.getElementById("game-container");
    wordElement.textContent = hiddenWord;
    attemptsElement.textContent = attempts;
    themeSelect.addEventListener("change", function () {
        groupIndex = parseInt(themeSelect.value, 10);
        word = getRandomWord(groupIndex);
        hiddenWord = "_".repeat(word.length);
        attempts = 6;
        wordElement.textContent = hiddenWord;
        attemptsElement.textContent = attempts;
        if (themeSelect.value !== "-1") {
            gameContainer.style.display = "block";
        }
        else {
            gameContainer.style.display = "none";
        }
    })
    guessButton.addEventListener("click", checkLetter);
    letterInput.addEventListener("keyup", function(event){
        if(event.key === "Enter"){
            checkLetter()
        }
    })
function checkLetter(){
    const letter = letterInput.value.trim();
    if(letter.length === 1 && /[a-яA-Яa-zA-Z]/.test(letter)){
        if(word.includes(letter)){
            for(let i = 0; i < word.length; i++){
                if(word[i] === letter){
                    hiddenWord = hiddenWord.substr(0, i) + letter + hiddenWord.substr(i + 1);
                    wordElement.innerHTML = "";
                    hiddenWord.split('').forEach((letter, index)=>{
                        const span = document.createElement("span");
                        span.textContent = letter;
                        span.classList.add("word-letter");
                        wordElement.appendChild(span);
                    });
                }
            }
            if(hiddenWord === word){
                alert("Поздравляю,Вы победили!");
                resetGame();
            }
        }
        else{
            attempts--
            attemptsElement.textContent = attempts;
            if(attempts === 0){
                alert("Вы проиграли,правильное слово: " + word);
                resetGame();
            }
            }
            letterInput.value = "";
    }
    else{
        alert("Пожалуйста введите сюда кириллическую или латинскую одну букву");
    }
}
function resetGame(){
    themeSelect.value = "-1";
    gameContainer.style.display = "none";
    groupIndex = 0;
    word = getRandomWord(groupIndex);
    hiddenWord = "_".repeat(word.length);
    attempts = 6;
    wordElement.textContent = hiddenWord;
    attemptsElement.textContent = attempts;
}
})
