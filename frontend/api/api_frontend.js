const url = "http://localhost:3000";

async function getContractData(whereToLook) {
  const response = await fetch(url + whereToLook);
  const data = await response.json();
  return data;
}

async function getSingleContractData(number) {
  try {
    const response = await fetch(url + "/active/current", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: String(number),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch contract data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function sendContractData(receivedData) {
  fetch(url + "/active/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(receivedData),
  })
    .then(() => {
      document.getElementById("statement_text").innerHTML =
        "Wprowadzono nową umowę do bazy :)";
      document.getElementById("statement").style.display = "block";
      document.getElementById("form").reset();
      defaultDate();
      wait(5000).then((resolve) => {
        document.getElementById("statement").style.display = "none";
      });
    })
    .catch(() => {
      document.getElementById("statement").innerHTML =
        "Nie udało się wprowadzić umowy do bazy";
    });
}

async function getCrossTableData() {
  const response = await fetch(url + "/current");
  const data = await response.json();
  return data;
}

async function changeActivity(contractNumber) {
  fetch(url + "/active/addToArchive", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: String(contractNumber),
  })
    .then(() => {
      document.getElementById("statement_text").innerHTML =
        "Wprowadzono umowę do archiwum :)";
      document.getElementById("statement").style.display = "block";
      wait(5000).then((resolve) => {
        document.getElementById("statement").style.display = "none";
      });
    })
    .catch(() => {
      document.getElementById("statement").innerHTML =
        "Nie udało się wprowadzić umowy do bazy";
    });
}

async function getUnique(what) {
  try {
    const response = await fetch(url + what, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Request failed with status: " + response.status);
    }
  } catch (error) {
    console.log(error);
  }
}

function wait(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function defaultDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const dateInput = document.getElementById("date");
  dateInput.value = formattedDate;
}
