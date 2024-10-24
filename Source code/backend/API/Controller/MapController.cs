#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Helper.Map;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MapController : ControllerBase {

    private UnitOfWork _unitOfWork;

    public MapController(UnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("geoLocation")]
    //[Authorize(Policy = "customer_policy")]
    public async Task<ActionResult> GetUrlGeoLocation(string address){
        try{
            Map map = new Map();
            string result =  map.getUrlGetLocation("Tp, Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, Hồ Chí Minh 71200, Vietnam");
            //result = await map.GetCoordinate( result );
            return Ok( result );
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

}
