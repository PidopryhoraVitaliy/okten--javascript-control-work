// На сторінці user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
// user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
//     блоки з короткою іфною про post - в ряд по 5.

const searchParams = new URLSearchParams(window.location.search);
const userId = searchParams.get('id');

// Load User Details
const userDetailsContainer = document.getElementById('user-details-container');

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(user => {
        // console.log(user);
        userDetailsContainer.innerHTML = '';
        fillUserDetails(userDetailsContainer, user);
    });

function fillUserDetails(container, info, marginLeft=0) {
    const marginLeftStep = 20;
    const commonStyle = 'margin-top: 4px;';
    for (const prop in info) {
        const propElement = document.createElement('p');
        const currentStyle = commonStyle + (marginLeft ? 'margin-left: ' + marginLeft + 'px;' : '');
        propElement.setAttribute('style', currentStyle);
        if (isObject(info[prop])) {
            propElement.innerHTML = `<b>${prop}:</b>`;
            fillUserDetails(propElement, info[prop], marginLeft + marginLeftStep);
        } else {
            propElement.innerHTML = `<b>${prop}:</b> ${info[prop]}`;
        }
        container.appendChild(propElement);
    }
}

function isObject(value) {
    return typeof value === 'object' && value !== null;
}

// Load Posts
const loadPostsBtn = document.getElementById('load-posts-btn');
const postsContainer = document.getElementById('posts-container');
const postsLoadingLabel = postsContainer.getElementsByClassName('loading-label')[0];

loadPostsBtn.addEventListener('click', () => {
    postsContainer.querySelectorAll('.post-card').forEach(postCard => postCard.remove());
    postsLoadingLabel.classList.remove('hidden');
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(res => res.json())
        .then(posts => {
            postsLoadingLabel.classList.add('hidden');
            fillPosts(postsContainer, posts);
        });
});

function fillPosts(container, posts) {
    posts.forEach(post => {
        const div = document.createElement('div');
        div.classList.add('post-card');
        div.classList.add('info-container');
        div.innerHTML = `
            <p>${post.title}</p>
            <a href="post-details.html?id=${post.id}" class="details-link">View Post</a>
        `;
        container.appendChild(div);
    });
}