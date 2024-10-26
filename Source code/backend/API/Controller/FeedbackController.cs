#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Repositories.Model;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FeedbackController : ControllerBase {

    private UnitOfWork _unitOfWork;
    public FeedbackController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Feedback>>> GetAll() {
        try{
            return await _unitOfWork.FeedbackRepository.GetAllAsync();
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Feedback>> GetFeedbackByID(string id) {
        try{
            return await _unitOfWork.FeedbackRepository.GetByIdAsync(id);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPut]
    public ActionResult<Feedback> SaveFeedback(Feedback feedback) {
        try {
            feedback.FeedbackID = null;
            _unitOfWork.FeedbackRepository.SaveFeedBack(feedback);
            return Ok("them feedback thanh cong");
        } catch (Exception ex) {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}
