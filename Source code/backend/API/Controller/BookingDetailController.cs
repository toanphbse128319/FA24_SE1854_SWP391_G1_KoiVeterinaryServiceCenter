using Repositories.Objects;
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingDetailController : ControllerBase {

    private UnitOfWork _unitOfWork;
    public BookingDetailController(UnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("ByBookingDetailID")]
    public async Task<ActionResult<BookingDetail>> GetBookingDetailByID(string id) {
        try{
            BookingDetail bd = await _unitOfWork.BookingDetailRepository.GetByIdAsync(id);
            if (bd != null)
                return bd;
            else
                return NotFound("Booking Detail does not existed!");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet("ByBookingID")]
    public async Task<ActionResult<IEnumerable<BookingDetail?>>> GetBookingDetailsByBookingID(string id) {
        try{
            List<BookingDetail> list = await _unitOfWork.BookingDetailRepository.GetByBookingID(id);
            if (list.Count == 0)
                return NotFound("Booking Detail not found!");
            else return Ok(list);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet("ByServiceID")]
    public async Task<ActionResult<IEnumerable<BookingDetail?>>> GetBookingDetailsByServiceID(string id) {
        try{
            List<BookingDetail> list = await _unitOfWork.BookingDetailRepository.GetByServiceID(id);
            if (list.Count == 0)
                return NotFound("Booking Detail not found!");
            else return Ok(list);
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPut("update")]
    public async Task<ActionResult<BookingDetail?>> UpdateBookingDetail(BookingDetail info) {
        try{
            BookingDetail bd = await _unitOfWork.BookingDetailRepository.GetByIdAsync(info.BookingDetailID);
            if (bd == null)
                return NotFound("BookingDetail does not existed!");
            if (info.ExaminationResult != "" && bd.ExaminationResult != info.ExaminationResult)
                bd.ExaminationResult = info.ExaminationResult;
            if (info.VetConsult != "" && bd.VetConsult != info.VetConsult)
                bd.VetConsult = info.VetConsult;
            if (info.Formulary != "" && bd.Formulary != info.Formulary)
                bd.Formulary = info.Formulary;
            if (info.IsIncidental != info.IsIncidental)
                bd.IsIncidental = info.IsIncidental;
            if (info.NoteResult != "" && bd.NoteResult != info.NoteResult)
                bd.NoteResult = info.NoteResult;
            if (await _unitOfWork.BookingDetailRepository.UpdateAsync(bd) == 0)
                return BadRequest("BookingDetail has not been updated!");
            else
                return Ok("Changes have been saved");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet("getbyprofile")]
    public async Task<ActionResult<List<BookingDetail>>> GetByProfile(string id) {
        try{
            List<BookingDetail> list = await _unitOfWork.BookingDetailRepository.GetByProfileIDAsync(id);
            if (list.Count == 0)
                return NotFound("Cannot find booking detail associate with that profile");
            return list;
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPost("add")]
    public async Task<ActionResult<BookingDetail?>> AddBookingDetail(BookingDetail info) {
        try{
            string result = await _unitOfWork.BookingDetailRepository.AddBookingDetailAsync(info);
            if ( result.ToLower().Contains("invalid") )
                return BadRequest( result );
            else return Ok($"Added {result} successfully");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

}

