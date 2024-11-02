﻿using Repositories.Objects;
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
            List<BookingDetail?> list = await _unitOfWork.BookingDetailRepository.GetByBookingID(id);
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
            List<BookingDetail?> list = await _unitOfWork.BookingDetailRepository.GetByServiceID(id);
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
            if (info.PoolStatusDescription != "" && bd.PoolStatusDescription != info.PoolStatusDescription)
                bd.PoolStatusDescription = info.PoolStatusDescription;
            if (info.AnimalStatusDescription != "" && bd.AnimalStatusDescription != info.AnimalStatusDescription)
                bd.AnimalStatusDescription = info.AnimalStatusDescription;
            if (info.ConsultDoctor != "" && bd.ConsultDoctor != info.ConsultDoctor)
                bd.ConsultDoctor = info.ConsultDoctor;
            if (info.DrugList != "" && bd.DrugList != info.DrugList)
                bd.DrugList = info.DrugList;
            if (info.MaterialList != "" && bd.MaterialList != info.MaterialList)
                bd.MaterialList = info.MaterialList;
            if (info.ConsultTechnician != "" && bd.ConsultTechnician != info.ConsultTechnician)
                bd.ConsultTechnician = info.ConsultTechnician;
            if (info.Incidental != info.Incidental)
                bd.Incidental = info.Incidental;
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
            if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(info.BookingDetailID) != null)
                return NotFound("Booking Detail is existed!");
            if (await _unitOfWork.BookingRepository.GetByIdAsync(info.BookingID) == null)
                return NotFound("BookingID not found!");
            if (await _unitOfWork.ServiceRepository.GetByIdAsync(info.ServiceID) == null)
                return NotFound("ServiceID not found!");
            if (await _unitOfWork.BookingDetailRepository.AddBookingDetailAsync(info) == 0)
                return BadRequest("Added fail!");
            else return Ok($"Added {info.BookingDetailID} successfully");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPost("addExaminationResult")]
    public async Task<ActionResult<ExaminationResult>> AddExaminationResult( ExaminationResult exam )
    {
        try
        {
            bool allSameBookingId = exam.BookingDetail.All(x => x.BookingID == exam.BookingDetail[0].BookingID);
            if (allSameBookingId != true)
                return BadRequest("Booking ID is inconsistent!!");
            foreach (var item in exam.BookingDetail)
            {
                if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(item.BookingDetailID) != null)
                    return BadRequest("Booking Detail is already existed!");
                if (await _unitOfWork.BookingRepository.GetByIdAsync(item.BookingID) == null)
                    return BadRequest("Booking not found!");
                Service s;
                if ((s = await _unitOfWork.ServiceRepository.GetByIdAsync(item.ServiceID)) == null)
                    return BadRequest("Service not found!");
                item.UnitPrice = s.Price;
            }

            foreach (var item in exam.AnimalProfile)
            {
                if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(item.AnimalProfileID) != null)
                    return BadRequest("Animal profile is already existed!");
                if (await _unitOfWork.AnimalTypeRepository.GetByIdAsync(item.TypeID) == null)
                    return BadRequest("Animal type not found!");
            }
            
            foreach (var item in exam.PoolProfile)
            {
                if (await _unitOfWork.BookingDetailRepository.GetByIdAsync(item.PoolProfileID) != null)
                    return BadRequest("Pool profile is already existed!");
            }

            if (await _unitOfWork.BookingDetailRepository.AddExaminationResultAsync(exam) == 1)
                return Ok("Added successfully!");
            else return BadRequest("Added failed!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}

