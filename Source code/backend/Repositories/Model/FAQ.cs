#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

// Tên table từ dababase ghi ở đây
[Table("FAQ")]
public class FAQ
{

    public string FaqID { get; set; }
    public string Question { get; set; }
    public string Asnwer { get; set; }

}

