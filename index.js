const chemicalData = [
  {
    id: 1,
    chemicalName: "Acetone",
    vendor: "ChemCorp",
    density: "0.79 g/cm³",
    viscosity: "0.32 cP",
    packaging: "Plastic Drum",
    packSize: "20",
    unit: "L",
    quantity: "200",
  },
  {
    id: 2,
    chemicalName: "Methanol",
    vendor: "LabWorks",
    density: "0.79 g/cm³",
    viscosity: "0.55 cP",
    packaging: "Glass Bottle",
    packSize: "5",
    unit: "L",
    quantity: "50",
  },
  {
    id: 3,
    chemicalName: "Ethanol",
    vendor: "BioChem",
    density: "0.789 g/cm³",
    viscosity: "1.2 cP",
    packaging: "Plastic Drum",
    packSize: "25",
    unit: "L",
    quantity: "300",
  },
  {
    id: 4,
    chemicalName: "Glycerin",
    vendor: "ChemCorp",
    density: "1.26 g/cm³",
    viscosity: "950 cP",
    packaging: "Plastic Drum",
    packSize: "20",
    unit: "kg",
    quantity: "150",
  },
  {
    id: 5,
    chemicalName: "Hydrogen Peroxide",
    vendor: "PureChem",
    density: "1.45 g/cm³",
    viscosity: "1.25 cP",
    packaging: "Plastic Canister",
    packSize: "10",
    unit: "L",
    quantity: "80",
  },
  {
    id: 6,
    chemicalName: "Sulfuric Acid",
    vendor: "LabWorks",
    density: "1.84 g/cm³",
    viscosity: "26 cP",
    packaging: "Glass Bottle",
    packSize: "5",
    unit: "L",
    quantity: "60",
  },
  {
    id: 7,
    chemicalName: "Ammonia",
    vendor: "BioChem",
    density: "0.73 g/cm³",
    viscosity: "0.98 cP",
    packaging: "Plastic Drum",
    packSize: "25",
    unit: "kg",
    quantity: "200",
  },
  {
    id: 8,
    chemicalName: "Sodium Hydroxide",
    vendor: "ChemCorp",
    density: "2.13 g/cm³",
    viscosity: "52 cP",
    packaging: "Plastic Canister",
    packSize: "10",
    unit: "kg",
    quantity: "120",
  },
  {
    id: 9,
    chemicalName: "Acetic Acid",
    vendor: "PureChem",
    density: "1.05 g/cm³",
    viscosity: "1.2 cP",
    packaging: "Plastic Drum",
    packSize: "20",
    unit: "L",
    quantity: "100",
  },
  {
    id: 10,
    chemicalName: "Formaldehyde",
    vendor: "LabWorks",
    density: "0.815 g/cm³",
    viscosity: "1.5 cP",
    packaging: "Glass Bottle",
    packSize: "5",
    unit: "L",
    quantity: "70",
  },
  {
    id: 11,
    chemicalName: "Sodium Chloride",
    vendor: "ChemCorp",
    density: "2.16 g/cm³",
    viscosity: "1.2 cP",
    packaging: "Plastic Canister",
    packSize: "10",
    unit: "kg",
    quantity: "150",
  },
  {
    id: 12,
    chemicalName: "Nitric Acid",
    vendor: "PureChem",
    density: "1.51 g/cm³",
    viscosity: "1.4 cP",
    packaging: "Plastic Drum",
    packSize: "20",
    unit: "L",
    quantity: "200",
  },
  {
    id: 13,
    chemicalName: "Isopropanol",
    vendor: "BioChem",
    density: "0.785 g/cm³",
    viscosity: "2.4 cP",
    packaging: "Glass Bottle",
    packSize: "5",
    unit: "L",
    quantity: "75",
  },
  {
    id: 14,
    chemicalName: "Hydrochloric Acid",
    vendor: "LabWorks",
    density: "1.19 g/cm³",
    viscosity: "1.9 cP",
    packaging: "Plastic Drum",
    packSize: "25",
    unit: "L",
    quantity: "150",
  },
  {
    id: 15,
    chemicalName: "Potassium Hydroxide",
    vendor: "ChemCorp",
    density: "2.04 g/cm³",
    viscosity: "78 cP",
    packaging: "Plastic Canister",
    packSize: "10",
    unit: "kg",
    quantity: "100",
  },
];

