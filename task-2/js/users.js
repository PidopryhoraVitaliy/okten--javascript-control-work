// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id, name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання, при кліку на яку відбувається перехід на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули
//
// index.html - всі блоки з user - по 2 в рядок. кнопки/посилання розташувати під інформацією про user.

const usersContainer = document.getElementById('users-container');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        // console.log(users);
        usersContainer.innerHTML = '';
        fillUsersContainer(usersContainer, users);
    });

function fillUsersContainer(container, users) {
    users.forEach(user => {
        const div = document.createElement('div');
        div.classList.add('user-card');
        div.classList.add('info-container');
        div.innerHTML = `
            <p><b>ID:</b> ${user.id}</p>
            <p><b>Name:</b> ${user.name}</p>
            <a href="user-details.html?id=${user.id}" class="details-link">View Details</a>
        `;
        container.appendChild(div);
    });
}