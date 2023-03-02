import './sidebar.css';

const toggler = document.querySelector('#toggler');
const sidebar = document.querySelector('#sidebar');

toggler.addEventListener('change', e => {
    if(toggler.checked) {
        sidebar.classList.add('hidden');
        return
    }
    sidebar.classList.remove('hidden');
})