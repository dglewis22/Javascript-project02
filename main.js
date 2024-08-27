const api_key = //'IiPpLV9J1uCbOkbhfjcR20If9UWKkJM6';
let currentPage = 1; 
const limit = 16;

// function to return gifs to the output area
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

// Prev/Next button and page counter
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

// Form validation 
document.getElementById('signUpForm').addEventListener('submit', function(event) {
    let emailField = document.getElementById('email');
    let passwordField = document.getElementById('password');
    let messageDiv = document.getElementById('message');

    messageDiv.textContent = '';
    messageDiv.className = 'message';

    if (!emailField.checkValidity()) {
        messageDiv.textContent = 'Please enter a valid email address.';
        messageDiv.classList.add('error');
        event.preventDefault();
    } else if (passwordField.value.length < 6) {
        messageDiv.textContent = 'Password must be at least 6 characters long.';
        messageDiv.classList.add('error');
        event.preventDefault();
    } else {
        messageDiv.textContent = 'Form submitted successfully!';
        messageDiv.classList.add('success');

    }
});

// Applies "gif of the day" when selected in the menu
function GOTD() {
    currentPage = 1;
    document.getElementById('imgSearch').value = 'GIF Of The Day';
    handleClick();
}

