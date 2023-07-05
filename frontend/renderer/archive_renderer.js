import("../api/api_frontend.js");

window.onload = function () {
  getContractData("/archive").then((archiveContract) => {
    let table =
      "<table>\n <th> Lp. </th>\n <th> Contract number </th>\n <th>Company</th>\n <th> Wheat </th>\n <th> Description </th>\n <th> Basic price </th>\n <th> Weight </th>";
    let sum = 0;
    if (archiveContract === undefined || archiveContract.length == 0) {
      table = "Sorry, there's no archive contracts";
      document.getElementById("product_list").classList.add("no_contracts");
    } else {
      for (let i = 0; i < archiveContract.length; i++) {
        sum += archiveContract[i].amount;
        table += "<tr>\n";
        table += "<td>" + (i + 1) + "</td>\n";
        table += "<td>" + archiveContract[i].contractNumber + "</td>\n";
        table += "<td>" + archiveContract[i].company + "</td>\n";
        table += "<td>" + archiveContract[i].wheat + "</td>\n";
        table += "<td>" + archiveContract[i].description + "</td>\n";
        table += "<td>" + archiveContract[i].basicPrice + "</td>\n";
        table += "<td>" + archiveContract[i].amount + "</td>\n";
        table += "</tr>\n";
      }
      table += "</table>";
      document.getElementById("product_list").classList.add("with_contracts");
    }
    document.getElementById("sum").innerHTML = sum;
    document.getElementById("product_list").innerHTML = table;
  });

  const table = document.getElementById("product_list");

  table.addEventListener("click", function (event) {
    if (event.target.nodeName === "TD") {
      const clickedRow = event.target.parentNode;
      rowData = Array.from(clickedRow.cells).map((cell) => cell.textContent);
      localStorage.setItem("rowData", rowData[1]);
      localStorage.setItem("archive", true);
      window.location.href = `../frontend_look/contract.html`;
    }
  });
};
