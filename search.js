document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.osahan-navbar-search');
    const mobileSearchForm = document.querySelector('.mobile-search');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const wrapper = document.getElementById('wrapper');
    const videoCardsContainer = document.querySelector('.video-cards-container');
    const loadingContainer = document.querySelector('.loading-container');
    const videoCards = document.querySelectorAll('.video-card');

    let debounceTimer;

    function showLoading() {
        if (loadingContainer) {
            loadingContainer.innerHTML = '<div class="loading-spinner">Loading...</div>';
        }
        if (videoCardsContainer) {
            videoCardsContainer.style.display = 'none';
        }
    }

    function hideLoading() {
        if (loadingContainer) {
            loadingContainer.innerHTML = '';
        }
        if (videoCardsContainer) {
            videoCardsContainer.style.display = 'block';
        }
    }

    function filterVideos(searchTerm) {
        showLoading();

        requestAnimationFrame(() => { // Use requestAnimationFrame for smoother updates
            setTimeout(() => { // Simulate fetching delay (remove in real application)
                videoCards.forEach(card => {
                    const titleElement = card.querySelector('.video-title a');
                    if (titleElement) {
                        const title = titleElement.textContent.toLowerCase();
                        if (title.includes(searchTerm.toLowerCase())) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
                hideLoading();
            }, 100); // reduced to 100ms
        });
    }

    // Debounced filter function
    function debouncedFilter(searchTerm) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterVideos(searchTerm);
        }, 200); // Adjust debounce delay as needed
    }

    // Desktop search functionality
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = searchForm.querySelector('input[type="text"]');
            if (searchInput) {
                const searchTerm = searchInput.value.trim();
                filterVideos(searchTerm);
            }
        });

        searchForm.querySelector('input[type="text"]').addEventListener('input', function() {
            const searchTerm = this.value.trim();
            debouncedFilter(searchTerm);
        });
    }

    // Mobile search functionality
    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = mobileSearchForm.querySelector('input[type="text"]');
            if (searchInput) {
                const searchTerm = searchInput.value.trim();
                filterVideos(searchTerm);
            }
        });

        mobileSearchForm.querySelector('input[type="text"]').addEventListener('input', function() {
            const searchTerm = this.value.trim();
            debouncedFilter(searchTerm);
        });
    }

    // Function to handle sidebar toggle
    function handleSidebarToggle() {
        wrapper.classList.toggle('sidebar-toggled');
    }

    // Add event listener to sidebar toggle button
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', handleSidebarToggle);
    }

    // Responsive search bar handling
    function handleSearchResponsiveness() {
        const viewportWidth = window.innerWidth;

        if (viewportWidth < 768) {
            // Mobile view: hide desktop search, show mobile search toggle
            if (searchForm) {
                searchForm.style.display = 'none';
            }

            // Create or get the mobile search button
            let mobileSearchButton = document.querySelector('.mobile-search-button');

            if (!mobileSearchButton) {
                mobileSearchButton = document.createElement('button');
                mobileSearchButton.classList.add('mobile-search-button', 'btn', 'btn-light');
                mobileSearchButton.innerHTML = '<i class="fas fa-search"></i>';
                mobileSearchButton.style.position = 'absolute';
                mobileSearchButton.style.right = '10px';
                mobileSearchButton.style.top = '10px';
                mobileSearchButton.style.zIndex = '10';

                const navbar = document.querySelector('.osahan-nav');
                if (navbar) {
                    navbar.appendChild(mobileSearchButton);
                }
            }

            // Add event listener to mobile search button
            if (mobileSearchButton) {
                mobileSearchButton.addEventListener('click', toggleMobileSearch);
            }
        } else {
            // Desktop view: show desktop search, hide mobile search
            if (searchForm) {
                searchForm.style.display = 'flex'; // or 'inline-flex' depending on your layout
            }

            // Remove mobile search button if it exists
            const mobileSearchButton = document.querySelector('.mobile-search-button');
            if (mobileSearchButton) {
                mobileSearchButton.remove();
            }
            if (mobileSearchForm) {
                mobileSearchForm.style.display = 'none';
            }
        }
    }

    // Initial setup and resize event listener
    handleSearchResponsiveness();
    window.addEventListener('resize', handleSearchResponsiveness);
});
