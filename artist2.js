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
            { name: 'Jatt Badaami - Dilpreet Dhillon Ft Kaptaan', channelUrl: 'https://youtu.be/Vp0MUXnyWM4', keywords: ['jatt', 'jattbadaami', 'Jatt Badaami'], img: 'https://i.ytimg.com/vi/Vp0MUXnyWM4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAhN3ReX7lBn6ZteJZIGMFOn1b6Sw', },
            { name: 'Got Commited - Davy Ft Simar Kaur', channelUrl: 'https://www.youtube.com/watch?v=W3F4QJLSVsU&pp=ygUSZ290IGNvbW1pdHRlZCBzb25n', keywords: ['got', 'gotcommited', 'Got Commited'], img: 'https://i.ytimg.com/vi/W3F4QJLSVsU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAnsmP8UYNxC6Sfm2LT3gNVzTxNzQ',  },
            { name: 'Nakhreya Wali - Sweetaj Brar', channelUrl: 'https://www.youtube.com/watch?v=I0sJ4qZEjWg&pp=ygUVbmFraHJleWEgbWFyaSBzd2VldGFq', keywords: ['nakhreya wali', 'nak', 'Nakhreya Wali'], img: 'https://i.ytimg.com/vi/I0sJ4qZEjWg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBa-Njf-7vRlysi1Rw8AVwMJRvsLA',  },
            { name: 'Gangsta Luv - Inderpal Moga Ft Harkirat Sangha', channelUrl: 'https://www.youtube.com/watch?v=jMqIpCddv7s&pp=ygULZ2FuZ3N0YSBsdXY%3D', keywords: ['gangsta luv', 'gangs', 'Gangsta Luv'], img: 'https://i.ytimg.com/vi/jMqIpCddv7s/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDcYPQ2N_76SYL7O4ZHXJj1XmzgoA',  },
            { name: 'Bad Boy - Prem Dhillon Ft Gurlez Akhtar', channelUrl: 'https://www.youtube.com/watch?v=1y6FuzmzzRY&pp=ygUUcHJlbSBkaGlsbG9uIGJhZCBib3k%3D', keywords: ['bad boy', 'bad', 'Bad Boys'], img: 'https://i.ytimg.com/vi/1y6FuzmzzRY/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCUmGiqVS95XSWy_RIXEdFx_hG5Uw',  },
            { name: 'See My Hype - Roop Bhullar Ft Wazir Pattar', channelUrl: 'https://www.youtube.com/watch?v=J4es7vPBpNI&pp=ygULc2VlIG15IGh5cGU%3D', keywords: ['see', 'seem', 'See My Hype'], img: 'https://i.ytimg.com/vi/J4es7vPBpNI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAjbpKcxpz_1Ii35J2eoKCLXvAqTg',  },
            { name: 'Badnaam - Varinder Brar Ft Jayy Randhawa', channelUrl: 'https://www.youtube.com/watch?v=FXbnXIhJc3k&pp=ygUHYmFkbmFhbQ%3D%3D', keywords: ['badnam', 'badnaam', 'baadnam'], img: 'https://i.ytimg.com/vi/FXbnXIhJc3k/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDhQvmJApwIjTmI4jcG7TbrEoAE5g',  },
            { name: 'Suspend - Gulab Sidhu Ft Inderpal Moga', channelUrl: 'https://www.youtube.com/watch?v=SxdBSurBCLM&pp=ygUTc3VzcGVuZCBndWxhYiBzaWRodQ%3D%3D', keywords: ['suspend', 'gulab', 'inderpal'], img: 'https://i.ytimg.com/vi/SxdBSurBCLM/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgTSg8MA8=&rs=AOn4CLAUfTpJelp2Qi0CC1PWQxaahV_WIw', listeners: '17.9M' },
            { name: 'Smooth - Arjan Dhillon Ft Jayy Randhawa', channelUrl: 'ttps://www.youtube.com/watch?v=NatDEGvFh5Q&pp=ygUScHVuamFiaSBzb25ncyAyMDI1', keywords: ['smoo', 'arjan', 'smooth'], img: 'https://i.ytimg.com/vi/NatDEGvFh5Q/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDW34PUfniv5aM06yTdK230YsFp2A',  },
            { name: 'Gears - Arjan Dhillon', channelUrl: 'https://youtu.be/1GTuBPlSfc0', keywords: ['gear', 'arjan'], img: 'https://i.ytimg.com/vi/1GTuBPlSfc0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCsHol_Xyp3-Ih3bQ7434M2pjcgGQ',  },
            { name: 'Tell Me Honestly - Ammy Virk Ft Nimrat Khaira', channelUrl: 'https://www.youtube.com/watch?v=WPdok0ODBjY', keywords: ['tell', 'nimrat', 'ammy'], img: 'https://i.ytimg.com/vi/WPdok0ODBjY/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCCjeqCgWLwXXBUUDMWHKTJ3KoNqg',  },
            { name: 'Tell Me - Karan Aujla Ft TheRepublic', channelUrl: 'https://www.youtube.com/watch?v=KNxv88wUgnM', keywords: ['tell', 'karan', 'tell me'], img: 'https://i.ytimg.com/vi/KNxv88wUgnM/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDqi_1jkoffuao0Cy_Tr6gwP0c1KQ', },
            { name: 'Ok Hoye Paye Aa - Arjan Dhillon', channelUrl: 'https://www.youtube.com/watch?v=P9lIW5lPQV0&pp=ygUTZ2VhcnMgYXJqYW4gZGhpbGxvbg%3D%3D', keywords: ['ok hoye', 'arjan dhillon', ''], img: 'https://i.ytimg.com/vi/UL5SerTdvXc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD30h5XgP5kPy1StujcBZuc3-TRXg',  },
            { name: 'Jatt Type Shit - Veet Baljit Ft Inderpal Moga', channelUrl: 'https://www.youtube.com/watch?v=ddbbCVthiec&pp=ygUXaW5kZXJwYWwgbW9nYSBuZXcgc29uZ3M%3D', keywords: ['jatt', 'inderpal', 'jatt type'], img: 'https://i.ytimg.com/vi/ddbbCVthiec/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgTSg9MA8=&rs=AOn4CLCxUIViWWNwxXJDk5eD75vi2K-I5A', },
            { name: 'Police - Cheema Y Ft Jasmine Akhtar & Gur Sidhu', channelUrl: 'https://www.youtube.com/watch?v=_0foVMG-rH0&pp=ygUSY2hlZW1hIHkgbmV3IGFsYnVt', keywords: ['police', 'cheema y', 'gur sidhu'], img: 'https://i.ytimg.com/vi/_0foVMG-rH0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAWYBeYdwKMHTM3yxpeX3fFRE7Nbw',  },
            { name: 'Lehnga - Ravneet Ft Farmaan', channelUrl: 'https://www.youtube.com/watch?v=rgcV2Qq5gsE&pp=ygUQbGVobmdhIGJ5cmF2bmVldA%3D%3D', keywords: ['lehnga', 'ravneet', ''], img: 'https://i.ytimg.com/vi/rgcV2Qq5gsE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAvqjWeGPoEdmbxQifU1Tjx3VX_Yw', },
            { name: 'Asla - Pari Pandher', channelUrl: 'https://www.youtube.com/watch?v=UjTph4ph3AE&pp=ygURYXNsYSBwYXJpIHBhbmRoZXI%3D', keywords: ['alsa', 'pari', ''], img: 'https://i.ytimg.com/vi/UjTph4ph3AE/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCyperS5MO76-CXMhE2wAoLNivXMw', },
            { name: 'Sifat - Parmish Verma', channelUrl: 'https://www.youtube.com/watch?v=O4jAcvWGzas&pp=ygUTc2lmYXQgcGFybWlzaCB2ZXJtYQ%3D%3D', keywords: ['sifat', 'parmish', 'Parmish Verma'], img: 'https://i.ytimg.com/vi/O4jAcvWGzas/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBvyQZtk1t5H4iamqv4UGHrq10Xdw', },
            { name: 'Qatil Surma - Himmat Sandhu Ft Harman Brar', channelUrl: 'https://www.youtube.com/watch?v=SHgYYAfbqDQ&pp=ygUKcVRJTCBTVVJNQQ%3D%3D', keywords: ['qatil surma', 'himmat', ''], img: 'https://i.ytimg.com/vi/SHgYYAfbqDQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAdOV19zHoLuv4FzowmGpKhuFfnDg',  },
            { name: 'Games - Inderpal Moga Ft Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=AraT1UsT55Q', keywords: ['chani nattan', 'games', 'inderpal'], img: 'https://i.ytimg.com/vi/AraT1UsT55Q/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCfa1XR5EVpPUJfj_VFzEh-f2Gwnw', },
            { name: 'Fomo - Jordan Sandhu Ft Kaptaan', channelUrl: 'https://www.youtube.com/watch?v=bptF-ilf50Q&pp=ygUSZm9tbyBqb3JkYW4gc2FuZGh1', keywords: ['fomo', 'jordan', 'kaptaan'], img: 'https://i.ytimg.com/vi/bptF-ilf50Q/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBF3QNuqDncOkrAAlWcgkn60rQqHQ', },
            { name: 'Mirrors - Jordan Sandhu ', channelUrl: 'https://www.youtube.com/watch?v=O__uNuJv03w&pp=ygUHbWlycm9ycw%3D%3D', keywords: ['mirrors', 'jordan', ''], img: 'https://i.ytimg.com/vi/O__uNuJv03w/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDbV0SntPgsXx88LCwzewm0vRTyLg', },
            { name: 'Kangni - Himmat Sandhu Ft Sweetaj Brar', channelUrl: 'https://www.youtube.com/watch?v=sS_WyjSkt3U&pp=ygUUa2FuZ25pIGhpbW1hdCBzYW5kaHU%3D', keywords: ['kangni', 'himmat', 'kangani'], img: 'https://i.ytimg.com/vi/sS_WyjSkt3U/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB7zTfxDwzI_DOBWoxFEkPnzHGEVg', },
            { name: 'Jatta Ve - Mankirt Aulakh Ft Kamal Khangura', channelUrl: 'https://www.youtube.com/watch?v=o3Qpmx-ngio&pp=ygUIamF0dGEgdmU%3D', keywords: ['jatta ve', 'mankirt', ''], img: 'https://i.ytimg.com/vi/o3Qpmx-ngio/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB_n-jCNaJMpaYrJgG47hgHei33gg', },
            { name: 'Lifestyle - Gurtaj Ft Babbu', channelUrl: 'https://www.youtube.com/watch?v=F7Lf6FJ_GbQ&pp=ygUQbGlmZXN0dHlsZSBiYWJidQ%3D%3D', keywords: ['lifestyle', 'gurtaj', ''], img: 'https://i.ytimg.com/vi/F7Lf6FJ_GbQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAEQvJna2pSc4QwuSBkv0exeXhPWw', },
            { name: 'Facetime - Inderpal Moga Ft Miss Pooja & Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=SuLTRRdCLPU&pp=ygUVZmFjZXRpbWUgY2hhbmkgbmF0dGFu', keywords: ['facetime', 'inderpal', 'chani nattan'], img: 'https://i.ytimg.com/vi/SuLTRRdCLPU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBTwHWPoYbipRm_n4a444WzQoXGRw', },
            { name: '8 Asle - Sukha Ft Gurlez Akhtar & Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=0FnZO-U5oHo&pp=ygUHOCBhc2xlXQ%3D%3D', keywords: ['8 asle', 'sukha', 'chani nattan'], img: 'https://i.ytimg.com/vi/0FnZO-U5oHo/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB0Iii6P8SFJsjwEpvLJD-bFyiCmQ', },
            { name: 'Trust Me - Gurnam Bhullar', channelUrl: 'https://www.youtube.com/watch?v=UjCXH1OdVpw&pp=ygUXdHJ1c3QgbWUgZ3VybmFtIGJodWxsYXI%3D', keywords: ['trust me', 'gurnam', ''], img: 'https://i.ytimg.com/vi/UjCXH1OdVpw/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBBufhFdlmBra28hMuMcT15TSS1rA', },
            { name: 'Arrogant - Ap Dhillon Ft Shinda Khalon', channelUrl: 'https://www.youtube.com/watch?v=UkOPtbo73Ws&pp=ygUTYXJyb2dhbnQgYXAgZGhpbGxvbg%3D%3D', keywords: ['arrogant', 'ap dhillon', ''], img: 'https://i.ytimg.com/vi/UkOPtbo73Ws/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAZOCo2hQ0ZV7vbxBikVikUCEKpWQ', },
            { name: 'Powerhouse - Amrit Maan Ft Bhupinder Babbal & Sanjay Dutt', channelUrl: 'https://www.youtube.com/watch?v=gWmQ1E4nPDM&pp=ygUVcG93ZXJob3VzZSBhbXJpdCBtYWFu', keywords: ['powerhouse', 'amrit', ''], img: 'https://i.ytimg.com/vi/gWmQ1E4nPDM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAKe3AcoglI_oZ2sZdy3iBQM0r8sw', },
            { name: 'Jaanlewa - Amrit Maan Ft Amrya Dastur', channelUrl: 'https://www.youtube.com/watch?v=rfgWlGKLmPI&pp=ygUTamFhbmxld2EgYW1yaXQgbWFhbg%3D%3D', keywords: ['jaanlewa', 'amrit', ''], img: 'https://i.ytimg.com/vi/rfgWlGKLmPI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBzvX1llLo5qcmCIQfkeAo6bDFQBQ', },
            { name: 'Asi Oh Hune Aa - Amrit Maan ', channelUrl: 'https://www.youtube.com/watch?v=jZQUM9T3SEQ&pp=ygUNYXNpIG9vIGh1bmUgYQ%3D%3D', keywords: ['asi oh hune aa', 'amrit', ''], img: 'https://i.ytimg.com/vi/jZQUM9T3SEQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB0GX8w--ZpRnzsH6u47ZZZ0y0WMQ', },
            { name: 'Those Eyes - Amrit Maan Ft Mahira Sharma ', channelUrl: 'https://www.youtube.com/watch?v=1G1zcTV5yX4&pp=ygUKdGhvc2UgZXllcw%3D%3D', keywords: ['those eyes', 'amrit', ''], img: 'https://i.ytimg.com/vi/1G1zcTV5yX4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD74rRA4jXHr-4tEwLTSj4sauKz6g', },
            { name: 'Whenever - Amrit Maan ', channelUrl: 'https://www.youtube.com/watch?v=WetLRHaJMsA&pp=ygUTd2hlbmV2ZXIgYW1yaXQgbWFhbg%3D%3D', keywords: ['whenever', 'amrit', ''], img: 'https://i.ytimg.com/vi/WetLRHaJMsA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAw_ULOAJWQ5ocRpbm2B9auKmv_mA', },
            { name: 'Sunshine - Amrit Maan Ft Avvy Sra', channelUrl: 'https://www.youtube.com/watch?v=UQaBc121ql8&pp=ygUTc3Vuc2hpbmUgYW1yaXQgbWFhbg%3D%3D', keywords: ['sunshine', 'amrit', ''], img: 'https://i.ytimg.com/vi/UQaBc121ql8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCMm_nPGYCdW2VScePC51jPBegRfA', },
            { name: 'Journey - Amrit Maan Ft Mxrci', channelUrl: 'https://www.youtube.com/watch?v=tGbKhMg0ijA&pp=ygUSam91cm5leSBhbXJpdCBtYWFu', keywords: ['journey', 'amrit', ''], img: 'https://i.ytimg.com/vi/tGbKhMg0ijA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBcPfDJIydYK3NMVh1zVGIHpFoUgg', },
            { name: 'By Birth - Amrit Maan Ft Desi Crew', channelUrl: 'https://www.youtube.com/watch?v=imgCvGher6Q&pp=ygUTYnkgYmlydGggYW1yaXQgbWFhbg%3D%3D', keywords: ['by birth', 'amrit', ''], img: 'https://i.ytimg.com/vi/imgCvGher6Q/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD4XEM-fmwLTtmkGJ_CMkezt0iJKQ', },
            { name: 'The King - Amrit Maan Ft Intense', channelUrl: 'https://www.youtube.com/watch?v=z0_lcXG9zZc&pp=ygUUdGhlIGtpbmcgIGFtcml0IG1hYW4%3D', keywords: ['the king', 'amrit', ''], img: 'https://i.ytimg.com/vi/z0_lcXG9zZc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBmLx-6SEgL3QQjcIGtdci5eU2tYw', },
            { name: 'Difference - Amrit Maan Ft Sonia Maan', channelUrl: 'https://www.youtube.com/watch?v=vg0ZfeszGrU&pp=ygUWZGlmZmVyZW5jZSAgYW1yaXQgbWFhbg%3D%3D', keywords: ['difference', 'amrit', ''], img: 'https://i.ytimg.com/vi/vg0ZfeszGrU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCmlFWNTl0MDi6OmB_dGd3qSO0IFQ', },
            { name: 'Aakad - Amrit Maan Ft Ginni Kapoor', channelUrl: 'https://www.youtube.com/watch?v=uN0LSQbGdQk&pp=ygUQYWthYWQgYW1yaXQgbWFhbg%3D%3D', keywords: ['aakad', 'amrit', 'akad'], img: 'https://i.ytimg.com/vi/uN0LSQbGdQk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDuLazTxnha9kJZGyMN5cRF-7FPgA', },
            { name: 'Bambhia Bole - Amrit Maan Ft Sidhu Moose Wala', channelUrl: 'https://www.youtube.com/watch?v=hpVNMjpjiJc&pp=ygUXYmFtYmloYSBib2xlIGFtcml0IG1hYW4%3D', keywords: ['bambiha bole', 'amrit', '',], img: 'https://i.ytimg.com/vi/hpVNMjpjiJc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAZDnI5zqnoIezVrQq6muS-L8ykWQ', },
            { name: 'Baapu - Amrit Maan Ft Desi Crew', channelUrl: 'https://www.youtube.com/watch?v=8mGUPL3YPp0&pp=ygUPYmFwdSBhbXJpdCBtYWFu', keywords: ['baapu', 'amrit', 'bapu'], img: 'https://i.ytimg.com/vi/8mGUPL3YPp0/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD1eC0aKEF-zxppvaUAQpM0x8pNMA', },
            { name: 'Omg - Amrit Maan Ft Mxrci', channelUrl: 'https://www.youtube.com/watch?v=1re16gzCgQg&pp=ygUOb21nIGFtcml0IG1hYW4%3D', keywords: ['omg', 'amrit', ''], img: 'https://i.ytimg.com/vi/1re16gzCgQg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCxnCqj8k4k5NWuNAc-RlGx5JFfRw', },
            { name: 'Addicted - Tegi Pannu Ft Navaan Sandhu', channelUrl: 'https://www.youtube.com/watch?v=uxy254BGsxM&pp=ygUTYWRkaWN0ZWQgdGVnaSBwYW5udQ%3D%3D', keywords: ['addicted', 'tegi', 'navaan'], img: 'https://i.ytimg.com/vi/uxy254BGsxM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA4DFEu1oxQ7FJLu9308-cHmF_fPQ', },
            { name: 'Sift - Bhalwaan Ft Manpreet Toor', channelUrl: 'https://www.youtube.com/watch?v=NNjNCr-ZBMI&pp=ygUMc2lmdCBiaGFsd2Fu', keywords: ['sift', 'bhalwaan', ''], img: 'https://i.ytimg.com/vi/NNjNCr-ZBMI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAQA7yRdoc8WhUVQYk3KM9HzB0_hw', },
            { name: 'Beliya - Gurnam Bhullar Ft Tania', channelUrl: 'https://www.youtube.com/watch?v=kKAfQWsiHME&pp=ygUVYmVsaXlhIGd1cm5hbSBiaHVsbGFy', keywords: ['beliya', 'gurnam', ''], img: 'https://i.ytimg.com/vi/kKAfQWsiHME/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC_sXlv98-gtWVz_AxsgXU6wpqAIw', },
            { name: '9 : 45 - Prabh', channelUrl: 'https://www.youtube.com/watch?v=bzSn6AKLkMI&pp=ygUEOSA0NQ%3D%3D', keywords: ['9 45', 'prabh', ''], img: 'https://i.ytimg.com/vi/bzSn6AKLkMI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB3OmLdXd9UZFtBj3zE4_JFVGtdNQ', },
            { name: 'Arrogant - Ap Dhillon Ft Shinda Khalon', channelUrl: 'https://www.youtube.com/watch?v=bzSn6AKLkMI&pp=ygUEOSA0NQ%3D%3D', keywords: ['arrogant', 'ap', 'ap dhillon'], img: 'https://i.ytimg.com/vi/bzSn6AKLkMI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB3OmLdXd9UZFtBj3zE4_JFVGtdNQ', },
            { name: 'Faraar - Ap Dhillon Ft Gurinder Gill & Shinda Khalon', channelUrl: 'https://www.youtube.com/watch?v=vqyIYTVFNck&pp=ygURZmFyYWFyIGFwIGRoaWxsb24%3D', keywords: ['faraar', 'frar', 'ap dhillon'], img: 'https://i.ytimg.com/vi/vqyIYTVFNck/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDiY_rnpXbk4tVV2UMetL9tzsBH6g', },
            { name: 'Brown Munde - Ap Dhillon Ft Gurinder Gill & Shinda Khalon', channelUrl: 'https://www.youtube.com/watch?v=VNs_cCtdbPc&pp=ygUWYnJvd24gbXVuZGUgYXAgZGhpbGxvbg%3D%3D', keywords: ['brown munde', 'brown', 'ap dhillon'], img: 'https://i.ytimg.com/vi/VNs_cCtdbPc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB1OzPRzYHGjsE7uFDxjrFAU_njSg', },
            { name: 'Sleepless - Ap Dhillon ', channelUrl: 'https://www.youtube.com/watch?v=sdhsp6NaB-A&pp=ygUVc2xlZXAgbGVzcyBhcCBkaGlsbG9u', keywords: ['sleepless', 'sleep', 'ap dhillon'], img: 'https://i.ytimg.com/vi/sdhsp6NaB-A/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAbn7de4Vxhxz6-lQWuUqAIbQZi2w', },
            { name: 'Saada Pyaar - Ap Dhillon Ft Money Musik', channelUrl: 'https://www.youtube.com/watch?v=L6fr053Z_pU&pp=ygUVc2FkYSBweWFhciBhcCBkaGlsbG9u', keywords: ['saada pyaar', 'sada', 'ap dhillon'], img: 'https://i.ytimg.com/vi/L6fr053Z_pU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLABXKHGcRsHDzSU2fMvel5KhQG2Fg', },
            { name: 'Spaceship - Ap Dhillon Ft Gurinder Gill & Shinda Khalon', channelUrl: 'https://www.youtube.com/watch?v=RatDV50alQE&pp=ygUTc3BhY2VzaGlwYXAgZGhpbGxvbg%3D%3D', keywords: ['spaceship', 'space', 'ap dhillon'], img: 'https://i.ytimg.com/vi/RatDV50alQE/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLDfR4dVWv5r2QVGlPsuxsi7T7q-aw', },
            { name: 'Tere Te - Ap Dhillon Ft Gurinder Gill ', channelUrl: 'https://www.youtube.com/watch?v=fG70qm6usR8&pp=ygUSdGVyZSB0ZSBhcCBkaGlsbG9u', keywords: ['tere te', 'tere', 'ap dhillon'], img: 'https://i.ytimg.com/vi/fG70qm6usR8/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGD4gZShVMA8=&rs=AOn4CLBJg5xFYDODsPH7uFK4Re7akmTCQw', },
            { name: 'Desires- Ap Dhillon Ft Gurinder Gill ', channelUrl: 'https://www.youtube.com/watch?v=3ONzh3tf884&pp=ygUSZGVzaXJlcyBhcCBkaGlsbG9u', keywords: ['desires', '', 'ap dhillon'], img: 'https://i.ytimg.com/vi/fG70qm6usR8/hq720.jpg?sqp=-oaymwFBCNAFEJQDSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AH-CYAC0AWKAgwIABABGD4gZShVMA8=&rs=AOn4CLBJg5xFYDODsPH7uFK4Re7akmTCQw', },
            { name: 'Insane - Ap Dhillon Ft Gurinder Gill & Shinda Khalon', channelUrl: 'https://www.youtube.com/watch?v=cqP8I5aaud8&pp=ygURaW5zYW5lIGFwIGRoaWxsb24%3D', keywords: ['insane', '', 'ap dhillon'], img: 'https://i.ytimg.com/vi/cqP8I5aaud8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDGVq51SYOp364uCaGPATgV_nP2-w', },
            { name: 'Toxic - Ap Dhillon Ft Intense ', channelUrl: 'https://www.youtube.com/watch?v=7v0_uipNGao&pp=ygUQdG94aWMgYXAgZGhpbGxvbg%3D%3D', keywords: ['tere te', 'tere', 'ap dhillon'], img: 'https://i.ytimg.com/vi/7v0_uipNGao/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB1wpw8odyCPptnNXoYWu6aABf8YA', },
            { name: 'Khabi Khan - Ninja Ft Deep Jhandu ', channelUrl: 'https://www.youtube.com/watch?v=XCRTyAGh77E&pp=ygUQa2hhYmkga2hhbiBuaW5qYQ%3D%3D', keywords: ['khabi khan', 'khabi', 'ninja'], img: 'https://i.ytimg.com/vi/XCRTyAGh77E/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDd8BQJaYqo_uePwvQoIyY44iNbgA', },
            { name: 'Parindey - B Praak Ft Gippy Grewal ', channelUrl: 'https://www.youtube.com/watch?v=x5nd2acYjXg&pp=ygUQcGFyaW5kZXkgYiBwcmFhaw%3D%3D', keywords: ['parindey', 'gippy grewal', 'b praak'], img: 'https://i.ytimg.com/vi/x5nd2acYjXg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAAQZdfBy2pxPMDhXc6VgOghvaHIg', },
            { name: 'Jhallar - Sweetaj Brar ', channelUrl: 'https://www.youtube.com/watch?v=CRlkTJSZ954&pp=ygUUamhhbGxhciBzd2V0YWFqIGJyYXI%3D', keywords: ['jhallar', '', 'sweetaj brar'], img: 'https://i.ytimg.com/vi/CRlkTJSZ954/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBC9M8y0n7kZpTsl7jZehFPteAU1g', },
            { name: 'Brats - Arjan Dhillon ', channelUrl: 'https://youtu.be/LSgkl5-yc3A', keywords: ['brats', '', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/po2N5tgQqsg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBHqkxbt4aRkDkEuT3ofmUEFPDTNA', },
            { name: 'Setting - Arjan Dhillon Ft Shruishty Maan ', channelUrl: 'https://www.youtube.com/watch?v=MkaLMypcVpw&pp=ygUVc2V0dGluZyBhcmphbiBkaGlsbG9u', keywords: ['setting', '', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/MkaLMypcVpw/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAtsOKIqNT8MWAE6vmm2M3wim6EXg', },
            { name: 'Jawani - Arjan Dhillon Ft Mxrci ', channelUrl: 'https://www.youtube.com/watch?v=THOP4ThY-Jg&pp=ygUUamF3YW5pIGFyamFuIGRoaWxsb24%3D', keywords: ['jawani', '', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/THOP4ThY-Jg/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDWVNMOikVczdeWhzEI01aOAs-O-A', },
            { name: 'Kali Sohni - Arjan Dhillon Ft Yeah Proof ', channelUrl: 'https://www.youtube.com/watch?v=tvxoan26_M8&pp=ygUYa2FsaSBzb2huaSBhcmphbiBkaGlsbG9u', keywords: ['kali sohni', 'kali', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/tvxoan26_M8/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDzcVKLbMkbcq8Ej9TNCQs3FfShIA', },
            { name: 'No Debts - Arjan Dhillon Ft Mxrci ', channelUrl: 'https://www.youtube.com/watch?v=-kZaweWvCiQ&pp=ygUWbm8gZGVidHMgYXJqYW4gZGhpbGxvbg%3D%3D', keywords: ['no debts', 'no', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/-kZaweWvCiQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCP3VYc0AL23u1qFh8ZRQt1vRBcCA', },
            { name: 'Hazur - Arjan Dhillon Ft Mxrci ', channelUrl: 'https://www.youtube.com/watch?v=xh_4jogs4zM&pp=ygUTaGF6dXIgYXJqYW4gZGhpbGxvbg%3D%3D', keywords: ['hazur', '', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/xh_4jogs4zM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDj1c3R7v343BwDDgIjCyXlecdD8g', },
            { name: 'Long Back - Arjan Dhillon  ', channelUrl: 'https://www.youtube.com/watch?v=xCs0qjSQNDI&pp=ygUXbG9uZyBiYWNrIGFyamFuIGRoaWxsb24%3D', keywords: ['long back', 'long', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/xCs0qjSQNDI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDW-1JC_axIDZGwIPhuKcWTm-iqLw', },
            { name: 'Jatt Di Janeman - Arjan Dhillon  ', channelUrl: 'https://www.youtube.com/watch?v=bUHiD4FiJlc&pp=ygUdamF0dCBkaSBqYW5lbWFuIGFyamFuIGRoaWxsb24%3D', keywords: ['jatt di janeman', 'jatt', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/bUHiD4FiJlc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDepEs1gHjdAicS9Qg8U53w5-sepA', },
            { name: 'Ki Karde Je - Arjan Dhillon  Ft Nimrat Khaira', channelUrl: 'https://www.youtube.com/watch?v=7qadvPmF_ac&pp=ygUaa2kga2FyZGUgamUgYXJqYW4gZGhpbGxvbiA%3D', keywords: ['ki karde je', 'nimrat khaira', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/7qadvPmF_ac/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBuDSJO_l8A8hY2vBDMAAVyzI-7OQ', },
            { name: 'Kath - Arjan Dhillon ', channelUrl: 'https://www.youtube.com/watch?v=nphcA572SkM&pp=ygUTa2F0aCBhcmphbiBkaGlsbG9uIA%3D%3D', keywords: ['kath', 'nimrat khaira', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/nphcA572SkM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBJlqn4tMhxwkkncQ-b4OTJRX0Lfg', },
            { name: 'Trucker - Arjan Dhillon ', channelUrl: 'https://www.youtube.com/watch?v=R-0lwE7YvWk&pp=ygUWdHJ1Y2tlciBhcmphbiBkaGlsbG9uIA%3D%3D', keywords: ['trucker', '', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/R-0lwE7YvWk/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD90PlcoG5aFUJLyd1oUCPT__D38A', },
            { name: 'Fly - Arjan Dhillon Ft Drishty Talwar', channelUrl: 'https://www.youtube.com/watch?v=a1B3BkaCx4o&pp=ygUSZmx5IGFyamFuIGRoaWxsb24g', keywords: ['fly', '', 'arjan dhillon'], img: 'https://i.ytimg.com/vi/a1B3BkaCx4o/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDAvKxHjN-pP5gh65ObSlWhQLD5lw', },
            { name: 'Tere Bina - Tegi Pannu Ft Sukha', channelUrl: 'https://www.youtube.com/watch?v=x4l-pL4Z4vs&pp=ygUPdGVyZSBiaW5lIHN1a2hh', keywords: ['tere bina', '', 'tegi pannu'], img: 'https://i.ytimg.com/vi/x4l-pL4Z4vs/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCWkCYmMO2ecAotFE1HVMYQjOFxRw', },
            { name: 'Hanne - Pari Pandher', channelUrl: 'https://www.youtube.com/watch?v=85Gq1gyPX8s&pp=ygUSaGFubmUgcGFyaSBwYW5kaGVy', keywords: ['hanne', '', 'pari pandher'], img: 'https://i.ytimg.com/vi/85Gq1gyPX8s/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBne1nuSBWCe85HWig5FheO8SuhAA', },
            { name: 'Ni Kude - Ammy Virk Ft Jasmine Bajwa', channelUrl: 'https://www.youtube.com/watch?v=HsH8AR1AqOQ&pp=ygURbmkga3VkZSBhbW15IHZpcms%3D', keywords: ['ni kude', '', 'ammy virk'], img: 'https://i.ytimg.com/vi/HsH8AR1AqOQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAGgDHZS3m5Vfsrmz_k3vfSNfL1JQ', },
            { name: 'Shukriya - B Praak Ft Ammy Virk', channelUrl: 'https://www.youtube.com/watch?v=aHtkRFfaPSs&pp=ygUQc2h1a3JpeWEgYiBwcmFhaw%3D%3D', keywords: ['shukriya', '', 'ammy virk'], img: 'https://i.ytimg.com/vi/aHtkRFfaPSs/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLB_5BK6BcUfsKFMr92Z4CMQcnIbnQ', },
            { name: 'Bhabi - Inderpal Moga Ft Himmat Sandhu', channelUrl: 'https://www.youtube.com/watch?v=VTKGlJaa2Lw&pp=ygUUYmhhYmhpIGluZGVycGFsIG1vZ2E%3D', keywords: ['bhabi', 'inderpal moga', 'himmat sandhu'], img: 'https://i.ytimg.com/vi/VTKGlJaa2Lw/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAYP2NtFqA2HEKy3TnSmJRJSshQyw', },
            { name: 'Case - Inderpal Moga Ft Miss Pooja & Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=TiaLhy-w_Mc&pp=ygUUYmhhYmhpIGluZGVycGFsIG1vZ2E%3D', keywords: ['case', 'inderpal moga', 'chani nattan'], img: 'https://i.ytimg.com/vi/TiaLhy-w_Mc/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCPYCp1AOgbu8HZ3cT7-WH8JcM6fw', },
            { name: 'Kaka - Inderpal Moga Ft  Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=ubT1usl0dGQ&pp=ygUSa2FrYSBpbmRlcnBhbCBtb2dh', keywords: ['kaka', 'inderpal moga', 'chani nattan'], img: 'https://i.ytimg.com/vi/ubT1usl0dGQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLANgSby4BlHYNv4tupq8LqZ6hmuSQ', },
            { name: 'Gang Boliyan - Inderpal Moga Ft  Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=B_jNkuh0w4M&pp=ygUaZ2FuZyBib2xpeWFuIGluZGVycGFsIG1vZ2E%3D', keywords: ['gang boliyan', 'inderpal moga', 'chani nattan'], img: 'https://i.ytimg.com/vi/B_jNkuh0w4M/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCFGbsaIW8l_K8CtxPsq6AGwedLAw', },
            { name: 'Outisde - Inderpal Moga Ft  Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=o1NXCztObPU&pp=ygUVb3V0c2lkZSBpbmRlcnBhbCBtb2dh', keywords: ['outisde', 'inderpal moga', 'chani nattan'], img: 'https://i.ytimg.com/vi/o1NXCztObPU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDyd4M-ntkU8ZOfcq1qJEnZjLlVmg', },
            { name: 'Brown Eyes - Inderpal Moga Ft  Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=pIhRTAWyzs4&pp=ygUYYnJvd24gZXllcyBpbmRlcnBhbCBtb2dh', keywords: ['brown eyes', 'inderpal moga', 'chani nattan'], img: 'https://i.ytimg.com/vi/pIhRTAWyzs4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDtulv21YXVDhhUOdQMeDCtrvDDNg', },
            { name: '1234 - Inderpal Moga Ft  Parmish Verma & Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=VRsvGZItdHA&pp=ygUSMTIzNCBpbmRlcnBhbCBtb2dh', keywords: ['1234','parmish verma', 'inderpal moga', 'chani nattan'], img: 'https://i.ytimg.com/vi/VRsvGZItdHA/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBJEQpJJgc_4wRhOBo7n6pe1geUTg', },
            { name: 'Umbrella - Diljit Dosanjh & Chani Nattan', channelUrl: 'https://www.youtube.com/watch?v=C1GCt4JdV8U&pp=ygUWdW1icmVsbGEgaW5kZXJwYWwgbW9nYQ%3D%3D', keywords: ['umbrella','diljit dosanjh', '', 'chani nattan'], img: 'https://i.ytimg.com/vi/C1GCt4JdV8U/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAuSjZGNt7uAQoju6pbdhjraWXILg', },

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