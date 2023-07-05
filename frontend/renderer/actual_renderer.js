import("../api/api_frontend.js");

window.onload = function () {
  getContractData("/active").then((activeContract) => {
    let table =
      "<table id='Table'>\n <th> Lp. </th>\n <th> Contract number </th>\n <th>Company</th>\n <th> Wheat </th>\n <th> Description </th>\n <th> Basic price </th>\n <th> To Sell </th>\n <th> Sold </th>";
    let sell = 0;
    let sold = 0;
    if (activeContract === undefined || activeContract.length == 0) {
      table = "Sorry, there's no archive contracts";
      document.getElementById("product_list").classList.add("no_contracts");
    } else {
      for (let i = 0; i < activeContract.length; i++) {
        sell += activeContract[i].amount - activeContract[i].sold;
        sold += activeContract[i].sold;
        table += "<tr>\n";
        table += "<td>" + (i + 1) + "</td>\n";
        table += "<td>" + activeContract[i].contractNumber + "</td>\n";
        table += "<td>" + activeContract[i].company + "</td>\n";
        table += "<td>" + activeContract[i].grain + "</td>\n";
        table += "<td>" + activeContract[i].description + "</td>\n";
        table += "<td>" + activeContract[i].basicPrice + "</td>\n";
        const toSell = parseFloat(
          (activeContract[i].amount - activeContract[i].sold).toFixed(2)
        );
        table += "<td>" + toSell + "</td>\n";
        table += "<td>" + activeContract[i].sold.toFixed(2) + "</td>\n";
        table += "</tr>\n";
      }
      table += "</table>";
      document.getElementById("product_list").classList.add("with_contracts");
    }
    document.getElementById("sell").innerHTML = sell.toFixed(2);
    document.getElementById("sold").innerHTML = sold.toFixed(2);
    document.getElementById("product_list").innerHTML = table;
  });

  const table = document.getElementById("product_list");

  table.addEventListener("click", function (event) {
    if (event.target.nodeName === "TD") {
      const clickedRow = event.target.parentNode;
      rowData = Array.from(clickedRow.cells).map((cell) => cell.textContent);
      localStorage.setItem("rowData", rowData[1]);
      localStorage.setItem("archive", "");
      window.location.href = `../frontend_look/contract.html`;
    }
  });
};
