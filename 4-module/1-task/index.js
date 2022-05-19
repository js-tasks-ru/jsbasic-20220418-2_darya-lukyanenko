function makeFriendsList(arr) {
  let ul = document.createElement('ul');
  ul.innerHTML = arr.map(e => `<li>${Object.values(e).join(' ')}</li>`).join('');
  return ul;
}
