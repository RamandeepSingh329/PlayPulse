document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.osahan-navbar-search');
    const searchInput = searchForm.querySelector('input[type="text"]');
    const searchDropdown = document.createElement('div');
    searchDropdown.className = 'search-dropdown';
    searchDropdown.style.position = 'absolute';
    searchDropdown.style.zIndex = '1000';
    searchDropdown.style.width = '100%';
    searchDropdown.style.backgroundColor = 'white';
    searchDropdown.style.border = '1px solid #ccc';
    searchDropdown.style.display = 'none';
    searchInput.parentElement.appendChild(searchDropdown);

    let debounceTimer;
    let isSearchActive = false; // Track if a search has been initiated

    function fetchArtistChannels(searchTerm) {
        const mockChannels = [
            { name: 'Sidhu Moose Wala', channelUrl: './Artist/sidhumoosewala.html', keywords: ['sidhu moose wala', 'sidhu', 'moosewala'], img: 'img/prof20.jpg', listeners: '9.3M' },
            { name: 'Jordan Sandhu', channelUrl: './Artist/jordansandhu.html', keywords: ['jordan sandhu', 'jordan', 'sandhu'], img: 'img/prof2.1.jpeg', listeners: '3M' },
            { name: 'Gulab Sidhu', channelUrl: './Artist/gulabsidhu.html', keywords: ['gulab sidhu', 'gulab', 'sidhu'], img: 'img/prof3.jpeg', listeners: '2.3M' },
            { name: 'Pari Pandher', channelUrl: './Artist/paripandher.html', keywords: ['pari pandher', 'pari', 'pandher'], img: 'img/prof4.jpeg', listeners: '655K' },
            { name: 'Diljit Dosanjh', channelUrl: './Artist/diljitdosanjh.html', keywords: ['diljit dosanjh', 'diljit', 'dosanjh'], img: 'img/prof5.jpeg', listeners: '18.7M' },
            { name: 'Tegi Pannu', channelUrl: './Artist/tegipannu.html', keywords: ['tegi pannu', 'tegi', 'pannu'], img: 'img/prof6.jpeg', listeners: '3.7M' },
            { name: 'Nimrat Khaira', channelUrl: './Artist/nimratkharia.html', keywords: ['nimrat khaira', 'nimrat', 'khaira'], img: 'img/prof7.jpeg', listeners: '1.3M' },
            { name: 'Karan Aujla', channelUrl: './Artist/karanaujla.html', keywords: ['karan aujla', 'karan', 'aujla'], img: 'img/prof8.jpg', listeners: '17.9M' },
            { name: 'Amrit Maan', channelUrl: './Artist/amritmaan.html', keywords: ['amrit maan', 'amrit', 'maan'], img: 'img/prof9.jpg', listeners: '2.4M' },
            { name: 'Shubh', channelUrl: './Artist/shubh.html', keywords: ['shubh'], img: 'img/prof10.jpg', listeners: '12.5M' },
            { name: 'Satinder Sartaaj', channelUrl: './Artist/satindersartaj.html', keywords: ['satinder sartaaj', 'satinder', 'sartaaj'], img: 'img/prof11.jpg', listeners: '2.1M' },
            { name: 'Dilpreet Dhillon', channelUrl: './Artist/dilpreetdhillon.html', keywords: ['dilpreet dhillon', 'dilpreet', 'dhillon'], img: 'img/prof12.jpg', listeners: '1.3M' },
            { name: 'Sweetaj Brar', channelUrl: './Artist/sweetajbrar.html', keywords: ['sweetaj brar', 'sweetaj', 'Sweetaj Brar'], img: 'img/prof13.jpg', listeners: '673.4K' },
            { name: 'Arjan Dhillon', channelUrl: './Artist/arjandhillon.html', keywords: ['arjan dhillon', 'arjan', 'Arjan Dhillon'], img: 'img/prof14.jpg', listeners: '2.7M' },
            { name: 'Navaan Sandhu', channelUrl: './Artist/navaansandhu.html', keywords: ['navaan sandhu', 'nava', 'Navaan Sandhu'], img: 'img/prof15.jpg', listeners: '2.7M' },
            { name: 'Ap Dhillon', channelUrl: './Artist/apdhillon.html', keywords: ['ap dhillon', 'ap', 'Ap Dhillon'], img: 'img/prof16.jpg', listeners: '9.8M' },
            { name: 'Mankirat Aulakh', channelUrl: './Artist/mankirtaulakh.html', keywords: ['mankirt aulakh', 'mank', 'Mankirt Aulakh'], img: 'img/prof17.jpg', listeners: '3.4M' },
            { name: 'Parmish Verma', channelUrl: './Artist/parmishverma.html', keywords: ['parmish verma', 'parm', 'Parmish Verma'], img: 'img/prof18.jpg', listeners: '6M' },
            { name: 'Gurnam Bhullar', channelUrl: './Artist/gurnambhullar.html', keywords: ['gurnam bhullar', 'gur', 'Gurnam Bhullar'], img: 'img/prof19.jpg', listeners: '2.3M' },
            { name: 'Chani Nattan', channelUrl: './Artist/chaninattan.html', keywords: ['chani nattan', 'cahni', 'Chani Nattan'], img: 'img/prof1.jpeg', listeners: '4.6m' },

        ];

        return mockChannels.filter(channel => {
            return channel.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
        });
    }

    function displayDropdown(channels) {
        searchDropdown.innerHTML = '';
        if (channels.length > 0 && isSearchActive) { // Only show if search is active
            channels.forEach(channel => {
                const item = document.createElement('a');
                item.href = channel.channelUrl;
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.padding = '8px';
                item.style.textDecoration = 'none';
                item.style.color = 'black';

                const img = document.createElement('img');
                img.src = channel.img;
                img.alt = channel.name;
                img.style.width = '30px';
                img.style.height = '30px';
                img.style.marginRight = '8px';
                img.style.borderRadius = '50%';
                item.appendChild(img);

                const text = document.createTextNode(channel.name);
                item.appendChild(text);

                item.addEventListener('mouseover', () => {
                    item.style.backgroundColor = '#f0f0f0';
                });
                item.addEventListener('mouseout', () => {
                    item.style.backgroundColor = 'white';
                });

                searchDropdown.appendChild(item);
            });
            searchDropdown.style.display = 'block';
        } else {
            searchDropdown.style.display = 'none';
        }
    }

    function filterAndDisplay(searchTerm) {
        const results = fetchArtistChannels(searchTerm);
        displayDropdown(results);
    }

    function debouncedFilter(searchTerm) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterAndDisplay(searchTerm);
        }, 200);
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim();
        isSearchActive = searchTerm.length > 0; // Set search active flag
        debouncedFilter(searchTerm);
    });

    document.addEventListener('click', function(event) {
        if (!searchForm.contains(event.target)) {
            searchDropdown.style.display = 'none';
        }
    });
});