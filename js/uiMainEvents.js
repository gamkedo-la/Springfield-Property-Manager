[...document.getElementsByClassName('tabs')].forEach(e => {
  e.addEventListener('click', (e) => {
    tabClicked(e);
  })
});

tabClicked = (e) => {
  const tabs = [...document.getElementsByClassName('tabs')];
  for(let i = 0; i < tabs.length; i++) {
    let isHighlighted = tabs[i];
    if(isHighlighted.classList.contains('highlight')) {
      isHighlighted.classList.remove('highlight')
    } else {
      e.currentTarget.classList.add('highlight');
    }
  }
} 



