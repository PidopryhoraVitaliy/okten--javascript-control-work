// в телеграмі дали відповідь, що "name" - являється саме унікальним значенням / ключом (2025-09-01)

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
    const pair = inputValues.map(s => s.trim());
    const [name, value] = pair;
    const searchResult = pairs.find(({name: pairName}) => name === pairName);
    if (searchResult) {
        searchResult.value = value;
    } else {
        pairs.push({ name, value });
    }
}

function deleteSelectedPairs() {
    const selectedValues = Array.from(pairList.selectedOptions).map(option => option.value);
    pairs = pairs.filter(p => !selectedValues.includes(`${p.name}`));
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

function renderList() {
    pairList.innerHTML = "";
    pairs.forEach(pair => {
        const option = document.createElement("option");
        option.value = `${pair.name}`;
        option.textContent = `${pair.name}=${pair.value}`;
        pairList.appendChild(option);
    });
}

// for testing
function fillByDefaultValues() {
    pairs = [
        { name: "Hello", value: "World" },
        { name: "Happy", value: "Coding" },
        { name: "Key", value: "Value" },
        { name: "key", value: "value" },
        { name: "Test", value: "123" },
        { name: "Test2", value: "345" },
    ];
    renderList();
}