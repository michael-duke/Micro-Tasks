const refreshBtn = document.querySelector('.refresh');

const rotate = () => {
  refreshBtn.classList.add('rotate-[-180deg]');
  setTimeout(() => refreshBtn.classList.remove('rotate-[-180deg]'), 700);
};

const rotateReverse = () => {
  refreshBtn.classList.add('rotate-180');
  setTimeout(() => refreshBtn.classList.remove('rotate-180'), 700);
};

export { rotate, rotateReverse };
