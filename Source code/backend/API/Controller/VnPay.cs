#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Helper.VNPay;
using Repositories.Model;
namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class VnPayController : ControllerBase
    {

        private UnitOfWork _unitOfWork;

        public VnPayController(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{id}")]
        //[Authorize(Policy = "customer_policy")]
            public async Task<ActionResult> GetServiceByID(string id){
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

                    return StatusCode(StatusCodes.Status200OK, service.PayUrl(info.TotalServiceCost, info.BookingID, Request.Host.ToString() , "vn", $"Thanh toán chi phí cho hóa đơn {info.BookingID} với giá {info.TotalServiceCost}"));
                } catch ( Exception ex ){
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
        }

        [Route("result")]
        [HttpGet]
        public async Task<ActionResult> getVnpayResult(){
            try{
                VnPay service = new VnPay(null);
                PaymentResult result = service.CheckResult(Request.Query.ToList());
                if( result.Result == "Giao dịch được thực hiện thành công. Cảm ơn quý khách đã sử dụng dịch vụ" ){
                    Booking info = await _unitOfWork.BookingRepository.GetByIdAsync(result.OrderID);
                    info.PaymentStatus = "Paid";
                    info.PaymentMethod = result.CardType;
                    await _unitOfWork.BookingRepository.UpdateAsync(info);
                }
                return Ok(result);
            } catch (Exception ex){
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
