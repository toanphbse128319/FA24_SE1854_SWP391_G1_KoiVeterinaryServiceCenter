using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Model
{
    [Table("ServiceUse")]
    public class ServiceUse
    {
        public string ServiceUseID { get; set; }
        public string? AnimalProfileID { get; set; }
        public string? PoolProfileID { get; set; }
        public string? BookingDetailID { get; set; }
    }
}
