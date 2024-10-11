using Microsoft.AspNetCore.Mvc;
using Repositories;

namespace API.Controllers;
[Route("api/[controller]")]
[ApiController]

public class ScheduleController : ControllerBase
{
    private UnitOfWork _unitOfWork;

    [HttpPost]
    public 
}