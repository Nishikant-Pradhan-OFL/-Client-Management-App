let clients = JSON.parse(localStorage.getItem("clients")) || [];

const clientForm = document.getElementById("client-form");
const clientList = document.getElementById("client-list");

function renderClients() 
{
  clientList.innerHTML = '';
  clients.forEach((client, index) => {
    const clientDiv = document.createElement("div");
    clientDiv.className = "client";
    clientDiv.innerHTML = `
      <h3>${client.name}</h3>
      <p>Email: ${client.email}</p>
      <p>Phone: ${client.phone}</p>
      <p>Notes: ${client.notes}</p>
      <div class="client-actions">
        <button class="edit" onclick="editClient(${index})">Edit</button>
        <button class="delete" onclick="deleteClient(${index})">Delete</button>
      </div>
    `;
    clientList.appendChild(clientDiv);
  });
}

function saveClients() 
{
  localStorage.setItem("clients", JSON.stringify(clients));
}

clientForm.addEventListener("submit", function(e) 
{
  e.preventDefault();
  const newClient = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    notes: document.getElementById("notes").value,
  };
  clients.push(newClient);
  saveClients();
  renderClients();
  clientForm.reset();
});

function deleteClient(index) 
{
  if (confirm("Delete this client?")) 
  {
    clients.splice(index, 1);
    saveClients();
    renderClients();
  }
}

function editClient(index) 
{
  const client = clients[index];
  document.getElementById("name").value = client.name;
  document.getElementById("email").value = client.email;
  document.getElementById("phone").value = client.phone;
  document.getElementById("notes").value = client.notes;
  clients.splice(index, 1);
  saveClients();
  renderClients();
}

renderClients();

document.getElementById("search").addEventListener("input", function () 
{
  const keyword = this.value.toLowerCase();
  const filtered = clients.filter(client =>
    client.name.toLowerCase().includes(keyword)
  );
  renderClients(filtered);
});

function renderClients(list = clients) 
{
  clientList.innerHTML = '';
  list.forEach((client, index) => {
    const clientDiv = document.createElement("div");
    clientDiv.className = "client";
    clientDiv.innerHTML = `
      <h3>${client.name}</h3>
      <p>Email: ${client.email}</p>
      <p>Phone: ${client.phone}</p>
      <p>Notes: ${client.notes}</p>
      <div class="client-actions">
        <button class="edit" onclick="editClient(${index})">Edit</button>
        <button class="delete" onclick="deleteClient(${index})">Delete</button>
      </div>
    `;
    clientList.appendChild(clientDiv);
  });
}

function exportCSV() 
{
  const headers = ["Name", "Email", "Phone", "Notes"];
  const rows = clients.map(client => [client.name, client.email, client.phone, client.notes]);
  let csvContent = "data:text/csv;charset=utf-8," 
    + [headers, ...rows].map(e => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "clients.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
