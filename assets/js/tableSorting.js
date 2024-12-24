export function sortTable () {
  const table = document.querySelector('.table');
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    const nameA = a.cells[0].textContent.trim().toUpperCase();
    const nameB = b.cells[0].textContent.trim().toUpperCase();
    return nameA.localeCompare(nameB);
  });

  tbody.innerHTML = '';
  rows.forEach(row => {
    tbody.appendChild(row);
  });
}

const tableHeader = document.querySelector('.table thead tr');
if (tableHeader) {
  tableHeader.addEventListener('click', sortTable);
}
