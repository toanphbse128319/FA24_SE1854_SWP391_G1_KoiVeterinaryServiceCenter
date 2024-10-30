using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;


namespace Repositories.Model
{
    [Table("FAQ")]
    public class ServiceUse
    {
        public string AnimalProfileID { get; set; }
        public string PoolProfileID { get; set; }
        public string BookingDetailID { get; set; }
    }
}
