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
[Table("Account")]
public class Account
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

- Truy cập swagger UI ( Nhớ đổi sang port được ghi sau khi dotnet run chạy xong ) trên browswer

``http://localhost:5145/swagger/index.html``

# Cách dùng docker để chạy sqlserver 
- Cài docker
- Mở cmd, cd vào folder chứa file docker-compose.yml

`` docker compose build ``

`` docker compose up ``

** Ko ctrl+c, ko đóng cmd, port docker sqlserver dùng là 1433:1433. (Port hose: port docker)

# Cách để nhận mail

<details>
    <summary> Paste thông tin này vào appsetting.json </summary>
    
```
    "Mail": {
        "Server": "smtp.gmail.com",
        "Port": 587,
        "Email": "testingthingsse1854@gmail.com",
        "Password": "vhxrqjbyudfriseo"
    }
```
** Tạm thời chỉ có đăng kí là gửi mail

</details>

<details>
    <summary> Thay email cho project </summary>
    
    - Tạo gmail mới
    - Vào myaccount của google
    - Bật xác thực 2 bước
    - Vào App password tạo mới
    - Paste email và pass mới tạo vào appsetting.json
</details>

# Cách dùng vnpay để thanh toán
** Chỉ áp dụng với các booking với status là "Pending", và vnpay chưa ghi nhận bookingID đó (vnpay sẽ reset giao dịch vào ngày hôm sau)
** Nếu có lỗi thì liên lạc với Toàn ngay lập tức.

<details>
<summary> Thêm thông tin này vào appsetting.json </summary>

```
      "Vnpay": {
        "vnp_TmnCode": "2WZZSYHY",
        "vnp_HashSecret": "69XJEIF1IFVQHLITS0OEKS6ABL4GNSVC",
        "vnp_Url": "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
        "vnp_Version": "2.1.0",
        "vnp_returnUrl": "http://localhost:5145/api/VnPay/result"
      }
```

</details>

- Api sẽ trả về link dẫn ra trang thanh toán, dán link đó vô thanh url và truy cập.

<details>
<summary> Thông tin thẻ dùng để thanh toán </summary>

```
Ngân hàng: NCB
Số thẻ: 9704198526191432198
Tên chủ thẻ: NGUYEN VAN A
Ngày phát hành: 07/15
Mật khẩu OTP: 123456
```
<details>
<summary> Link kham khảo thêm thẻ test </summary>
    https://sandbox.vnpayment.vn/apis/vnpay-demo/
</details>
    
</details>
