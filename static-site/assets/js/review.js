// 口コミ投稿ページの機能

let allCompanies = [];
let allProducts = [];
let currentStep = 1;
let selectedService = null;
let reviewData = {
    serviceType: '',
    serviceId: '',
    ratings: {},
    title: '',
    content: '',
    usageDate: '',
    recommend: false
};

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', async () => {
    // 認証状態をチェック
    checkAuthState();
    
    // データを読み込み
    await loadData();
    
    // イベントリスナーを設定
    setupEventListeners();
});

// 認証状態チェック
function checkAuthState() {
    firebase.auth().onAuthStateChanged((user) => {
        const loginRequired = document.getElementById('loginRequired');
        const reviewForm = document.getElementById('reviewForm');
        
        if (user) {
            // ログイン済み
            loginRequired.classList.add('hidden');
            reviewForm.classList.remove('hidden');
        } else {
            // 未ログイン
            loginRequired.classList.remove('hidden');
            reviewForm.classList.add('hidden');
        }
    });
}

// データの読み込み
async function loadData() {
    try {
        // 企業データ
        const companiesResponse = await fetch('../data/companies.json');
        const companiesData = await companiesResponse.json();
        allCompanies = companiesData.companies || [];

        // 商品データ
        const productsResponse = await fetch('../data/products.json');
        const productsData = await productsResponse.json();
        allProducts = productsData.products || [];

        console.log('データを読み込みました:', {
            companies: allCompanies.length,
            products: allProducts.length
        });
    } catch (error) {
        console.error('データの読み込みに失敗:', error);
    }
}

// イベントリスナーの設定
function setupEventListeners() {
    // ログインボタン
    const loginFromReview = document.getElementById('loginFromReview');
    if (loginFromReview) {
        loginFromReview.addEventListener('click', () => {
            const loginBtn = document.getElementById('loginBtn');
            if (loginBtn) loginBtn.click();
        });
    }

    // 検索タブ切り替え
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveSearchTab(tab.dataset.type);
        });
    });

    // サービス検索
    const serviceSearchInput = document.getElementById('serviceSearchInput');
    if (serviceSearchInput) {
        serviceSearchInput.addEventListener('input', debounce(handleServiceSearch, 300));
    }

    // ステップナビゲーション
    setupStepNavigation();

    // 評価システム
    setupRatingSystem();

    // フォーム入力
    setupFormInputs();
}

// 検索タブの切り替え
function setActiveSearchTab(type) {
    const tabs = document.querySelectorAll('.search-tab');
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.type === type);
    });
    
    // 検索結果をクリア
    const resultsContainer = document.getElementById('serviceSearchResults');
    if (resultsContainer) {
        resultsContainer.innerHTML = '<div class="search-placeholder"><p>企業名やサービス名を入力して検索してください</p></div>';
    }
}

// サービス検索
function handleServiceSearch() {
    const searchInput = document.getElementById('serviceSearchInput');
    const activeTab = document.querySelector('.search-tab.active');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        showSearchPlaceholder();
        return;
    }

    let results = [];
    
    if (activeTab.dataset.type === 'companies') {
        results = allCompanies.filter(company => 
            company.name.toLowerCase().includes(searchTerm) ||
            company.description.toLowerCase().includes(searchTerm) ||
            company.industry.toLowerCase().includes(searchTerm)
        );
    } else {
        results = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.manufacturer.toLowerCase().includes(searchTerm)
        );
    }

    displaySearchResults(results, activeTab.dataset.type);
}

// 検索結果表示
function displaySearchResults(results, type) {
    const container = document.getElementById('serviceSearchResults');
    
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results"><p>検索結果が見つかりません</p></div>';
        return;
    }

    const resultsHTML = results.slice(0, 5).map(item => {
        if (type === 'companies') {
            return `
                <div class="search-result-item" onclick="selectService('${item.id}', 'company')">
                    <div class="result-info">
                        <h4>${item.name}</h4>
                        <p class="result-meta">${item.industry} • ${item.location}</p>
                        <p class="result-description">${truncateText(item.description, 100)}</p>
                    </div>
                    <div class="result-rating">
                        <span class="rating-value">${item.rating.toFixed(1)}</span>
                        <span class="star">★</span>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="search-result-item" onclick="selectService('${item.id}', 'product')">
                    <div class="result-info">
                        <h4>${item.name}</h4>
                        <p class="result-meta">${item.manufacturer} • ${item.category}</p>
                        <p class="result-description">${truncateText(item.description, 100)}</p>
                    </div>
                    <div class="result-rating">
                        <span class="rating-value">${item.rating.toFixed(1)}</span>
                        <span class="star">★</span>
                    </div>
                </div>
            `;
        }
    }).join('');

    container.innerHTML = resultsHTML;
}

