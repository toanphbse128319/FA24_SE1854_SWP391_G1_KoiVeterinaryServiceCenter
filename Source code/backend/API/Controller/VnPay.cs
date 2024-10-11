#nullable disable
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Repositories;
using Helper.VNPay;
using System.Web;
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
        public ActionResult  GetServiceByID(string id){
            VnPay service = new VnPay(null);
//            Response.Redirect(service.PayUrl(10000, id, "127.0.0.1", "vn", "Testing first transaction"));
            service.PrintVariable();
            return StatusCode(StatusCodes.Status200OK, service.PayUrl(10000, id, Request.Host.ToString() , "vn", "Testing first transaction"));
        }
    }
}
