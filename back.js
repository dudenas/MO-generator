const backButton = document.getElementById('back');
backButton.addEventListener('click', () => {
    window.location.href = '../';
});

const style = document.createElement('style');
style.innerHTML = `
#back {
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
    z-index: 1000;
}
`;

document.head.appendChild(style);