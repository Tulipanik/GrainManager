async function getCoursesData(contractNumber) {
  try {
    const response = await fetch(url + "/active/current/courses", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: String(contractNumber),
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

async function sendCourseData(toSend) {
  console.log(toSend);
  try {
    const response = await fetch(url + "/active/current/sendCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSend),
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
