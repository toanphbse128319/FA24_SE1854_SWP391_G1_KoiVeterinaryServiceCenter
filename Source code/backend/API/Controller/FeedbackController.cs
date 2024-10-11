#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Repositories.Model;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FeedbackController : ControllerBase
{
    private UnitOfWork _unitOfWork;
    public FeedbackController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Feedback>>> GetAll()
    {
        return await _unitOfWork.FeedbackRepository.GetAllAsync();

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Feedback>> GetFeedbackByID(string id)
    {
        return await _unitOfWork.FeedbackRepository.GetByIdAsync(id);
    }

    [HttpPut]
    public ActionResult<Feedback> SaveFeedback(Feedback feedback)
    {
        try {
            feedback.FeedbackID = null;
            _unitOfWork.FeedbackRepository.SaveFeedBack(feedback);
            return  Ok("them feedback thanh cong");
        }
        catch(Exception ex)
        {   Console.WriteLine(ex.ToString());
            return StatusCode (StatusCodes.Status500InternalServerError,ex.Message);
        }

    }
}
