using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KVCS.Context;
using KVCS.Model;
using KVCS.Business;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AccountContext _context;

        public LoginController(AccountContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Account>> LoggingByEmail(string email, string password){
            AccountDAO dao = new AccountDAO(_context);
            var account = await dao.LoginByEmail(email, password);
            if( account == null )
                return account!;
            else return account;
        }
    }
}
