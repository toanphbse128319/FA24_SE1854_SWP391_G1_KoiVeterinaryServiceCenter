#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
using System.Text.RegularExpressions;
using Helper;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomerController : ControllerBase {

    private UnitOfWork _unitOfWork;

    public CustomerController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Customer>>> GetAll()
    {
        try{
            return await _unitOfWork.CustomerRepository.GetAllAsync();
        } catch ( Exception ex ){
            Console.WriteLine( ex );
            return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
        }
    }


    [HttpGet("getByInfo")]
    public async Task<ActionResult<Customer>> GetByInfo(string info) {
        try {
            Account account = null;
            string pat = @"\D";
            MatchCollection result = Regex.Matches(info, pat);
            if (result.Count > 0)
                account = await _unitOfWork.AccountRepository.FindEmailAsync( info );
            else
                account = await _unitOfWork.AccountRepository.FindPhoneNumberAsync( info );
            if( account == null )
                return StatusCode( StatusCodes.Status404NotFound, "Unable to find the account" );
            Customer customer =  await _unitOfWork.CustomerRepository.SearchByAccountIDAsync( account.AccountID );
            if( customer == null )
                StatusCode( StatusCodes.Status404NotFound, "Unable to find the role" );
            return Ok( customer );
        } catch (Exception ex) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("account")]
    public async Task<ActionResult<Customer>> GetByAccountID(string accountID) {
        try {
            Customer customer =  await _unitOfWork.CustomerRepository.SearchByAccountIDAsync( accountID );
            if( customer == null )
                return StatusCode( StatusCodes.Status404NotFound, "Unable to find the customer profile" );
            return Ok( customer );
        } catch (Exception ex) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Customer>> GetByID(string id) {
        try {
            Customer customer =  await _unitOfWork.CustomerRepository.GetByIdAsync( id );
            if( customer == null )
                return StatusCode( StatusCodes.Status404NotFound, "Unable to find the customer profile" );
            return Ok( customer );
        } catch (Exception ex) {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
    [HttpPut("updatestatus")]
    public async Task<ActionResult<Customer>> UpdateStatusAsync(UpdateStatusInformation info)
    {
        try
        {
            if (await _unitOfWork.CustomerRepository.GetByIdAsync(info.Id) == null)
                return NotFound("The Customer does not existed!");
            int updated = await _unitOfWork.CustomerRepository.UpdateStatusAsync(info.Id, info.Message);
            if (updated == 0)
                return BadRequest("Customer status update failed!");
            else
                return Ok($"The Customer Status has been updated to: {info.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPut("updateCusInfo")]
    public async Task<ActionResult<Customer>> UpdateCusInfoAsync(UpdateCustomerInformation info)
    {
        try
        {
            // Check if the customer exists
            var customer = await _unitOfWork.CustomerRepository.GetByIdAsync(info.Id);
            if (customer == null)
                return NotFound("The Customer does not exist!");

            // Update customer information (Address, Birthday, Sex)
            int updated = await _unitOfWork.CustomerRepository.updateInfo(
                info.Id,
                info.Address,
                info.DOB,  // Make sure this is in yyyy-MM-dd format
                info.Gender
            );

            if (updated == 0)
                return BadRequest("Customer information update failed!");
            else
                return Ok("Customer information has been successfully updated.");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }


}

