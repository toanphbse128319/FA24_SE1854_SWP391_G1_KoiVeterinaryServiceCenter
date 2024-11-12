#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
using Repositories.Objects;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ServiceUse : ControllerBase
{

    private UnitOfWork _unitOfWork;
    public ServiceUse(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("all")]
    public async Task<ActionResult<List<ServiceUse>>> GetAll()
    {
        try
        {
            return Ok(await _unitOfWork.ServiceUseRepository.GetAllAsync());
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPost("LogBooked")]
    public async Task<ActionResult<Profiles>> AddProfiles(Profiles profile)
    {
        _unitOfWork.BeginTransactionAsync();
        string result = "";
        try
        {
            BookingDetail bd = await _unitOfWork.BookingDetailRepository.GetByIdAsync(profile.BookingDetail.BookingDetailID);
            if (bd == null){
                result = "BookingDetail does not existed!";
                return NotFound();
            }
            if ( string.IsNullOrEmpty(profile.BookingDetail.ExaminationResult) == false )
                bd.ExaminationResult = profile.BookingDetail.ExaminationResult;
            if (string.IsNullOrEmpty(profile.BookingDetail.VetConsult) == false )
                bd.VetConsult = profile.BookingDetail.VetConsult;
            if (string.IsNullOrEmpty(profile.BookingDetail.Formulary) == false )
                bd.Formulary = profile.BookingDetail.Formulary;
            if (profile.BookingDetail.IsIncidental != bd.IsIncidental)
               bd.IsIncidental = profile.BookingDetail.IsIncidental;
            if (string.IsNullOrEmpty(profile.BookingDetail.NoteResult) == false )
                bd.NoteResult = profile.BookingDetail.NoteResult;

            result = await _unitOfWork.ServiceUseRepository.LogBooked( profile );
            if ( result.ToLower().Contains("success") && 
                    await _unitOfWork.BookingDetailRepository.UpdateAsync(bd) != 0){
                _unitOfWork.CommitTransactionAsync();
                return Ok(result);
            } else {
                return BadRequest(result);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        } finally{
            if(result.ToLower().Contains("success") == false )
                _unitOfWork.RollbackTransactionAsync();
        }
    }

    [HttpPost("addExaminationResult")]
    public async Task<ActionResult<ExaminationResult>> AddExaminationResult( ExaminationResult exam )
    {
        _unitOfWork.BeginTransactionAsync();
        string result = "";
        try
        {
            result = await _unitOfWork.ServiceUseRepository.LogIncidental(exam);
            if ( result.ToLower().Contains("invalid") ){
                _unitOfWork.RollbackTransactionAsync();
                return BadRequest( result );
            }
            _unitOfWork.CommitTransactionAsync();
            return Ok("Added successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

