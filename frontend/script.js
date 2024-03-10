document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    axios
      .post("http://localhost:3000/expenses", {
        name,
        description,
        price,
      })
      .then((response) => {
        const { name, description, price } = response.data;

        const output = document.getElementById("output");

        const expenseElement = document.createElement("div");
        expenseElement.classList.add("expense");

        expenseElement.innerHTML = `
                    <p><strong>Expense Name:</strong> ${name}</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <button class="delete-btn" data-id="${response.data.id}">Delete</button>
                `;

        output.appendChild(expenseElement);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred");
      });
  });

axios
  .get("http://localhost:3000/expenses")
  .then((response) => {
    const expenses = response.data;
    const output = document.getElementById("output");

    expenses.forEach((expense) => {
      const expenseElement = document.createElement("div");
      expenseElement.classList.add("expense");

      expenseElement.innerHTML = `
                        <p><strong>Expense Name:</strong> ${expense.name}</p>
                        <p><strong>Description:</strong> ${expense.description}</p>
                        <p><strong>Price:</strong> ${expense.price}</p>
                        <button class="delete-btn" data-id="${expense.id}">Delete</button>
                    `;

      output.appendChild(expenseElement);
    });
  })
  .catch((error) => {
    console.error(error);
    alert("An error occurred");
  });

document.getElementById("output").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const expenseId = event.target.getAttribute("data-id");

    axios
      .delete(`http://localhost:3000/expenses/${expenseId}`)
      .then(() => {
        event.target.parentNode.remove();
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred");
      });
  }
});
