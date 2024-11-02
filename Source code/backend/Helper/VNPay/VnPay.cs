#nullable disable 
using Microsoft.Extensions.Primitives;

namespace Helper.VNPay;
public class VnPay
{
    private string _vnpUrl;
    private string _tmnCode;
    private string _hashSecret;
    private string _vnpVersion;
    private string _bankCode;
    private string _returnURL;

    public VnPay(string bankCode)
    {
        var config = Configuration.GetConfiguration();
        _vnpUrl = config["VnPay:vnp_Url"];
        _tmnCode = config["VnPay:vnp_TmnCode"];
        _hashSecret = config["VnPay:vnp_HashSecret"];
        _vnpVersion = config["VnPay:vnp_Version"];
        _returnURL = config["VnPay:vnp_returnUrl"];
        if( _vnpUrl == null || _tmnCode == null || 
            _hashSecret == null || _vnpVersion == null ||
            _returnURL == null )
            throw new Exception("Missing configuration from appsetting.json");
        if (bankCode == null)
            _bankCode = "VNBANK";
        else
            _bankCode = bankCode;
    }

    public string PayUrl(Decimal amount, string orderID, string customerAddress, string locale, string transferInfo)
    {
        VnPayLibrary vnpay = new VnPayLibrary();
        vnpay.AddRequestData("vnp_Version", _vnpVersion);
        vnpay.AddRequestData("vnp_Command", "pay");
        vnpay.AddRequestData("vnp_TmnCode", _tmnCode);
        vnpay.AddRequestData("vnp_Amount", ((Decimal.ToInt64(amount)) * 100).ToString());
        vnpay.AddRequestData("vnp_BankCode", _bankCode);
        vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
        vnpay.AddRequestData("vnp_CurrCode", "VND");
        vnpay.AddRequestData("vnp_IpAddr", customerAddress);
        if (locale == null)
            locale = "vn";
        vnpay.AddRequestData("vnp_Locale", locale);
        vnpay.AddRequestData("vnp_OrderInfo", transferInfo);
        vnpay.AddRequestData("vnp_OrderType", "270001");
        vnpay.AddRequestData("vnp_ReturnUrl", _returnURL);
        vnpay.AddRequestData("vnp_ExpireDate", DateTime.Now.AddMinutes(15).ToString("yyyyMMddHHmmss"));
        vnpay.AddRequestData("vnp_TxnRef", orderID);
        return vnpay.CreateRequestUrl(_vnpUrl, _hashSecret);
    }

    public PaymentResult CheckResult(List<KeyValuePair<string, StringValues>> query)
    {
        VnPayLibrary vnpay = new VnPayLibrary();
        foreach (KeyValuePair<string, StringValues> sub in query)
            vnpay.AddResponseData(sub.Key, sub.Value);

        PaymentResult result = new PaymentResult();

        result.OrderID = Convert.ToString(vnpay.GetResponseData("vnp_TxnRef"));
        result.TransactionNo = Convert.ToString(vnpay.GetResponseData("vnp_TransactionNo"));
        result.BankCode = vnpay.GetResponseData("vnp_BankCode");
        result.TransactionNo = vnpay.GetResponseData("vnp_TransactionNo");
        result.CardType = vnpay.GetResponseData("vnp_CardType");
        result.PayTime = DateTime.ParseExact(vnpay.GetResponseData("vnp_PayDate"), "yyyyMMddHHmmss", System.Globalization.CultureInfo.InvariantCulture);
        result.VnpayNo = vnpay.GetResponseData("vnp_TransactionNo");
        result.OrderInfo = vnpay.GetResponseData("vnp_OrderInfo");
        result.Amount = Convert.ToInt64(vnpay.GetResponseData("vnp_Amount")) / 100;

        string vnp_ResponseCode = vnpay.GetResponseData("vnp_ResponseCode");
        string vnp_TransactionStatus = vnpay.GetResponseData("vnp_TransactionStatus");
        String vnp_SecureHash = vnpay.GetResponseData("vnp_SecureHash");
        String TerminalID = vnpay.GetResponseData("vnp_TmnCode");
        String bankCode = vnpay.GetResponseData("vnp_BankCode");

        bool validateSignature = vnpay.ValidateSignature(vnp_SecureHash, _hashSecret);
        if (validateSignature == false)
            result.Result = "Có lỗi xảy ra trong quá trình xử lý";
        else if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00")
            result.Result = "Giao dịch được thực hiện thành công. Cảm ơn quý khách đã sử dụng dịch vụ";
        else result.Result = $"Có lỗi xảy ra trong quá trình xử lý. Mã lỗi: {vnp_ResponseCode}";
        return result;
    }

}
