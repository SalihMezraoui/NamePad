function handlePagination () {
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const currentPageSpan = document.getElementById('currentPage');
  const totalPagesSpan = document.getElementById('totalPages');
  const filterForm = document.getElementById('filterForm'); // Add this line to select the form
  let currentPage = parseInt(currentPageSpan.textContent);
  const totalPages = parseInt(totalPagesSpan.textContent);

  console.log('Initial currentPage:', currentPage);
  console.log('Initial totalPages:', totalPages);

  function getCurrentGenderFilter () {
    const genderFilterElement = document.getElementById('genderFilter');
    return genderFilterElement ? genderFilterElement.value : '';
  }

  function getCurrentSearchFilter () {
    const searchInput = document.getElementById('searchInput');
    return searchInput ? searchInput.value : '';
  }

  function getCurrentSearchByPrefixFilter () {
    const searchInputPrefix = document.getElementById('searchInputPrefix');
    return searchInputPrefix ? searchInputPrefix.value : '';
  }

  function getCurrentSearchBySuffixFilter () {
    const searchInputSuffix = document.getElementById('searchInputSuffix');
    return searchInputSuffix ? searchInputSuffix.value : '';
  }

  function getCurrentSearchByNoPrefixFilter () {
    const searchInputNoPrefix = document.getElementById('searchInputNoPrefix');
    return searchInputNoPrefix ? searchInputNoPrefix.value : '';
  }

  function getCurrentSearchByNoSuffixFilter () {
    const searchInputNoSuffix = document.getElementById('searchInputNoSuffix');
    return searchInputNoSuffix ? searchInputNoSuffix.value : '';
  }

  function getCurrentSyllablesFilter () {
    const syllablesInput = document.getElementById('syllablesInputFilter');
    return syllablesInput ? syllablesInput.value : '';
  }

  function resetForm () {
    const form = document.getElementById('filterForm');
    form.reset();

    // Trigger form submission after reset
    form.dispatchEvent(new Event('submit'));
  }

  // Attach event listener to existing "Reset" button
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', resetForm);

  // Event listener for the "Previous" button
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      updatePage(currentPage, getCurrentGenderFilter(), getCurrentSearchFilter(), getCurrentSearchByPrefixFilter(), getCurrentSearchBySuffixFilter(), getCurrentSearchByNoPrefixFilter(), getCurrentSearchByNoSuffixFilter(), getCurrentSyllablesFilter());
    }
  });

  // Event listener for the "Next" button
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      updatePage(currentPage, getCurrentGenderFilter(), getCurrentSearchFilter(), getCurrentSearchByPrefixFilter(), getCurrentSearchBySuffixFilter(), getCurrentSearchByNoPrefixFilter(), getCurrentSearchByNoSuffixFilter(), getCurrentSyllablesFilter());
    }
  });

  // Prevent form submission default behavior
  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted');
    currentPage = 1;
    updatePage(currentPage, getCurrentGenderFilter(), getCurrentSearchFilter(), getCurrentSearchByPrefixFilter(), getCurrentSearchBySuffixFilter(), getCurrentSearchByNoPrefixFilter(), getCurrentSearchByNoSuffixFilter(), getCurrentSyllablesFilter());
  });
}

function updatePage (page, genderFilter, searchFilter, searchByPrefixFilter, searchBySuffixFilter, searchByNoPrefixFilter, searchByNoSuffixFilter, syllablesFilter) {
  // Retrieve the limit value from the input field
  const limitInputValue = document.getElementById('limitInput').value;
  const limit = limitInputValue ? `&limit=${limitInputValue}` : '';
  // Include the limit parameter in the request URL
  const url = `/api/users/filter?page=${page}&gender=${genderFilter}&search=${searchFilter}&searchPrefix=${searchByPrefixFilter}&searchSuffix=${searchBySuffixFilter}&searchNoPrefix=${searchByNoPrefixFilter}&searchNoSuffix=${searchByNoSuffixFilter}&syllables=${syllablesFilter}${limit}`;
  console.log('Fetching URL:', url);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Update the page content with the new data
      updatePageContent(data);
    })
    .catch(error => console.error('Error updating page:', error));
}

// function to update the page content
function updatePageContent (data) {
  const users = data.users;
  const currentPage = data.currentPage;
  const totalPages = data.totalPages;

  console.log('Updated currentPage:', currentPage);
  console.log('Updated totalPages:', totalPages);

  const tbody = document.querySelector('.table tbody');
  tbody.innerHTML = '';

  users.forEach(user => {
    const row = `<tr>
                        <td>${user.vorname}</td>
                        <td>${user.geschlecht}</td>
                        <td>
                            <a class="btn box-effect add" onclick="addToNotepad('${user._id}')">
                                <span class="colorful-text">
                                    <i class="fas fa-user-plus" title="in den Merkzettel eintragen"></i>
                                </span>
                            </a>
                        </td>
                    </tr>`;
    tbody.innerHTML += row;
  });

  const currentPageSpan = document.getElementById('currentPage');
  const totalPagesSpan = document.getElementById('totalPages');
  currentPageSpan.textContent = currentPage;

  if (totalPagesSpan.textContent !== totalPages.toString()) {
    totalPagesSpan.textContent = totalPages;
  }
}

// function handlePageChange (direction) {
//   const currentPageSpan = document.getElementById('currentPage');
//   const currentPage = parseInt(currentPageSpan.textContent);

//   const totalPagesSpan = document.getElementById('totalPages');
//   const totalPages = parseInt(totalPagesSpan.textContent);

//   const newPage = currentPage + direction;

//   if (newPage >= 1 && newPage <= totalPages) {
//     const genderFilter = getCurrentGenderFilter();
//     const searchFilter = getCurrentSearchFilter();
//     const searchByPrefixFilter = getCurrentSearchByPrefixFilter();
//     const searchBySuffixFilter = getCurrentSearchBySuffixFilter();
//     const searchByNoPrefixFilter = getCurrentSearchByNoPrefixFilter();
//     const searchByNoSuffixFilter = getCurrentSearchByNoSuffixFilter();
//     const searchBySyllablesFilter = getCurrentSyllablesFilter();
//     updatePage(newPage, genderFilter, searchFilter, searchByPrefixFilter, searchBySuffixFilter, searchByNoPrefixFilter, searchByNoSuffixFilter, searchBySyllablesFilter); // Pass the search filter to updatePage
//   }
// }

// Call the handlePagination function
handlePagination();

export { handlePagination, updatePage, updatePageContent };
