import { hello } from './utils.js';
import { sortTable } from './tableSorting.js';
import { greetFromLibrary } from './libs/library.js';
import { addToNotepad } from './addToNotepad.js';
import { removeFromNotepad } from './removeFromNotepad.js';
import { togglePriority } from './togglePriority.js';
import { applyFilter } from './filterByGender.js';
import { handlePagination } from './handlePagination.js';

hello();
sortTable();
greetFromLibrary();

document.addEventListener('DOMContentLoaded', function () {
  window.visibleRows = Array.from(document.querySelectorAll('.table tbody tr'));

  handlePagination();

  // Attach the applyFilter function to the change event of the genderFilter
  const genderFilter = document.getElementById('genderFilter2');
  genderFilter.addEventListener('change', applyFilter);

  // Initial application of the filter when the page loads
  applyFilter();

  // Add event listeners for other functionalities
  document.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('add')) {
      const userId = target.getAttribute('data-id');
      addToNotepad(userId);
    } else if (target.classList.contains('remove')) {
      const userId = target.getAttribute('data-id');
      removeFromNotepad(userId);
    } else if (target.classList.contains('priority')) {
      const userId = target.getAttribute('data-id');
      togglePriority(userId);
    }
  });
});