let currentEditIndex = null;
let ascending = true;
const tableBody = document.getElementById("tableBody");

function renderTable() {
  tableBody.innerHTML = "";
  chemicalData.forEach((item, index) => {
    const row = `
      <tr data-index="${index}">
        <td>${item.id}</td>
        <td contenteditable="true" data-field="chemicalName">${item.chemicalName}</td>
        <td contenteditable="true" data-field="vendor">${item.vendor}</td>
        <td contenteditable="true" data-field="density">${item.density}</td>
        <td contenteditable="true" data-field="viscosity">${item.viscosity}</td>
        <td contenteditable="true" data-field="packaging">${item.packaging}</td>
        <td contenteditable="true" data-field="packSize">${item.packSize}</td>
        <td contenteditable="true" data-field="unit">${item.unit}</td>
        <td contenteditable="true" data-field="quantity">${item.quantity}</td>
      </tr>`;
    tableBody.innerHTML += row;
  });
  addEditableEventListeners();
  addRowSelectionListener();
}

function addRowSelectionListener() {
  document.querySelectorAll("tbody tr").forEach((row) => {
    row.addEventListener("click", function () {
      document
        .querySelectorAll("tbody tr")
        .forEach((r) => r.classList.remove("selected"));
      this.classList.add("selected");
      currentEditIndex = parseInt(this.getAttribute("data-index"));
    });
  });
}

function addEditableEventListeners() {
  document.querySelectorAll('[contenteditable="true"]').forEach((cell) => {
    cell.addEventListener("blur", function () {
      const rowIndex = this.closest("tr").getAttribute("data-index");
      const field = this.getAttribute("data-field");
      const newValue = this.textContent.trim();

      chemicalData[rowIndex][field] = newValue;
    });
  });
}

function sortTable(columnIndex) {
  const columnKey = Object.keys(chemicalData[0])[columnIndex];

  chemicalData.sort((a, b) => {
    if (ascending) {
      return a[columnKey] > b[columnKey] ? 1 : -1;
    } else {
      return a[columnKey] < b[columnKey] ? 1 : -1;
    }
  });
  ascending = !ascending;
  renderTable();
}

function addRow() {
  const newRow = {
    id: chemicalData.length + 1,
    chemicalName: "New Chemical",
    vendor: "New Vendor",
    density: "0.00 g/cm³",
    viscosity: "0.00 cP",
    packaging: "New Packaging",
    packSize: "0",
    unit: "L",
    quantity: "0",
  };
  chemicalData.push(newRow);
  renderTable();
}

function deleteRow() {
  const selectedRow = document.querySelector("tr.selected");
  if (selectedRow) {
    const index = parseInt(selectedRow.getAttribute("data-index"));
    chemicalData.splice(index, 1);
    renderTable();
  } else {
    alert("Please select a row first!");
  }
}

function highlightRow(index) {
  document
    .querySelectorAll("tr")
    .forEach((row) => row.classList.remove("selected"));
  document.querySelector(`tr[data-index="${index}"]`).classList.add("selected");
}

function moveRowUp() {
  if (currentEditIndex > 0) {
    [chemicalData[currentEditIndex], chemicalData[currentEditIndex - 1]] = [
      chemicalData[currentEditIndex - 1],
      chemicalData[currentEditIndex],
    ];
    currentEditIndex--;
    renderTable();
    highlightRow(currentEditIndex);
  }
}

function moveRowDown() {
  if (currentEditIndex < chemicalData.length - 1) {
    [chemicalData[currentEditIndex], chemicalData[currentEditIndex + 1]] = [
      chemicalData[currentEditIndex + 1],
      chemicalData[currentEditIndex],
    ];
    currentEditIndex++;
    renderTable();
    highlightRow(currentEditIndex);
  }
}

function refreshData() {
  renderTable();
}

function saveData() {
  const dataStr = JSON.stringify(chemicalData);
  localStorage.setItem("chemicalData", dataStr);
  alert("Data saved!");
}

window.onload = () => {
  renderTable();
};
