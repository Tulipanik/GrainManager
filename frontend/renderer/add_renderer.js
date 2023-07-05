import("../api/api_frontend.js");
const edit = Boolean(localStorage.getItem("edit"));
let id = "";

window.onload = function () {
  getUnique("/unique/grain").then((data) => {
    createDropdown(data, "grainData");
  });
  getUnique("/unique/company").then((data) => {
    createDropdown(data, "companyData");
  });

  if (edit) {
    const searchParams = new URLSearchParams(window.location.search);
    const obj = Object.fromEntries(searchParams.entries());
    getSingleContractData(String(obj.contractNumber)).then((data) => {
      document.getElementById("contractNumber").value = data[0].contractNumber;
      document.getElementById("company").value = data[0].company;
      document.getElementById("wheat").value = data[0].grain;
      document.getElementById("price").value = data[0].basicPrice;
      document.getElementById("description").value = data[0].description;
      document.getElementById("weight").value = data[0].amount;
      document.getElementById("date").value = data[0].date;
      id = data[0]._id;
      localStorage.setItem("edit", "");
    });
  }
};

function validate(event) {
  event.preventDefault();

  const contractNumber = document.getElementById("contractNumber").value.trim();
  const company = document.getElementById("company").value.trim();
  const wheat = document.getElementById("wheat").value.trim();
  const price = document.getElementById("price").value.trim();
  const description = document.getElementById("description").value.trim();
  const weight = document.getElementById("weight").value.trim();
  const date = document.getElementById("date").value.trim();
  let checker = 0;

  document.getElementById("error").innerHTML = "";

  if (company == "") {
    document.getElementById("contractNumber").innerHTML = null;
    document.getElementById("contractNumber").classList.add("error_style");
    document.getElementById("contractNumber").placeholder =
      "Write correct company!";
    checker += 1;
  }

  if (company == "") {
    document.getElementById("company").innerHTML = null;
    document.getElementById("company").classList.add("error_style");
    document.getElementById("company").placeholder = "Write correct company!";
    checker += 1;
  }

  if (wheat == "") {
    document.getElementById("wheat").innerHTML = null;
    document.getElementById("wheat").classList.add("error_style");
    document.getElementById("wheat").placeholder = "Write correct wheat!";
    checker += 1;
  }

  if (isNaN(price)) {
    document.getElementById("price").innerHTML = null;
    document.getElementById("price").classList.add("error_style");
    document.getElementById("price").placeholder = "Write correct price!";
    checker += 1;
  }

  if (weight == "" || isNaN(weight) || Number(weight) < 0) {
    document.getElementById("weight").innerHTML = null;
    document.getElementById("weight").classList.add("error_style");
    document.getElementById("weight").placeholder = "Write correct weight!";
    checker += 1;
  }

  if (checker != 0) {
    return false;
  }

  let receivedData = {
    contractNumber: contractNumber,
    company: company,
    grain: wheat,
    description: String(description),
    basicPrice: Number(price),
    amount: Number(weight),
    date: new Date(Date.parse(date)),
  };

  if (id != "") {
    receivedData._id = id;
  }
  sendContractData(receivedData);
}

function createDropdown(dropData, whatToDrop) {
  let toDrop = "";
  dropData.forEach((element) => {
    toDrop += "<option value='" + element + "'>\n";
  });
  document.getElementById(whatToDrop).innerHTML = toDrop;
}

window.sharedFunctions = {
  dropdown: createDropdown,
};
