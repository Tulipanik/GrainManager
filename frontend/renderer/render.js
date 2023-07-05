import("../api/api_frontend.js");

window.onload = function () {
  getCrossTableData().then((receivedData) => {
    receivedData.sort((a, b) => {
      if (a.company !== b.company) {
        a.company.localeCompare(b.company);
      }
      a.grain.localeCompare(b.grain);
    });
    const uniqueGrain = [...new Set(receivedData.map((item) => item.grain))];
    let table = "<table> <th>company\\wheat</th>";
    uniqueGrain.forEach((item) => {
      table += " <th>" + item + "</th>";
    });
    let i = 0;
    let grain = 0;
    let company = 0;
    if (receivedData.length == 0) {
      table = "Sorry, there's no active contracts";
    }

    while (i < receivedData.length) {
      if (grain == 0) {
        table += "<tr>";
        company = receivedData[i].company;
        table += "<td>" + company + "</td>";
      }
      if (company == receivedData[i].company) {
        if (receivedData[i].grain == uniqueGrain[grain]) {
          toSell = receivedData[i].amount - receivedData[i].sold;
          table += "<td>" + toSell + "</td>";
          i += 1;
        } else {
          table += "<td></td>";
        }
      } else {
        table += "<td></td>";
      }
      grain += 1;
      if (grain == uniqueGrain.length) {
        table += "</th>\n";
        grain = 0;
      }
    }
    document.getElementById("cross_table").innerHTML = table;
  });
};
