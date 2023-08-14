document.addEventListener('DOMContentLoaded', (event) => {
    // Your navigation bar code here
    document.querySelector('.menu-toggle').addEventListener('click', () => {
      const ul = document.querySelector('.navbarhome ul');
      ul.style.display = ul.style.display === 'none' || ul.style.display === '' ? 'flex' : 'none';
    });
});
 