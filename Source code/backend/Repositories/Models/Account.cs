using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Models;

// Tên table từ dababase ghi ở đây
[Table("Account")]
public class Account
{

    public string AccountID { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string RoleID { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public bool IsActive { get; set; }

}

