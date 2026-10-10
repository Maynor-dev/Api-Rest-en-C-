import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el formulario de nuevo cliente
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [telefono, setTelefono] = useState('');

  const obtenerClientes = () => {
    setLoading(true);
    fetch('https://localhost:7151/Clientes/ListarUsuarios')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la red: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setClientes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar clientes:', err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // Función para enviar el INSERT a la API de .NET
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevoCliente = {
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono
    };

    fetch('https://localhost:7151/Clientes/CrearCliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoCliente)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al registrar el cliente');
        }
        return response.json();
      })
      .then(() => {
        setNombre('');
        setApellidos('');
        setTelefono('');
        obtenerClientes();
      })
      .catch(err => {
        alert('No se pudo guardar el cliente: ' + err.message);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4 text-center text-primary">Gestión de la Empresa</h2>
      
      {/* Formulario para INSERT */}
      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3 text-secondary">Registrar Nuevo Cliente</h4>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Nombre</label> 
              <input 
                type="text" 
                className="form-control" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Apellidos</label>
              <input 
                type="text" 
                className="form-control" 
                value={apellidos} 
                onChange={(e) => setApellidos(e.target.value)} 
                required 
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">Teléfono</label>
              <input 
                type="text" 
                className="form-control" 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success">Guardar Cliente</button>
        </form>
      </div>

      {/* Tabla de SELECT */}
      <div className="card shadow p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-secondary m-0">Lista de Clientes</h4>
          <button className="btn btn-secondary btn-sm" onClick={obtenerClientes}>
            Actualizar Tabla
          </button>
        </div>

        {loading ? (
          <p className="text-center">Cargando clientes...</p>
        ) : error ? (
          <div className="alert alert-danger text-center">Error al conectar con la API: {error}</div>
        ) : clientes.length === 0 ? (
          <p className="text-center text-muted">No hay registros de clientes en la base de datos.</p>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={cliente.idCliente || cliente.IdCliente || cliente.id_cliente || index}>
                  <td>{cliente.idCliente || cliente.IdCliente || cliente.id_cliente}</td>
                  <td>{cliente.nombre || cliente.Nombre}</td>
                  <td>{cliente.apellidos || cliente.Apellidos}</td>
                  <td>{cliente.telefono || cliente.Telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;