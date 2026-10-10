using System;
using System.Collections.Generic;

namespace mi_primer_api.Models;

public partial class Empleado
{
    public int IdEmpleado { get; set; }

    public int IdPuesto { get; set; }

    public string? Nombre { get; set; }

    public string? Apellido { get; set; }

    public virtual Puesto IdPuestoNavigation { get; set; } = null!;
}
