const pairInput = document.getElementById("pairInput");
const pairList = document.getElementById("pairList");

document.getElementById("addBtn").addEventListener("click", addPair);
document.getElementById("deleteBtn").addEventListener("click", deleteSelectedPairs);
document.getElementById("sortNameBtn").addEventListener("click", sortListByName);
document.getElementById("sortValueBtn").addEventListener("click", sortListByValue);
document.getElementById("defaultBtn").addEventListener("click", fillByDefaultValues);

let pairs = [];

function addPair() {
    const inputString = pairInput.value.trim();

    const regex = /^[a-zA-Z0-9]+\s*=\s*[a-zA-Z0-9]+$/;
    if (!regex.test(inputString)) {
        alert("Invalid format. Use Name=Value (Names and Values can contain only alpha-numeric characters)");
        return;
    }

    addPairIntoPairs(inputString);
    renderList();
    pairInput.value = "";
}

function addPairIntoPairs(inputString) {
    const inputValues = inputString.split("=");
    // console.log(inputValues);
    inputValues.map(s => s.trim());
    const [name, value] = inputValues;
    pairs.push({ name, value });
}

function deleteSelectedPairs() {
    // оскільки в коментарях написали, що пари можуть повторюватись, довелось трішки змінити код
    // const selectedValues = Array.from(pairList.selectedOptions).map(option => option.value);
    // pairs = pairs.filter(p => !selectedValues.includes(`${p.name}=${p.value}`));

    // видаляємо виділені елементи
    Array.from(pairList.selectedOptions).forEach(option => option.remove());
    // обновимо pairs з елемента форми
    pairs = [];
    Array.from(pairList.options).forEach(option => addPairIntoPairs(option.value));
    renderList();
}

function sortList(sortBy) {
    pairs.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    renderList();
}

function sortListByName() {
    sortList("name");
}

function sortListByValue() {
    sortList("value");
}

function fillByDefaultValues() {
    pairs = [
        { name: "Test", value: "123" },
        { name: "Hello", value: "World" },
        { name: "Happy", value: "Coding" },
        { name: "Test", value: "123" },
        { name: "Test", value: "123" },
    ];
    renderList();
}

function renderList() {
    pairList.innerHTML = "";
    pairs.forEach(pair => {
        const option = document.createElement("option");
        option.value = `${pair.name}=${pair.value}`;
        option.textContent = `${pair.name}=${pair.value}`;
        pairList.appendChild(option);
    });
}