// サービス選択
function selectService(serviceId, serviceType) {
    const service = serviceType === 'company' 
        ? allCompanies.find(c => c.id === serviceId)
        : allProducts.find(p => p.id === serviceId);
    
    if (!service) return;

    selectedService = service;
    reviewData.serviceType = serviceType;
    reviewData.serviceId = serviceId;

    // 選択されたサービスを表示
    displaySelectedService(service, serviceType);
    
    // 次へボタンを有効化
    const continueBtn = document.getElementById('continueToStep2');
    if (continueBtn) {
        continueBtn.disabled = false;
    }
}

// 選択されたサービス表示
function displaySelectedService(service, type) {
    const container = document.getElementById('selectedService');
    const card = document.getElementById('selectedServiceCard');
    
    const serviceHTML = type === 'company' ? `
        <div class="selected-service-info">
            <h4>${service.name}</h4>
            <p class="service-meta">${service.industry} • ${service.location}</p>
            <p class="service-description">${service.description}</p>
        </div>
    ` : `
        <div class="selected-service-info">
            <h4>${service.name}</h4>
            <p class="service-meta">${service.manufacturer} • ${service.category}</p>
            <p class="service-description">${service.description}</p>
            <p class="service-price">¥${service.price.toLocaleString()}</p>
        </div>
    `;

    card.innerHTML = serviceHTML;
    container.classList.remove('hidden');
}

// ステップナビゲーション設定
function setupStepNavigation() {
    // Step 1 → 2
    const continueToStep2 = document.getElementById('continueToStep2');
    if (continueToStep2) {
        continueToStep2.addEventListener('click', () => {
            goToStep(2);
            setupDetailedRatings();
        });
    }

    // Step 2 → 3
    const continueToStep3 = document.getElementById('continueToStep3');
    if (continueToStep3) {
        continueToStep3.addEventListener('click', () => goToStep(3));
    }

    // Step 3 → 4
    const continueToStep4 = document.getElementById('continueToStep4');
    if (continueToStep4) {
        continueToStep4.addEventListener('click', () => {
            generatePreview();
            goToStep(4);
        });
    }

    // 戻るボタン
    const backToStep1 = document.getElementById('backToStep1');
    const backToStep2 = document.getElementById('backToStep2');
    const backToStep3 = document.getElementById('backToStep3');
    
    if (backToStep1) backToStep1.addEventListener('click', () => goToStep(1));
    if (backToStep2) backToStep2.addEventListener('click', () => goToStep(2));
    if (backToStep3) backToStep3.addEventListener('click', () => goToStep(3));

    // 投稿ボタン
    const submitReview = document.getElementById('submitReview');
    if (submitReview) {
        submitReview.addEventListener('click', handleSubmitReview);
    }

    // 別のレビューを投稿
    const postAnother = document.getElementById('postAnother');
    if (postAnother) {
        postAnother.addEventListener('click', () => {
            resetForm();
            goToStep(1);
        });
    }
}

// ステップ移動
function goToStep(stepNumber) {
    // 現在のステップを非表示
    const currentStepEl = document.getElementById(`step${currentStep}`);
    if (currentStepEl) {
        currentStepEl.classList.remove('active');
    }

    // 新しいステップを表示
    const newStepEl = document.getElementById(`step${stepNumber}`);
    if (newStepEl) {
        newStepEl.classList.add('active');
    }

    currentStep = stepNumber;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 評価システム設定
function setupRatingSystem() {
    const starRatings = document.querySelectorAll('.star-rating');
    
    starRatings.forEach(rating => {
        const stars = rating.querySelectorAll('.star');
        const ratingType = rating.dataset.rating;
        
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                const value = index + 1;
                setRating(ratingType, value);
                updateStarDisplay(rating, value);
                checkStep2Completion();
            });
            
            star.addEventListener('mouseover', () => {
                highlightStars(rating, index + 1);
            });
        });
        
        rating.addEventListener('mouseleave', () => {
            const currentValue = reviewData.ratings[ratingType] || 0;
            updateStarDisplay(rating, currentValue);
        });
    });
}

