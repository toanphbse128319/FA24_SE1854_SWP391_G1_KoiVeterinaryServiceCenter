### **Có lỗi gì xảy ra khi làm các thao tác này thì hãy liên lạc với team, đừng im lặng mà tự gồng gánh**

# Cách thêm model, DbSet, Repository, ... 
(Code chỉ mang tính chất minh họa)

<details>
<summary> Thêm model vào project </summary>
<br>

- Thêm ở backend/Repositories/Model/ với tên file là [tên table].cs
và thêm các trường này vào trước khi viết class model

```   
#nullable disable
using System.ComponentModel.DataAnnotations.Schema;
namespace Repositories.Model;

// Tên table từ dababase ghi ở đây
[Table("[tên table]")]
```
</details>

<details>
<summary> Thêm repository của model vào backend </summary>
<br>

- Vào backend/Repositories/Context.cs, thêm dòng:

```public virtual DbSet<[tên bảng]> [tên bảng theo số nhiều] { get; set; }```

- Vào backend/Repositories/Repository, thêm file tên [tên table] + "Repository.cs" 

```
using Repositories;
using Repositories.Repository;

public class ServiceRepository : GenericRepository<Service> {

    public ServiceRepository( Context context )
        : base( context ){
    }

}
```
*Các chức năng lên quan tới logic, business, DAO các kiểu thì có thể viết ở đây.

- Vào backend/Repositories/UnitOfWork.cs, thêm repository với viết vào 

```
    private ServiceRepository _serviceRepository;  

    ...

    public ServiceRepository ServiceRepository {
        get { return _serviceRepository ??= new ServiceRepository(_context); }
    }
```

</details>



# Cách bật trang web swagger ui
- Mở cmd lên, cd vào API, chạy command: 
  
`` dotnet run ``

- Truy cập swagger UI ( Nhớ đổi port ) trên browswer

``http://localhost:5145/swagger/index.html``

# Cách dùng docker để chạy sqlserver 
- Cài docker
- Mở cmd, cd vào folder chứa file docker-compose.yml

`` docker compose build ``

`` docker compose up ``

** Ko ctrl+c, ko đóng cmd, port docker sqlserver dùng là 1433:1433. (Port hose: port docker)
