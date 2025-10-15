async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function sortPostsByTitle(posts) {
  return [...posts].sort((a, b) => b.title.length - a.title.length);
}

function sortCommentsByEmail(comments) {
  return [...comments].sort((a, b) => a.email.localeCompare(b.email));
}

function filterUserFields(users) {
  return users.map(({ id, name, username, email, phone }) => ({
    id, name, username, email, phone
  }));
}

function getIncomplete(todos) {
  return todos.filter(todo => !todo.completed);
}

function fetchPostsWithCallback(callback) {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => console.error("Ошибка постов (callback):", err));
}

fetchPostsWithCallback(data => {
  const sorted = sortPostsByTitle(data);
  console.log("📄 Callback: Посты по длине заголовка:", sorted);
});

function fetchCommentsWithCallback(callback) {
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => console.error("Ошибка комментариев (callback):", err));
}

fetchCommentsWithCallback(data => {
  const sorted = sortCommentsByEmail(data);
  console.log("💬 Callback: Комментарии по email:", sorted);
});

function getUsersFiltered() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(users => resolve(filterUserFields(users)))
      .catch(err => reject(err));
  });
}

getUsersFiltered()
  .then(data => console.log("👥 Промис: Отфильтрованные пользователи:", data))
  .catch(err => console.error("Ошибка пользователей:", err));

function getTodosIncomplete() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(todos => {
        const filtered = getIncomplete(todos);
        console.log("📋 Промис: Невыполненные задачи:", filtered);
        console.log(`🔎 Всего: ${filtered.length}`);
        resolve(filtered);
      })
      .catch(err => reject(err));
  });
}

getTodosIncomplete().catch(err => console.error("Ошибка задач:", err));

async function displaySortedPostsAsync() {
  try {
    const posts = await fetchData("https://jsonplaceholder.typicode.com/posts");
    const sorted = sortPostsByTitle(posts);
    console.log("📄 Async: Посты по длине заголовка:", sorted);
    return sorted;
  } catch (err) {
    console.error("Ошибка постов (async):", err);
  }
}

displaySortedPostsAsync();

async function displaySortedCommentsAsync() {
  try {
    const comments = await fetchData("https://jsonplaceholder.typicode.com/comments");
    const sorted = sortCommentsByEmail(comments);
    console.log("💬 Async: Комментарии по email:", sorted);
    return sorted;
  } catch (err) {
    console.error("Ошибка комментариев (async):", err);
  }
}

displaySortedCommentsAsync();
