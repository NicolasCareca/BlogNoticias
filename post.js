const API_URL = 'https://api-rest-post-diegocandido.herokuapp.com/postagem/';
const postContainer = document.getElementById('post');
const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

async function fetchPost(postId) {
    try {
        const response = await fetch(API_URL + postId);
        if (!response.ok) {
            throw new Error('Erro ao buscar a postagem');
        }
        const data = await response.json();
        showPost(data);
    } catch (error) {
        console.error('Erro ao buscar a postagem:', error);
    }
}

function showPost(post) {
    const image = post.thumbImage.startsWith('/')
        ? `https://api-rest-post-diegocandido.herokuapp.com${post.thumbImage}`
        : post.thumbImage;

    const postHTML = `
        <div class="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-300">
            <img class="w-full h-60 object-cover" src="${image}" alt="${post.thumbImageAltText}">
            <div class="p-4">
                <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
                <p class="text-gray-700">${post.description}</p>
                <p class="mt-2 text-gray-500">Por ${post.profileName}, ${post.postDate}</p>
          
            </div>
        </div>`;
    
    postContainer.innerHTML = postHTML;
}


const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (postId) {
    fetchPost(postId);
}