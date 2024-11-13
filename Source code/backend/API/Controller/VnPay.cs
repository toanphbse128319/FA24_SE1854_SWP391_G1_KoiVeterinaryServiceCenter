#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Helper.VNPay;
using Repositories.Model;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class VnPayController : ControllerBase {

    private UnitOfWork _unitOfWork;

    public VnPayController(UnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("all/{id}")]
    //[Authorize(Policy = "customer_policy")]
    public async Task<ActionResult> GetFullPaymentLink(string id){
        try{
            VnPay service = new VnPay(null);
            //Response.Redirect(service.PayUrl(10000, id, "127.0.0.1", "vn", "Testing first transaction"));
            Booking info = await _unitOfWork.BookingRepository.GetByIdAsync(id);
            if( info == null )
                return Ok("Cannot find any booking information with that ID");
            else if( info.PaymentStatus == "Paid" )
                return Ok("The order has been paid");
            else if( info.PaymentStatus == "Refunded" )
                return Ok("The order has been refunded");
            info.TotalServiceCost = await _unitOfWork.BookingRepository.GetTotalPriceAsync( info.BookingID );
            Decimal price = info.TotalServiceCost;
            if( price == 0 )
                return StatusCode( StatusCodes.Status422UnprocessableEntity, "Unable to get pricing");
            return StatusCode(StatusCodes.Status200OK, service.PayUrl(price, info.BookingID + "F", Request.Host.ToString() , "vn", $"Thanh toán chi phí cho hóa đơn {info.BookingID} với giá {info.TotalServiceCost}"));
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet("booked/{id}")]
    //[Authorize(Policy = "customer_policy")]
    public async Task<ActionResult> GetDepositPaymentLink(string id){
        try{
            VnPay service = new VnPay(null);
            //Response.Redirect(service.PayUrl(10000, id, "127.0.0.1", "vn", "Testing first transaction"));
            Booking info = await _unitOfWork.BookingRepository.GetByIdAsync(id);
            if( info == null )
                return Ok("Cannot find any booking information with that ID");
            else if( info.PaymentStatus == "Paid" )
                return Ok("The order has been paid");
            else if( info.PaymentStatus == "Refunded" )
                return Ok("The order has been refunded");
            string result = await _unitOfWork.BookingRepository.CheckExpiration(id);
            if( result == "Cannot find booking order" )
                return StatusCode(StatusCodes.Status409Conflict, result);
            else if ( result == "Payment expired" )
                return StatusCode(StatusCodes.Status406NotAcceptable, result);
            Decimal price = info.TotalServiceCost * 30 / 100;
            if( price == 0 )
                return StatusCode( StatusCodes.Status422UnprocessableEntity, "Unable to get pricing");
            return StatusCode(StatusCodes.Status200OK, service.PayUrl(price, info.BookingID + "D", Request.Host.ToString() , "vn", $"Thanh toán chi phí đặt trước hóa đơn {info.BookingID} với giá {info.TotalServiceCost}"));
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [Route("result")]
    [HttpGet]
    public async Task<ActionResult> getVnpayResult()
    {
        try{
            VnPay service = new VnPay(null);
            PaymentResult result = service.CheckResult(Request.Query.ToList());
            if (result.Result == "Giao dịch được thực hiện thành công. Cảm ơn quý khách đã sử dụng dịch vụ")
            {
                char type = result.OrderID[ result.OrderID.Length - 1];
                Booking info = await _unitOfWork.BookingRepository.GetByIdAsync(result.OrderID.Substring(0, result.OrderID.Length - 1));
                if( info == null )
                    BadRequest("Invalid: failed to find booking info");
                Console.WriteLine(result.OrderID.Substring(0, result.OrderID.Length - 1));
                if( type == 'D' ){
                    info.PaymentStatus = "Confirmed";
                    info.Status = "Confirmed";
                } else if ( type == 'F' ){
                    info.PaymentStatus = "Completed";
                    info.Status = "Completed";
                }
                info.PaymentMethod = result.CardType;
                await _unitOfWork.BookingRepository.UpdateAsync(info);
            }
            return Ok(result);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

}
