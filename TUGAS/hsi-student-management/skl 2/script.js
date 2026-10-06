// Variable Global
const API_URL = 'https://dummyjson.com/recipes';
let allRecipes = [];
let favorites = JSON.parse(localStorage.getItem('favRecipes')) || [];

// DOM Elements
const recipeList = document.getElementById('recipe-list');
const searchInput = document.getElementById('search-input');
const mealTypeFilter = document.getElementById('meal-type-filter');
const showFavoritesBtn = document.getElementById('show-favorites-btn');
const favCount = document.getElementById('fav-count');
const recipeModal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.getElementById('close-modal');

// 1. Fetch Data dari API
async function fetchRecipes() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allRecipes = data.recipes;
    displayRecipes(allRecipes);
    updateFavCount();
  } catch (error) {
    recipeList.innerHTML = '<p>Gagal memuat resep. Coba lagi nanti.</p>';
  }
}

// 2. Menampilkan Data ke DOM
function displayRecipes(recipes) {
  recipeList.innerHTML = '';

  if (recipes.length === 0) {
    recipeList.innerHTML = '<p>Tidak ada resep yang ditemukan.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const isFav = favorites.some(fav => fav.id === recipe.id);
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <div class="card-content">
        <h3>${recipe.name}</h3>
        <p>⏱️ ${recipe.prepTimeMinutes} mins | ⭐ ${recipe.rating}</p>
        <div class="card-actions">
          <button class="btn-detail" onclick="openDetail(${recipe.id})">Detail</button>
          <button class="btn-fav" onclick="toggleFavorite(${recipe.id})">
            ${isFav ? '❌ Hapus Fav' : '❤️ Tambah Fav'}
          </button>
        </div>
      </div>
    `;
    recipeList.appendChild(card);
  });
}

// 3. Search & Filter
function filterRecipes() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedType = mealTypeFilter.value;

  const filtered = allRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm);
    const matchesType = selectedType === '' || recipe.mealType.includes(selectedType);
    return matchesSearch && matchesType;
  });

  displayRecipes(filtered);
}

// 4. Modal Detail Recipe
function openDetail(id) {
  const recipe = allRecipes.find(r => r.id === id);
  if (!recipe) return;

  modalBody.innerHTML = `
    <h2>${recipe.name}</h2>
    <img src="${recipe.image}" alt="${recipe.name}" style="width:100%; margin: 10px 0; border-radius:8px;">
    <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
    <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
    <br>
    <h4>Bahan-bahan:</h4>
    <ul>
      ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    <br>
    <h4>Instruksi:</h4>
    <ol>
      ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
    </ol>
  `;
  recipeModal.classList.remove('hidden');
}

// 5. Toggle LocalStorage Favorite
function toggleFavorite(id) {
  const recipe = allRecipes.find(r => r.id === id);
  const index = favorites.findIndex(fav => fav.id === id);

  if (index === -1) {
    favorites.push(recipe);
  } else {
    favorites.splice(index, 1);
  }

  localStorage.setItem('favRecipes', JSON.stringify(favorites));
  updateFavCount();
  filterRecipes(); // Re-render tampilan
}

function updateFavCount() {
  favCount.textContent = favorites.length;
}

// Event Listeners
searchInput.addEventListener('input', filterRecipes);
mealTypeFilter.addEventListener('change', filterRecipes);

showFavoritesBtn.addEventListener('click', () => {
  displayRecipes(favorites);
});

closeModal.addEventListener('click', () => {
  recipeModal.classList.add('hidden');
});

// Run Apps
fetchRecipes();