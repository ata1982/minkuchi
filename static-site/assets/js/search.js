// 統合検索ページの機能

let allCompanies = [];
let allProducts = [];
let searchResults = [];
let currentPage = 1;
let currentSearchType = 'all';
const resultsPerPage = 10;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    setupEventListeners();
    handleURLParams();
});

// データの読み込み
async function loadData() {
    try {
        // 企業データを読み込み
        const companiesResponse = await fetch('../data/companies.json');
        const companiesData = await companiesResponse.json();
        allCompanies = companiesData.companies || [];

        // 商品データを読み込み
        const productsResponse = await fetch('../data/products.json');
        const productsData = await productsResponse.json();
        allProducts = productsData.products || [];

        console.log('データを読み込みました:', {
            companies: allCompanies.length,
            products: allProducts.length
        });
    } catch (error) {
        console.error('データの読み込みに失敗:', error);
        showError('データの読み込みに失敗しました。');
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    // 検索入力
    const mainSearchInput = document.getElementById('mainSearchInput');
    const headerSearchInput = document.getElementById('headerSearchInput');
    const mainSearchBtn = document.getElementById('mainSearchBtn');
    const headerSearchBtn = document.getElementById('headerSearchBtn');

    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', debounce(handleSearch, 300));
        mainSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    if (headerSearchInput) {
        headerSearchInput.addEventListener('input', debounce(handleSearch, 300));
        headerSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    if (mainSearchBtn) {
        mainSearchBtn.addEventListener('click', handleSearch);
    }

    if (headerSearchBtn) {
        headerSearchBtn.addEventListener('click', handleSearch);
    }

    // フィルタタブ
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveTab(tab.dataset.type);
            handleSearch();
        });
    });

    // フィルタ
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleSearch);
    }

    if (sortFilter) {
        sortFilter.addEventListener('change', handleSearch);
    }

    // クイックリンク
    const quickLinkBtns = document.querySelectorAll('.quick-link-btn');
    quickLinkBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.dataset.query;
            if (mainSearchInput) mainSearchInput.value = query;
            if (headerSearchInput) headerSearchInput.value = query;
            handleSearch();
        });
    });
}

// URLパラメータの処理
function handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const type = urlParams.get('type');

    if (query) {
        const mainSearchInput = document.getElementById('mainSearchInput');
        const headerSearchInput = document.getElementById('headerSearchInput');
        if (mainSearchInput) mainSearchInput.value = query;
        if (headerSearchInput) headerSearchInput.value = query;
    }

    if (type && ['all', 'companies', 'products'].includes(type)) {
        setActiveTab(type);
    }

    if (query) {
        handleSearch();
    }
}

// アクティブタブの設定
function setActiveTab(type) {
    currentSearchType = type;
    
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.type === type);
    });
}

// 検索処理
function handleSearch() {
    const mainSearchInput = document.getElementById('mainSearchInput');
    const headerSearchInput = document.getElementById('headerSearchInput');
    
    const searchTerm = (mainSearchInput?.value || headerSearchInput?.value || '').toLowerCase().trim();
    
    // 検索入力を同期
    if (mainSearchInput && headerSearchInput) {
        if (mainSearchInput.value !== headerSearchInput.value) {
            const activeValue = mainSearchInput.value || headerSearchInput.value;
            mainSearchInput.value = activeValue;
            headerSearchInput.value = activeValue;
        }
    }

    if (searchTerm === '') {
        showPlaceholder();
        return;
    }

    // URLを更新
    const url = new URL(window.location);
    url.searchParams.set('q', searchTerm);
    url.searchParams.set('type', currentSearchType);
    window.history.replaceState({}, '', url);

    performSearch(searchTerm);
}

// 検索実行
function performSearch(query) {
    let results = [];

    if (currentSearchType === 'all' || currentSearchType === 'companies') {
        const companyResults = searchCompanies(query).map(item => ({
            ...item,
            type: 'company'
        }));
        results = results.concat(companyResults);
    }

    if (currentSearchType === 'all' || currentSearchType === 'products') {
        const productResults = searchProducts(query).map(item => ({
            ...item,
            type: 'product'
        }));
        results = results.concat(productResults);
    }

    // カテゴリフィルタを適用
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter && categoryFilter.value) {
        results = results.filter(item => {
            if (item.type === 'company') {
                return item.industry === categoryFilter.value;
            } else {
                return item.category === categoryFilter.value;
            }
        });
    }

    // ソート
    applySorting(results);

    searchResults = results;
    currentPage = 1;
    displayResults();
    updatePagination();
}

// 企業検索
function searchCompanies(query) {
    return allCompanies.filter(company => 
        company.name.toLowerCase().includes(query) ||
        company.description.toLowerCase().includes(query) ||
        company.industry.toLowerCase().includes(query) ||
        company.location.toLowerCase().includes(query)
    );
}

// 商品検索
function searchProducts(query) {
    return allProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.manufacturer.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
}

