const API_URL = 'https://api-rest-post-diegocandido.herokuapp.com/postagens/';
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const postsContainer = document.getElementById('posts');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

async function fetchPosts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar as postagens');
        }
        const data = await response.json();
        showPosts(data);
    } catch (error) {
        console.error('Erro ao buscar as postagens:', error);
    }
}

function showPosts(posts ) {
    let postsHTML = '';

    posts.forEach((post , index) => {
        const image = post.thumbImage.startsWith('/')
            ? `https://api-rest-post-diegocandido.herokuapp.com${post.thumbImage}`
            : post.thumbImage;

        const postHTML = `
            <div class="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-300">
                <img class="w-full h-48 object-cover" src="${image}" alt="${post.thumbImageAltText}">
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
                    <a href="post.html?id=${index }" class="mt-4 inline-block text-blue-500 hover:underline">Ler Mais</a>
                    <p class="mt-2 text-gray-500">Por ${post.profileName}, ${post.postDate}</p>
                </div>
            </div>`;
        postsHTML += postHTML;
    });

    postsContainer.innerHTML = postsHTML;
}

fetchPosts();