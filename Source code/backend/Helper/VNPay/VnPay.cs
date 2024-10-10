#nullable disable 

namespace Helper.VNPay;

public class VnPay{
    private string _vnpUrl;
    private string _tmnCode;
    private string _hashSecret;
    private string _vnpVersion;
    private string _bankCode;
    private string _returnURL;

    public VnPay(string bankCode){
        var config = Configuration.GetConfiguration();
        _vnpUrl = config["vnp_Url"];
        _tmnCode = config["vnp_TmnCode"];
        _hashSecret = config["vnp_HashSecret"];
        _vnpVersion = config["vnp_Version"];
        if( bankCode == null )
            _bankCode = "VNPAYQR";
        else
            _bankCode = bankCode;
        _returnURL = config["vnp_returnUrl"];
    }

    public string PayUrl(int amount, string orderID,  string customerAddress, string locale, string transferInfo){
        VnPayLibrary vnpay = new VnPayLibrary();
        vnpay.AddRequestData("vnp_Version", _vnpVersion);
        vnpay.AddRequestData("vnp_Command", "pay");
        vnpay.AddRequestData("vnp_TmnCode", _tmnCode);
        vnpay.AddRequestData("vnp_Amount", (amount * 100).ToString());
        vnpay.AddRequestData("vnp_BankCode", _bankCode);
        vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
        vnpay.AddRequestData("vnp_CurrCode", "VND");
        vnpay.AddRequestData("vnp_IpAddr", customerAddress);
        if( locale == null )
            locale = "vn";
        vnpay.AddRequestData("vnp_Locale", locale);
        vnpay.AddRequestData("vnp_OrderInfo", transferInfo);
        vnpay.AddRequestData("vnp_OrderType", "270001");
        vnpay.AddRequestData("vnp_ReturnUrl", _returnURL);
        vnpay.AddRequestData("vnp_ExpireDate", DateTime.Now.AddMinutes(15).ToString("yyyyMMddHHmmss"));
        vnpay.AddRequestData("vnp_TxnRef", orderID);
        vnpay.AddRequestData("vnp_SecureHash", _hashSecret);
        return  vnpay.CreateRequestUrl(_vnpUrl, _hashSecret);


        
    }
}
