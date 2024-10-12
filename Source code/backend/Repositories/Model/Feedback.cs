#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories.Model
{
    [Table("Feedback")]
    public class Feedback
    {
        public string FeedbackID { get; set; }
        public int ServiceRating { get; set; }
        public int VetRating { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }

    }
}
