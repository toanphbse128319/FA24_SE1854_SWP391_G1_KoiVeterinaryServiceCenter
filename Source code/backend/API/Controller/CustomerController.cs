#nullable disable
using Microsoft.AspNetCore.Mvc;
using Repositories.Model;
using Repositories;
using System.Text.RegularExpressions;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CustomerController : ControllerBase {

    private UnitOfWork _unitOfWork;

    public CustomerController(UnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
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
}

