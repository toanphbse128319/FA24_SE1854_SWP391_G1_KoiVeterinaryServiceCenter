### **Có lỗi gì xảy ra khi làm các thao tác này thì hãy liên lạc với team, đừng im lặng mà tự gồng gánh**

# Cách đặt tên
- Đặt tên model theo tên table, với các trường tương tự 
- Đặt tên Repository theo cú pháp ```<Tên Model>Repository```
- Đặt tên Controller theo cú pháp ```<Tên Model>Controller```, trong controller bao gồm các action, không để tên là ```<action> + Controller```

# LƯU Ý:
- Cách cấu trúc lại cú pháp dấu câu: ```ctrl + k + d```
- Kiểm tra branch bằng lệnh ```git status``` trước khi push, tránh push nhầm vào branch Dev, master
- Nên add và push file cụ thể, vd như ```git add <tên file>``` thay vì ```git add .``` để tránh conflict
- Các thông tin về lỗi sẽ nằm trong channel #review-bug, lỗi nằm trong branch nào thì người phụ trách branch sửa lại xong commit, người không làm branch đó thì không commit để tránh xung đột. Trường hợp gấp có thể nhờ Toàn
- Với các func có sử dụng trường id, nên sử dụng ```_id.ToLower() == id``` thay vì ```_id.Equals(id)```, vì trong trường id hạn chế phân biệt hoa thường, nên khi truy xuất ta không cần phải quan tâm
- KHÔNG TỰ Ý MERGE, NẾU CÓ NHU CẦU MERGE CẦN PHẢI ĐỢI LONG VÀ TOÀN REVIEW ĐỂ TRÁNH CONFLICT

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

# Cách dùng Bearer authentication để giới hạn theo role

<details>
<summary> thêm trong appsetting.js </summary>

```
  "Jwt": {
    "Issuer": "FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter",
    "Audience": "FA24_SE1854_SWP391_G1_KoiVeterinaryServiceCenter",
    "Key": "There is no secret key here, find somewhere else!"
  }
```
</details>

<details>
<summary> thêm giới hạn role vào 1 API endpoint </summary>

<br>
( Code chỉ mang tính chất minh họa )

```
        [HttpGet("{id}")] // Method của API
        [Authorize(Policy = "customer_policy")] // policy để giới hạn role try cập 
        public async Task<ActionResult<Service>> GetServiceByID(string id){ // API endpoint
```

<br>

* Giới hạn của role tạm thời sẽ là 

    Manager > Staff > Vet > Customer ( Guest thì đừng thêm policy là được )

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
