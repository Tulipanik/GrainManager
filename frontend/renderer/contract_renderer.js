import("../api/api_frontend.js");
import("../api/api_frontend_courses.js");
const rowDataString = localStorage.getItem("rowData");
const archive = Boolean(localStorage.getItem("archive"));
const rowData = rowDataString;
let response;
let id = "";
window.onload = function () {
  import("./add_renderer.js").then(() => {
    const dropdown = window.sharedFunctions.dropdown;
    getUnique("/unique/cars").then((data) => {
      dropdown(data, "carData");
    });
  });

  defaultDate();

  if (archive) {
    const form = document.getElementById("course_form");
    const button = document.getElementById("button");
    form.style.display = "none";
    button.disabled = false;

    document.getElementById("foot").style.display = "none";
  }
  var contractData;
  getSingleContractData(rowData).then((res) => {
    contractData = res[0];
    document.getElementById("contract_number").innerHTML = rowData;
    document.getElementById("company").innerHTML = contractData.company;
    document.getElementById("grain").innerHTML = contractData.grain;
    document.getElementById("price").innerHTML = contractData.basicPrice;
    document.getElementById("toSell").innerHTML = contractData.amount;
    document.getElementById("sold").innerHTML = contractData.sold.toFixed(2);
    if (archive) {
      button.innerHTML = contractData.endDate.split("T")[0];
    } else {
      document.getElementById("priceSold").value = contractData.basicPrice;
    }
  });
  getCoursesData(rowData).then((res) => {
    response = res;
    let table =
      "<table><thead><td>Lp.</td><td>Date</td><td>Car</td><td>Description</td><td>Weight</td><td>Price</td><thead><tbody>";
    for (let i = 0; i < res.length; i++) {
      table += "<tr>";
      number = i + 1;
      table += "<td>" + number + "</td>";
      if (res[i].date != null) {
        table += "<td>" + res[i].date.split("T")[0] + "</td>";
      } else {
        table += "<td>" + res[i].date + "</td>";
      }

      table += "<td>" + res[i].car + "</td>";
      table += "<td>" + res[i].description + "</td>";
      table += "<td>" + res[i].weight + "</td>";
      table += "<td>" + res[i].soldPrice + "</td>";
      table += "</tr>";
    }
    table += "</tbody></table>";
    document.getElementById("table_data").innerHTML = table;
  });

  const table = document.getElementById("table_data");

  table.addEventListener("click", function (event) {
    if (event.target.nodeName === "TD") {
      const clickedRow = event.target.parentNode;
      const rowData = Array.from(clickedRow.cells).map(
        (cell) => cell.textContent
      );

      document.getElementById("date").value = rowData[1].split("T")[0];
      document.getElementById("car").value = rowData[2];
      document.getElementById("description").value = rowData[3];
      document.getElementById("weight").value = rowData[4];
      document.getElementById("priceSold").value = rowData[5];
      id = response[Number(rowData[0]) - 1]._id;
    }
  });
};

function courseValidation(event) {
  event.preventDefault();

  const course = buildObject(id);
  id = "";

  if (course) {
    sendCourseData(course);
    location.reload();
  }
}

function addToArchive() {
  changeActivity(rowData);
}

function buildObject(id) {
  const data = document.getElementById("date").value.trim();
  const car = document.getElementById("car").value.trim();
  const description = document.getElementById("description").value.trim();
  const weight = document.getElementById("weight").value.trim();
  const price = document.getElementById("priceSold").value.trim();
  let checker = 0;
  if (isNaN(weight) || weight < 0 || weight == "") {
    checker += 1;
    document.getElementById("weight").classList.add("error_style");
    document.getElementById("weight").classList.add("error_style");
    document.getElementById("weight").value = null;
    document.getElementById("weight").placeholder = "Write correct weight!";
  }
  if (isNaN(price) || price < 0 || price == "") {
    checker += 1;
    document.getElementById("priceSold").classList.add("error_style");
    document.getElementById("priceSold").classList.add("error_style");
    document.getElementById("priceSold").value = null;
    document.getElementById("priceSold").placeholder = "Write correct price!";
  }
  if (checker != 0) {
    return false;
  }

  const course = {
    contractNumber: rowData,
    date: data,
    car: car,
    description: description,
    weight: weight,
    soldPrice: price,
  };

  if (id != "") {
    course._id = id;
  }

  return course;
}

function onEdit() {
  getSingleContractData(rowData).then((data) => {
    const queryString = new URLSearchParams(data[0]).toString();
    const url = `../frontend_look/add.html?${queryString}`;
    localStorage.setItem("edit", true);
    window.location.href = url;
  });
}