// 詳細評価設定
function setupDetailedRatings() {
    const container = document.getElementById('detailedRatings');
    let ratingsHTML = '';

    if (reviewData.serviceType === 'company') {
        ratingsHTML = `
            <div class="rating-item">
                <h4>職場環境</h4>
                <div class="star-rating" data-rating="workEnvironment">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>
            <div class="rating-item">
                <h4>給与・待遇</h4>
                <div class="star-rating" data-rating="compensation">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>
            <div class="rating-item">
                <h4>経営陣</h4>
                <div class="star-rating" data-rating="management">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>
            <div class="rating-item">
                <h4>成長性</h4>
                <div class="star-rating" data-rating="growth">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>
        `;
    } else {
        ratingsHTML = `
            <div class="rating-item">
                <h4>品質</h4>
                <div class="star-rating" data-rating="quality">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>
            <div class="rating-item">
                <h4>コストパフォーマンス</h4>
                <div class="star-rating" data-rating="value">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>
            <div class="rating-item">
                <h4>デザイン</h4>
                <div class="star-rating" data-rating="design">
                    <span class="star" data-value="1">★</span>
                    <span class="star" data-value="2">★</span>
                    <span class="star" data-value="3">★</span>
                    <span class="star" data-value="4">★</span>
                    <span class="star" data-value="5">★</span>
                </div>
            </div>
        `;
    }

    container.innerHTML = ratingsHTML;
    
    // 新しい評価システムを設定
    setupRatingSystem();
}

// 評価設定
function setRating(type, value) {
    reviewData.ratings[type] = value;
}

// 星表示更新
function updateStarDisplay(ratingEl, value) {
    const stars = ratingEl.querySelectorAll('.star');
    const label = ratingEl.parentElement.querySelector('.rating-label');
    
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < value);
    });
    
    if (label) {
        const labels = ['', '不満', '普通', '良い', 'とても良い', '最高'];
        label.textContent = labels[value] || '評価してください';
    }
}

// 星ハイライト
function highlightStars(ratingEl, value) {
    const stars = ratingEl.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('hover', index < value);
    });
}

// Step 2完了チェック
function checkStep2Completion() {
    const overallRating = reviewData.ratings.overall;
    const continueBtn = document.getElementById('continueToStep3');
    
    if (continueBtn) {
        continueBtn.disabled = !overallRating;
    }
}

// フォーム入力設定
function setupFormInputs() {
    const reviewTitle = document.getElementById('reviewTitle');
    const reviewText = document.getElementById('reviewText');
    const agreeTerms = document.getElementById('agreeTerms');
    
    // 文字数カウント
    if (reviewTitle) {
        reviewTitle.addEventListener('input', () => {
            updateCharCount(reviewTitle, 100);
            reviewData.title = reviewTitle.value;
            checkStep3Completion();
        });
    }
    
    if (reviewText) {
        reviewText.addEventListener('input', () => {
            updateCharCount(reviewText, 1000);
            reviewData.content = reviewText.value;
            checkStep3Completion();
        });
    }
    
    // 利用時期
    const usageDate = document.getElementById('usageDate');
    if (usageDate) {
        usageDate.addEventListener('change', () => {
            reviewData.usageDate = usageDate.value;
        });
    }
    
    // おすすめ
    const recommendService = document.getElementById('recommendService');
    if (recommendService) {
        recommendService.addEventListener('change', () => {
            reviewData.recommend = recommendService.checked;
        });
    }
    
    // 利用規約同意
    if (agreeTerms) {
        agreeTerms.addEventListener('change', () => {
            const submitBtn = document.getElementById('submitReview');
            if (submitBtn) {
                submitBtn.disabled = !agreeTerms.checked;
            }
        });
    }
}

