// Export the applyFilter function
export function applyFilter () {
  const selectedGender = document.getElementById('genderFilter2').value;

  window.visibleRows.forEach(function (row) {
    const genderCell = row.querySelector('td:nth-child(2)');
    const gender = genderCell.textContent;

    const matchesGender = selectedGender === '' || gender === selectedGender;

    if (matchesGender) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  window.visibleRows = Array.from(document.querySelectorAll('.table tbody tr'));

  // Attach the applyFilter function to the change event of the genderFilter
  const genderFilter = document.getElementById('genderFilter2');
  genderFilter.addEventListener('change', applyFilter);

  // Initial application of the filter when the page loads
  applyFilter();
});
