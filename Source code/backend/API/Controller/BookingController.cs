#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
using Helper;
using Helper.Objects;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookingController : ControllerBase {

    private UnitOfWork _unitOfWork;
    public BookingController(UnitOfWork unitOfWork) {
        _unitOfWork = unitOfWork;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Booking>> GetBookingByID(string id) {
        try{
            Booking booking = await _unitOfWork.BookingRepository.GetByIdAsync(id);
            if( booking == null )
                return StatusCode( StatusCodes.Status404NotFound, "Unable to find the booking order" );
            return Ok( booking );
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpPut("updatestatus")]
    public async Task<ActionResult<Booking>> UpdateStatusAsync(UpdateStatusInformation info) {
        try{
            if (await _unitOfWork.BookingRepository.GetByIdAsync(info.Id) == null)
                return NotFound("The Booking does not existed!");
            int updated = await _unitOfWork.BookingRepository.UpdateStatusAsync(info.Id, info.Message);
            if (updated == 0)
                return BadRequest("Booking status update failed!");
            else
                return Ok($"The Booking Status has been updated to: {info.Message}");
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [HttpGet]
    public async Task<ActionResult<I﻿Enumerable<Booking>>> GetVetBookings(string id) {
        try{
            if (await _unitOfWork.EmployeeRepository.GetByIdAsync(id) == null)
                return BadRequest("EmployeeID is not existed!");
            List<Booking> list = await _unitOfWork.BookingRepository.GetVetBookingsAsync(id);
            if (list.Count == 0)
                return NotFound("Vet schedule is empty!");
            return list;
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }

    [Route("add")]
    [HttpPost]
    public async Task<ActionResult<string>> AddBooking(NewBookingInformation info){
        try{
            string result = await _unitOfWork.BookingRepository.AddNewBooking(info);
            if( result.Contains("cannot be") )
                return StatusCode(StatusCodes.Status400BadRequest, result);
            switch (result){
                case "Cannot place an booking order with that date":
                case "Cannot detemined the delivery method of the service":
                case "Outside working hour":
                case "Cannot get the schedule":           
                case "Cannot place order on this slot":
                case "Cannot update slot status":
                    return StatusCode(StatusCodes.Status406NotAcceptable, result);
                case "Customer does not exist":
                case "Employee does not exist":
                    return StatusCode(StatusCodes.Status404NotFound, result);
                case "Unable to create new booking order":
                case "Unable to update vet schedule":
                case "Unable to create booking detail":
                    return StatusCode(StatusCodes.Status408RequestTimeout, result);
                default:
                    return Ok(result);
            }
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }
}