// 文字数カウント更新
function updateCharCount(input, maxLength) {
    const currentLength = input.value.length;
    const charCountEl = input.parentElement.querySelector('.char-count');
    if (charCountEl) {
        charCountEl.textContent = `${currentLength}/${maxLength}`;
        charCountEl.classList.toggle('over-limit', currentLength > maxLength);
    }
}

// Step 3完了チェック
function checkStep3Completion() {
    const title = reviewData.title?.trim();
    const content = reviewData.content?.trim();
    const continueBtn = document.getElementById('continueToStep4');
    
    if (continueBtn) {
        continueBtn.disabled = !title || !content || title.length < 5 || content.length < 10;
    }
}

// プレビュー生成
function generatePreview() {
    const container = document.getElementById('reviewPreview');
    const service = selectedService;
    
    const previewHTML = `
        <div class="preview-service">
            <h3>レビュー対象</h3>
            <div class="service-info">
                <h4>${service.name}</h4>
                <p>${reviewData.serviceType === 'company' ? service.industry : service.category}</p>
            </div>
        </div>
        
        <div class="preview-rating">
            <h3>評価</h3>
            <div class="rating-display">
                <span class="rating-value">${reviewData.ratings.overall}</span>
                <div class="stars">${'★'.repeat(reviewData.ratings.overall)}${'☆'.repeat(5 - reviewData.ratings.overall)}</div>
            </div>
        </div>
        
        <div class="preview-content">
            <h3>レビュー内容</h3>
            <h4 class="review-title">${reviewData.title}</h4>
            <p class="review-text">${reviewData.content}</p>
        </div>
        
        ${reviewData.recommend ? '<div class="recommend-badge">👍 おすすめします</div>' : ''}
    `;
    
    container.innerHTML = previewHTML;
}

// レビュー投稿
async function handleSubmitReview() {
    try {
        const user = firebase.auth().currentUser;
        if (!user) {
            showNotification('ログインが必要です', 'error');
            return;
        }

        // Firestoreにレビューを保存
        const reviewDoc = {
            serviceType: reviewData.serviceType,
            serviceId: reviewData.serviceId,
            serviceName: selectedService.name,
            userId: user.uid,
            userName: user.displayName || 'ユーザー',
            userPhoto: user.photoURL || '',
            title: reviewData.title,
            content: reviewData.content,
            ratings: reviewData.ratings,
            usageDate: reviewData.usageDate,
            recommend: reviewData.recommend,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            helpful: 0
        };

        await firebase.firestore().collection('reviews').add(reviewDoc);
        
        // 成功ステップを表示
        goToStep('success');
        
        showNotification('レビューを投稿しました！', 'success');
        
    } catch (error) {
        console.error('レビュー投稿エラー:', error);
        showNotification('投稿に失敗しました。もう一度お試しください。', 'error');
    }
}

// 成功ステップ表示
function goToSuccessStep() {
    const currentStepEl = document.getElementById(`step${currentStep}`);
    const successStepEl = document.getElementById('successStep');
    
    if (currentStepEl) currentStepEl.classList.remove('active');
    if (successStepEl) successStepEl.classList.add('active');
}

// フォームリセット
function resetForm() {
    currentStep = 1;
    selectedService = null;
    reviewData = {
        serviceType: '',
        serviceId: '',
        ratings: {},
        title: '',
        content: '',
        usageDate: '',
        recommend: false
    };
    
    // フォーム要素をリセット
    const form = document.getElementById('reviewForm');
    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }
    
    // 選択されたサービスを非表示
    const selectedServiceEl = document.getElementById('selectedService');
    if (selectedServiceEl) {
        selectedServiceEl.classList.add('hidden');
    }
    
    // 検索結果をクリア
    showSearchPlaceholder();
}

// 検索プレースホルダー表示
function showSearchPlaceholder() {
    const container = document.getElementById('serviceSearchResults');
    if (container) {
        container.innerHTML = '<div class="search-placeholder"><p>企業名やサービス名を入力して検索してください</p></div>';
    }
}

// ユーティリティ関数
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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

function showNotification(message, type = 'info') {
    // notification.js の関数を使用（別途実装が必要）
    console.log(`${type.toUpperCase()}: ${message}`);
}