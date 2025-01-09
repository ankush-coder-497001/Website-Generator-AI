function createStars() {
  const starsContainer = document.querySelector('.stars');
  for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
      star.style.width = `${Math.random() * 2}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 1}s`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animation = 'twinkle 4s infinite';
      starsContainer.appendChild(star);
  }
}

export default createStars;