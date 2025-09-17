const API = 'http://localhost:3000/conceptos';
let conceptosCache = [];
let editingId = null;

const form = document.getElementById('concepto-form');
const lista = document.getElementById('lista-conceptos');
const submitBtn = form.querySelector('button[type="submit"]');

async function fetchConceptos() {
  const res = await fetch(API);
  conceptosCache = await res.json();
  renderList();
}

function renderList() {
  lista.innerHTML = '';
  conceptosCache.forEach((c, i) => {
    const cont = document.createElement('div');
    cont.innerHTML = `
      <span><strong>${c.nombre}</strong>: ${c.descripcion}</span>
      <div>
        <button class="edit-btn" data-id="${i}">Configurar</button>
        <button class="delete-btn" data-id="${i}">Eliminar</button>
      </div>
    `;
    lista.appendChild(cont);
  });
  attachButtons();
}

function attachButtons() {
  // Botones Eliminar
  lista.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      fetchConceptos();
    };
  });

  // Botones Configurar (editar)
  lista.querySelectorAll('.edit-btn').forEach(btn => {
    btn.onclick = () => {
      editingId = btn.dataset.id;
      const { nombre, descripcion } = conceptosCache[editingId];
      document.getElementById('nombre').value = nombre;
      document.getElementById('descripcion').value = descripcion;
      submitBtn.textContent = 'Guardar Cambios';
    };
  });
}

form.onsubmit = async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const method = editingId === null ? 'POST' : 'PUT';
  const url = editingId === null ? API : `${API}/${editingId}`;

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, descripcion })
  });

  // Resetar estado
  editingId = null;
  form.reset();
  submitBtn.textContent = 'Agregar Concepto';
  fetchConceptos();
};

// Inicializar lista
fetchConceptos();