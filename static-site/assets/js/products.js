// 商品一覧ページの機能

let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 12;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    setupEventListeners();
    displayProducts();
    updatePagination();
});

// 商品データの読み込み
async function loadProducts() {
    try {
        const response = await fetch('../data/products.json');
        const data = await response.json();
        allProducts = data.products;
        filteredProducts = [...allProducts];
        console.log('商品データを読み込みました:', allProducts.length + '件');
    } catch (error) {
        console.error('商品データの読み込みに失敗:', error);
        showError('商品データの読み込みに失敗しました。しばらく後でもう一度お試しください。');
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    // 検索
    const searchInput = document.getElementById('searchInput');
    const headerSearchInput = document.getElementById('headerSearchInput');
    const headerSearchBtn = document.getElementById('headerSearchBtn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (headerSearchInput) {
        headerSearchInput.addEventListener('input', debounce(handleSearch, 300));
        headerSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (headerSearchBtn) {
        headerSearchBtn.addEventListener('click', handleSearch);
    }

    // フィルタ
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleFilter);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', handleFilter);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', handleSort);
    }
}

// 検索処理
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const headerSearchInput = document.getElementById('headerSearchInput');
    
    const searchTerm = (searchInput?.value || headerSearchInput?.value || '').toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredProducts = [...allProducts];
    } else {
        filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.manufacturer.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // 検索入力を同期
    if (searchInput && headerSearchInput) {
        if (searchInput.value !== headerSearchInput.value) {
            const activeValue = searchInput.value || headerSearchInput.value;
            searchInput.value = activeValue;
            headerSearchInput.value = activeValue;
        }
    }
    
    currentPage = 1;
    applyCurrentFilters();
    displayProducts();
    updatePagination();
}

// フィルタ処理
function handleFilter() {
    applyCurrentFilters();
    currentPage = 1;
    displayProducts();
    updatePagination();
}

// ソート処理
function handleSort() {
    applyCurrentFilters();
    currentPage = 1;
    displayProducts();
    updatePagination();
}

// 現在のフィルタを適用
function applyCurrentFilters() {
    let products = [...filteredProducts];
    
    // カテゴリフィルタ
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter && categoryFilter.value) {
        products = products.filter(product => 
            product.category === categoryFilter.value
        );
    }
    
    // 価格フィルタ
    const priceFilter = document.getElementById('priceFilter');
    if (priceFilter && priceFilter.value) {
        const priceRange = priceFilter.value;
        products = products.filter(product => {
            const price = product.price;
            switch (priceRange) {
                case '0-1000':
                    return price < 1000;
                case '1000-5000':
                    return price >= 1000 && price < 5000;
                case '5000-10000':
                    return price >= 5000 && price < 10000;
                case '10000-50000':
                    return price >= 10000 && price < 50000;
                case '50000-100000':
                    return price >= 50000 && price < 100000;
                case '100000+':
                    return price >= 100000;
                default:
                    return true;
            }
        });
    }
    
    // ソート
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        switch (sortFilter.value) {
            case 'rating':
                products.sort((a, b) => b.rating - a.rating);
                break;
            case 'reviews':
                products.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case 'name':
                products.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
                break;
            case 'price-low':
                products.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                products.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }
    }
    
    filteredProducts = products;
}

// 商品の表示
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    if (productsToShow.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>検索結果が見つかりません</h3>
                <p>検索条件を変更して、もう一度お試しください。</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" 
                     onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400 300\"><rect width=\"400\" height=\"300\" fill=\"%23f0f0f0\"/><text x=\"200\" y=\"150\" text-anchor=\"middle\" dy=\".3em\" font-family=\"Arial\" font-size=\"14\" fill=\"%23999\">画像なし</text></svg>'">
                ${product.category ? `<span class="product-category">${product.category}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">
                    <a href="${product.slug}/index.html">${product.name}</a>
                </h3>
                <p class="product-manufacturer">${product.manufacturer}</p>
                <div class="product-rating">
                    <div class="rating-stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-text">${product.rating.toFixed(1)}</span>
                    <span class="review-count">(${product.reviewCount}件)</span>
                </div>
                <p class="product-description">${truncateText(product.description, 80)}</p>
                <div class="product-price">
                    <span class="price-amount">¥${product.price.toLocaleString()}</span>
                    <span class="price-range">${product.priceRange}</span>
                </div>
            </div>
        </div>
    `).join('');

    // カードクリックイベント
    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                const productId = card.dataset.productId;
                const product = allProducts.find(p => p.id === productId);
                if (product) {
                    window.location.href = `${product.slug}/index.html`;
                }
            }
        });
    });
}

// ページネーションの更新
function updatePagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';
    
    // 前へボタン
    if (currentPage > 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="changePage(${currentPage - 1})">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                前へ
            </button>
        `;
    }

    // ページ番号
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(1)">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">${i}</button>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-dots">...</span>`;
        }
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    }

    // 次へボタン
    if (currentPage < totalPages) {
        paginationHTML += `
            <button class="pagination-btn" onclick="changePage(${currentPage + 1})">
                次へ
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            </button>
        `;
    }

    pagination.innerHTML = `
        <div class="pagination-info">
            ${filteredProducts.length}件中 ${(currentPage - 1) * productsPerPage + 1}-${Math.min(currentPage * productsPerPage, filteredProducts.length)}件を表示
        </div>
        <div class="pagination-buttons">
            ${paginationHTML}
        </div>
    `;
}

// ページ変更
function changePage(page) {
    currentPage = page;
    displayProducts();
    updatePagination();
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 星評価の生成
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // 満星
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star star-full">★</span>';
    }
    
    // 半星
    if (hasHalfStar) {
        starsHTML += '<span class="star star-half">★</span>';
    }
    
    // 空星
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star star-empty">☆</span>';
    }
    
    return starsHTML;
}

// テキストの切り詰め
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// エラー表示
function showError(message) {
    const grid = document.getElementById('productsGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="error-message">
                <div class="error-icon">⚠️</div>
                <h3>エラーが発生しました</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn-primary">再読み込み</button>
            </div>
        `;
    }
}

// デバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}