// ソート適用
function applySorting(results) {
    const sortFilter = document.getElementById('sortFilter');
    if (!sortFilter) return;

    switch (sortFilter.value) {
        case 'rating':
            results.sort((a, b) => b.rating - a.rating);
            break;
        case 'reviews':
            results.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
        case 'newest':
            results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'relevance':
        default:
            // 関連度順（名前マッチを優先）
            const query = document.getElementById('mainSearchInput')?.value?.toLowerCase() || '';
            results.sort((a, b) => {
                const aNameMatch = a.name.toLowerCase().includes(query) ? 1 : 0;
                const bNameMatch = b.name.toLowerCase().includes(query) ? 1 : 0;
                if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch;
                return b.rating - a.rating;
            });
            break;
    }
}

// 結果表示
function displayResults() {
    const container = document.getElementById('searchResults');
    if (!container) return;

    if (searchResults.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>検索結果が見つかりません</h3>
                <p>検索条件を変更して、もう一度お試しください。</p>
            </div>
        `;
        return;
    }

    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const resultsToShow = searchResults.slice(startIndex, endIndex);

    const resultsHTML = resultsToShow.map(item => {
        if (item.type === 'company') {
            return generateCompanyCard(item);
        } else {
            return generateProductCard(item);
        }
    }).join('');

    container.innerHTML = `
        <div class="search-results-header">
            <h3>${searchResults.length}件の検索結果</h3>
        </div>
        <div class="search-results-list">
            ${resultsHTML}
        </div>
    `;
}

// 企業カード生成
function generateCompanyCard(company) {
    return `
        <div class="search-result-item company-result" onclick="window.location.href='../companies/${company.slug}/index.html'">
            <div class="result-header">
                <div class="result-type">企業</div>
                <div class="result-industry">${company.industry}</div>
            </div>
            <h4 class="result-title">${company.name}</h4>
            <p class="result-description">${truncateText(company.description, 100)}</p>
            <div class="result-meta">
                <div class="result-rating">
                    <div class="rating-stars">${generateStars(company.rating)}</div>
                    <span class="rating-text">${company.rating.toFixed(1)}</span>
                    <span class="review-count">(${company.reviewCount}件)</span>
                </div>
                <div class="result-location">📍 ${company.location}</div>
            </div>
        </div>
    `;
}

// 商品カード生成
function generateProductCard(product) {
    return `
        <div class="search-result-item product-result" onclick="window.location.href='../products/${product.slug}/index.html'">
            <div class="result-header">
                <div class="result-type">商品</div>
                <div class="result-category">${product.category}</div>
            </div>
            <h4 class="result-title">${product.name}</h4>
            <p class="result-manufacturer">${product.manufacturer}</p>
            <p class="result-description">${truncateText(product.description, 100)}</p>
            <div class="result-meta">
                <div class="result-rating">
                    <div class="rating-stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">${product.rating.toFixed(1)}</span>
                    <span class="review-count">(${product.reviewCount}件)</span>
                </div>
                <div class="result-price">¥${product.price.toLocaleString()}</div>
            </div>
        </div>
    `;
}

// プレースホルダー表示
function showPlaceholder() {
    const container = document.getElementById('searchResults');
    if (container) {
        container.innerHTML = `
            <div class="search-placeholder">
                <div class="placeholder-icon">🔍</div>
                <h3>検索を開始してください</h3>
                <p>企業名、商品名、サービス名、またはキーワードを入力して検索してください。</p>
                
                <div class="quick-links">
                    <h4>人気の検索</h4>
                    <div class="quick-link-buttons">
                        <button class="quick-link-btn" data-query="スマートフォン">スマートフォン</button>
                        <button class="quick-link-btn" data-query="コーヒー">コーヒー</button>
                        <button class="quick-link-btn" data-query="IT企業">IT企業</button>
                        <button class="quick-link-btn" data-query="美容">美容</button>
                        <button class="quick-link-btn" data-query="レストラン">レストラン</button>
                    </div>
                </div>
            </div>
        `;
        
        // クイックリンクのイベントリスナーを再設定
        const quickLinkBtns = document.querySelectorAll('.quick-link-btn');
        quickLinkBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.dataset.query;
                const mainSearchInput = document.getElementById('mainSearchInput');
                const headerSearchInput = document.getElementById('headerSearchInput');
                if (mainSearchInput) mainSearchInput.value = query;
                if (headerSearchInput) headerSearchInput.value = query;
                handleSearch();
            });
        });
    }
}

// ページネーション更新
function updatePagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(searchResults.length / resultsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    // ページネーション生成ロジック（products.jsと同様）
    let paginationHTML = '';
    
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

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" 
                    onclick="changePage(${i})">${i}</button>
        `;
    }

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

    pagination.innerHTML = paginationHTML;
}

// ページ変更
function changePage(page) {
    currentPage = page;
    displayResults();
    updatePagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ユーティリティ関数
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star star-full">★</span>';
    }
    if (hasHalfStar) {
        starsHTML += '<span class="star star-half">★</span>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star star-empty">☆</span>';
    }
    
    return starsHTML;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function showError(message) {
    const container = document.getElementById('searchResults');
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <div class="error-icon">⚠️</div>
                <h3>エラーが発生しました</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn-primary">再読み込み</button>
            </div>
        `;
    }
}

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