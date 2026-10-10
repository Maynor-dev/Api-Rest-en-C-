using mi_primer_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace mi_primer_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientesController : Controller
    {
        private readonly DbEmpresaContext _context;
        public ClientesController(DbEmpresaContext ctx)
        {
            _context = ctx;
        }

        [HttpGet("ListarUsuarios")]
        public ActionResult<List<Cliente>> ListarClientes()
        {
            return _context.Clientes.ToList();
        }
        [HttpGet("ObtenerCliente/{id}")]
        public ActionResult<Cliente> ObtenerCliente(int id)
        {
            return _context.Clientes.FirstOrDefault(c => c.IdCliente == id);
        }
        [HttpPost("CrearCliente")]
        public IActionResult CrearCliente([FromBody] Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
            return Ok(cliente);
        }
        [HttpPut("ActualizarCliente/{id}")]
        public IActionResult ActualizarCliente(int id, [FromBody] Cliente clienteModificado)
        {
            var clienteExistente = _context.Clientes.Find(id);
         
            clienteExistente.Nombre = clienteModificado.Nombre;
            clienteExistente.Apellidos = clienteModificado.Apellidos;
            clienteExistente.Telefono = clienteModificado.Telefono;

            _context.SaveChanges();
            return Ok(clienteExistente);
        }

    }
}
