# Taller Programación 2 – Conceptos P2

## Instalación

1. `git clone <https://github.com/EFeijoo/taller-programacion2-emanuel.git>`
2. `npm install`
3. `npm start`
4. Abrir `frontend/index.html` en el navegador

## Endpoints

- GET `/conceptos` → lista completa
- GET `/conceptos/:id` → concepto por índice
- POST `/conceptos` → crea un nuevo concepto
- DELETE `/conceptos` → borra todos
- DELETE `/conceptos/:id` → borra uno

## Pruebas

1. **GET lista vacía**  
   Resultado esperado: `[]`  
   ![GET vacío](capturas/get-vacio.png)

2. **POST nuevo concepto**  
   Request body:  
   ```json
   { "nombre": "Node.js", "descripcion": "JS en servidor" }