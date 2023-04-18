// Get references to the dropdowns and table containers
const portfolioDropdown = document.getElementById('portfolio-dropdown');
const dateDropdown = document.getElementById('date-dropdown');
const tableContainer = document.getElementById('table-container');

// Add event listeners to the dropdowns
portfolioDropdown.addEventListener('change', updateTable);
dateDropdown.addEventListener('change', updateTable);

// Define a function to update the table with portfolio data
function updateTable() {
  // Get the selected portfolio and date
  const portfolio = portfolioDropdown.value;
  const date = dateDropdown.value;

  // Send an AJAX request to retrieve the portfolio data
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/portfolio/${portfolio}/${date}`);
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Parse the JSON response and create a table
      const data = JSON.parse(xhr.responseText).data;
      const table = createTable(data);
      // Replace the contents of the table container with the new table
      tableContainer.innerHTML = '';
      tableContainer.appendChild(table);
    } else {
      console.error('Error retrieving portfolio data:', xhr.statusText);
    }
  };
  xhr.onerror = function() {
    console.error('Error retrieving portfolio data:', xhr.statusText);
  };
  xhr.send();
}

// Define a function to create a table from portfolio data
function createTable(data) {
  // Create the table element and header row
  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const headers = ['Symbol', 'Quantity', 'Price'];
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);
  // Create a row for each stock in the portfolio
  data.forEach(stock => {
    const row = document.createElement('tr');
    Object.values(stock).forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  // Return the completed table
  return table;
}

// Initialize the table with the default portfolio and date
updateTable();
