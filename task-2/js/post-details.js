// На сторінці post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули.
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

// post-details.html - блок з інфою про пост зверху. Коментарі - по 4 в ряд.

const searchParams = new URLSearchParams(window.location.search);
const postId = searchParams.get('id');

// Post Details
const postDetailsContainer = document.getElementById('post-details-container');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(post => {
        postDetailsContainer.innerHTML = '';
        fillPostDetails(postDetailsContainer, post);
    });

function fillPostDetails(container, post) {
    container.innerHTML = `
        <p><b>User ID:</b> ${post.userId}</p>
        <p><b>Post ID:</b> ${post.id}</p>
        <p><b>Title:</b> ${post.title}</p>
        <p><b>Body:</b> ${post.body}</p>
    `;
}

// Comments
const commentsContainer = document.getElementById('comments-container');

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(res => res.json())
    .then(comments => {
        commentsContainer.innerHTML = '';
        fillComments(commentsContainer, comments);
    });

function fillComments(container, comments) {
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.classList.add('comment-card');
        div.classList.add('info-container');
        div.innerHTML = `
            <p><b>ID:</b> ${comment.id}</p>
            <p><b>Name:</b> ${comment.name}</p>
            <p><b>Email:</b> ${comment.email}</p>
            <p>${comment.body}</p>
        `;
        container.appendChild(div);
    });
}