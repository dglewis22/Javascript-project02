const api_key = 'IiPpLV9J1uCbOkbhfjcR20If9UWKkJM6';
let currentPage = 1; 
const limit = 12;


function handleClick() {
    const searchInput = document.getElementById('imgSearch');
    const searchValue = searchInput.value;
    const offset = (currentPage - 1) * limit;
    const url = `http://api.giphy.com/v1/gifs/search?q=${searchValue}&api_key=${api_key}&limit=${limit}&offset=${offset}`;

    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            
            const outputArea = document.querySelector('.outputArea');
            outputArea.innerHTML = ''; 

            json.data.forEach(gif => {
                const img_url = gif.images.fixed_height.url;
                const title = gif.title;

                outputArea.innerHTML += `
                    <div style="margin-bottom: 20px;">
                        <img src="${img_url}" alt="${title}" style="display: block; max-width: 100%; height: auto;">
                        <h3>${title}</h3>
                    </div>
                `;
            });

            const searchText = document.getElementById('searchText');
            if (searchText) {
                searchText.style.display = 'none';
            }

            document.getElementById('pgNum').textContent = `Page ${currentPage}`;
            document.querySelector('.pages').style.display = 'block';
            document.getElementById('searchPrompt').textContent = `Here Are Images of "${searchValue}" !`;
        })
        .catch(error => {
            console.error('Error fetching the GIFs:', error);
        });
}


document.getElementById('searchBtn').addEventListener('click', () => {
    currentPage = 1; 
    handleClick(); 
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        handleClick(); 
    }
});


document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    handleClick(); 
});


document.addEventListener('DOMContentLoaded', () => {
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.pages').style.display = 'none';
});
