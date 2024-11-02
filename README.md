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

# Cách dùng postman để viết test manual

1. Tạo folder tương ứng với tên model bằng cách bấm dấu "+" và chọn "Blank Collection".
   
   ![image](https://github.com/user-attachments/assets/bce0a251-c48f-455e-a183-27e2db732d86)

2. Tạo folder con tương ứng với 1 endpoint = cách nhấn nút "。。。" của folder model / hoặc chuột phải vào, chọn add folder.

    ![image](https://github.com/user-attachments/assets/a06bca7b-7fd3-48b3-aa39-c00448eaaf20)

3. Tạo request tương tự như tạo folder, bấm "Create request" thay vì "Create folder".

Ví dụ mẫu thì có thể kham khải ở Booking/New Booking/"Booking at slot 1" trong postman.

** Nhớ ctrl+s mỗi lần thay đổi, không thì duplicate hoặc tắt mở lại thì postman sẽ quay về bản save gần nhất.

** Cài thêm postman agent để postman nhận được link localhost .

Nếu như không có workspace như ở dưới thì check lại mail postman hoặc yêu cầu Toàn để đc nhận mail mời vào workspace

 ![image](https://github.com/user-attachments/assets/3c7f02d2-a509-4bb5-8b99-9e1996c78537)

   
