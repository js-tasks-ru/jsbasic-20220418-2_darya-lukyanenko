let table = document.querySelector('table'),
  makeDiagonalRed = tab => {
    let i = 0;
    [...tab.rows].forEach(tr => {
      if(i === tr.cells.length) i = 0;
      tr.cells[i].style.background = 'red';
      i++;
    });
  };

makeDiagonalRed(table);
