const form = document.getElementById('concepto-form');
const lista = document.getElementById('lista-conceptos');
const API = 'http://localhost:3000/conceptos';

async function fetchConceptos() {
  const res = await fetch(API);
  const datos = await res.json();
  renderList(datos);
}

function renderList(items) {
  lista.innerHTML = '';
  items.forEach((c, i) => {
    const cont = document.createElement('div');
    cont.innerHTML = `
      <span><strong>${c.nombre}</strong>: ${c.descripcion}</span>
      <button data-id="${i}">Eliminar</button>
    `;
    lista.appendChild(cont);
  });
  attachDelete();
}

function attachDelete() {
  lista.querySelectorAll('button').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      fetchConceptos();
    };
  });
}

form.onsubmit = async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion })
  });
  form.reset();
  fetchConceptos();
};

fetchConceptos();