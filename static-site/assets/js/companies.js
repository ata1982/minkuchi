// 企業一覧ページの機能

let allCompanies = [];
let filteredCompanies = [];
let currentPage = 1;
const companiesPerPage = 12;

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', async () => {
    await loadCompanies();
    setupEventListeners();
    displayCompanies();
    updatePagination();
});

// 企業データの読み込み
async function loadCompanies() {
    try {
        const response = await fetch('../data/companies.json');
        const data = await response.json();
        allCompanies = data.companies;
        filteredCompanies = [...allCompanies];
        console.log('企業データを読み込みました:', allCompanies.length + '件');
    } catch (error) {
        console.error('企業データの読み込みに失敗:', error);
        showError('企業データの読み込みに失敗しました。しばらく後でもう一度お試しください。');
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
    const industryFilter = document.getElementById('industryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (industryFilter) {
        industryFilter.addEventListener('change', handleFilter);
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
        filteredCompanies = [...allCompanies];
    } else {
        filteredCompanies = allCompanies.filter(company => 
            company.name.toLowerCase().includes(searchTerm) ||
            company.description.toLowerCase().includes(searchTerm) ||
            company.industry.toLowerCase().includes(searchTerm)
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
    displayCompanies();
    updatePagination();
}

// フィルタ処理
function handleFilter() {
    applyCurrentFilters();
    currentPage = 1;
    displayCompanies();
    updatePagination();
}

// ソート処理
function handleSort() {
    applyCurrentFilters();
    currentPage = 1;
    displayCompanies();
    updatePagination();
}

// 現在のフィルタを適用
function applyCurrentFilters() {
    let companies = [...filteredCompanies];
    
    // 業界フィルタ
    const industryFilter = document.getElementById('industryFilter');
    if (industryFilter && industryFilter.value) {
        companies = companies.filter(company => 
            company.industry === industryFilter.value
        );
    }
    
    // ソート
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        switch (sortFilter.value) {
            case 'rating':
                companies.sort((a, b) => b.rating - a.rating);
                break;
            case 'reviews':
                companies.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case 'name':
                companies.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
                break;
            case 'newest':
                companies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }
    }
    
    filteredCompanies = companies;
}

// 企業の表示
function displayCompanies() {
    const grid = document.getElementById('companiesGrid');
    if (!grid) return;

    const startIndex = (currentPage - 1) * companiesPerPage;
    const endIndex = startIndex + companiesPerPage;
    const companiesToShow = filteredCompanies.slice(startIndex, endIndex);

    if (companiesToShow.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>検索結果が見つかりません</h3>
                <p>検索条件を変更して、もう一度お試しください。</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = companiesToShow.map(company => `
        <div class="company-card" data-company-id="${company.id}">
            <div class="company-logo">
                <img src="${company.logo}" alt="${company.name}" 
                     onerror="this.src='data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23f0f0f0\"/><text x=\"50\" y=\"50\" text-anchor=\"middle\" dy=\".3em\" font-family=\"Arial\" font-size=\"12\" fill=\"%23999\">${company.name.charAt(0)}</text></svg>'">
            </div>
            <div class="company-info">
                <h3 class="company-name">
                    <a href="${company.slug}/index.html">${company.name}</a>
                </h3>
                <p class="company-industry">${company.industry}</p>
                <p class="company-location">${company.location}</p>
                <div class="company-rating">
                    <div class="rating-stars">
                        ${generateStars(company.rating)}
                    </div>
                    <span class="rating-text">${company.rating.toFixed(1)}</span>
                    <span class="review-count">(${company.reviewCount}件のレビュー)</span>
                </div>
                <p class="company-description">${truncateText(company.description, 80)}</p>
                <div class="company-meta">
                    <span class="employee-count">${company.employees}</span>
                    <span class="founded-year">設立: ${company.founded}年</span>
                </div>
            </div>
        </div>
    `).join('');

    // カードクリックイベント
    grid.querySelectorAll('.company-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                const companyId = card.dataset.companyId;
                const company = allCompanies.find(c => c.id === companyId);
                if (company) {
                    window.location.href = `${company.slug}/index.html`;
                }
            }
        });
    });
}

// ページネーションの更新
function updatePagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
    
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
            ${filteredCompanies.length}件中 ${(currentPage - 1) * companiesPerPage + 1}-${Math.min(currentPage * companiesPerPage, filteredCompanies.length)}件を表示
        </div>
        <div class="pagination-buttons">
            ${paginationHTML}
        </div>
    `;
}

// ページ変更
function changePage(page) {
    currentPage = page;
    displayCompanies();
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
    const grid = document.getElementById('companiesGrid');
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