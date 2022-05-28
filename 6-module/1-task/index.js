/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.render();
  }

  render() {
    this.elem = this.renderTable();
    this.buttonAddEventListener();
  }

  renderTable() {
    const table = document.createElement('table');

    table.innerHTML = `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    ${this.rows.map(({name, age, salary, city}) =>`
      <tr>
        <td>${name}</td>
        <td>${age}</td>
        <td>${salary}</td>
        <td>${city}</td>
        <td><button>X</button></td>
      </tr>
    `).join('')}
    </tbody>
    `;

    return table;
  }

  deleteRow({target}){
    target.closest('tr').remove();
    target.removeEventListener('click', this.deleteRow);
  }

  buttonAddEventListener(){
    const buttons = this.elem.querySelectorAll('button');

    buttons.forEach((button)=> {
      button.addEventListener('click', this.deleteRow);
    })
  }
}

