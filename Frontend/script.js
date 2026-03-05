document.addEventListener('DOMContentLoaded', () => {
    const birthdateInput = document.getElementById('birthdate');
    const searchButton = document.getElementById('searchButton');
    const resultSection = document.getElementById('resultSection');
    const loader = document.getElementById('loader');
    const apodContent = document.getElementById('apodContent');
    const errorMessage = document.getElementById('errorMessage');

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    birthdateInput.max = today;

    // Elements to populate
    const apodTitle = document.getElementById('apodTitle');
    const apodDate = document.getElementById('apodDate');
    const mediaContainer = document.getElementById('mediaContainer');
    const apodDescription = document.getElementById('apodDescription');
    const apodCopyright = document.getElementById('apodCopyright');

    searchButton.addEventListener('click', () => {
        const date = birthdateInput.value;

        if (!date) {
            showError('Por favor, selecione a data do seu aniversário.');
            return;
        }

        if (date < '1995-06-16') {
            showError('A API da NASA APOD só tem registros a partir de 16 de Junho de 1995. Por favor, escolha uma data a partir dessa.');
            return;
        }

        fetchApodData(date);
    });

    async function fetchApodData(date) {
        showLoader();

        try {
            // Updated to fetch from our Python FastAPI backend
            const response = await fetch(`http://127.0.0.1:8000/api/apod?date=${date}`);

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.detail || 'Falha ao buscar os dados nas estrelas.');
            }

            const data = await response.json();
            displayApodData(data);
        } catch (error) {
            showError(error.message);
        }
    }

    function showLoader() {
        resultSection.classList.remove('hidden');
        resultSection.classList.add('show');
        loader.classList.remove('hidden');
        apodContent.classList.add('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError(message) {
        resultSection.classList.remove('hidden');
        resultSection.classList.add('show');
        loader.classList.add('hidden');
        apodContent.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.querySelector('p').textContent = message;
    }

    function displayApodData(data) {
        loader.classList.add('hidden');
        apodContent.classList.remove('hidden');

        apodTitle.textContent = data.title;

        // Format date beautiful
        const dateObj = new Date(data.date);
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        apodDate.textContent = formattedDate;

        // Handle image vs video
        mediaContainer.innerHTML = '';
        if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.frameBorder = '0';
            iframe.allowFullscreen = true;
            // set aspect ratio
            iframe.style.aspectRatio = '16/9';
            mediaContainer.appendChild(iframe);
        } else {
            const img = document.createElement('img');
            img.src = data.hdurl || data.url;
            img.alt = data.title;
            // To handle lazy loading nicely
            img.loading = 'lazy';
            mediaContainer.appendChild(img);
        }

        apodDescription.textContent = data.explanation;

        if (data.copyright) {
            apodCopyright.textContent = `© Copyright: ${data.copyright}`;
        } else {
            apodCopyright.textContent = '';
        }

        // Scroll to result gently
        setTimeout(() => {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
});
