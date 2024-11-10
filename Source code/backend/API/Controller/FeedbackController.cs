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
    public async Task<ActionResult<Feedback>>  AddFeedback(Feedback feedback,String bookingID) 
    {
        try {
            feedback.FeedbackID = null;
        Booking booking = await _unitOfWork.FeedbackRepository.AddFeedBack(feedback, bookingID);
            return Ok(booking);
        } catch (Exception ex) {
            Console.WriteLine( ex );
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}
