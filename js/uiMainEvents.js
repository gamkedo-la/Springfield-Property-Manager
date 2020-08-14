[...document.getElementsByClassName('tabs')].forEach(e => {
  e.addEventListener('click', (e) => {
    tabClicked(e);
  })
});

tabClicked = (e) => {
  const tabs = [...document.getElementsByClassName('tabs')];
  var clickedTabNum = 0;
  // remove old highlights if any
  for(let i = 0; i < tabs.length; i++) {
    let isHighlighted = tabs[i];
    if(isHighlighted.classList.contains('highlight')) {
      isHighlighted.classList.remove('highlight')
    }
    // which tab was just clicked? used by statsGraph.js
    if (e.currentTarget==isHighlighted) {
        changeStatsTab(i);
    }
  }
  // set current highlight
  e.currentTarget.classList.add('highlight');

} 



