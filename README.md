### **Có lỗi gì xảy ra khi làm các thao tác này thì hãy liên lạc với team, đừng im lặng mà tự gồng gánh**

# Cách tạo scaffold của controller
- Viết Model trong Repositories -> Model (Database đặt tên trường như thế nào thì ghi lại tên giống vậy)
```
using System.ComponentModel.DataAnnotations.Schema;
namespace KVCS.Model;

// Tên table từ dababase ghi ở đây
[Table("Account")]
public class Account{

    public string AccountID { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string RoleID { get; set; }
    public string Avatar { get; set; }
    public string Password { get; set; }
    public string Status { get; set; }
    public bool IsActive { get; set; }

}


```
- VIết model context trong Repositories -> Context ( tên model + "Context, như ví dụ bên dưới )
```
using Microsoft.EntityFrameworkCore;
using KVCS.Model;

namespace KVCS.Context;

public class AccountContext : DbContext
{
    public AccountContext(DbContextOptions<AccountContext> options)
        : base(options)
    {
    }

    public DbSet<Account> Accounts { get; set; }
}
```
- Thêm Context với viết vào bộ Dependency Injection (DI) ở API/Program.cs ( Nhớ đổi theo cái mình đang làm )

`` builder.Services.AddDbContext<CustomerContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("kvcs"))); ``

- Mở cmd lên, cd vào API
- Chỉnh lệnh và chạy ( Nhớ đổi tên model và model context ) 

``dotnet aspnet-codegenerator controller -name AccountInfoController -async -api -m KVCS.Model.Account -dc KVCS.Context.AccountContext -outDir Controllers --databaseProvider sqlserver -f``

# Cách bật trang web swagger ui
- Mở cmd lên, cd vào API, chạy command: 
  
`` dotnet run ``

- Truy cập swagger UI ( Nhớ đổi port ) trên browswer

``http://localhost:5145/swagger/index.html``

