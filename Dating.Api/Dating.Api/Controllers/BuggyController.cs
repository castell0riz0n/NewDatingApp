using System;
using System.Threading.Tasks;
using Dating.Api.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dating.Api.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public ActionResult<string> Auth()
        {
            return "secret text";
        }        
        
        [HttpGet]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }        
        
        [HttpGet]
        public ActionResult ServerError()
        {
            throw new NullReferenceException();
        }        
        
        [HttpGet]
        public ActionResult GetBadRequest()
        {
            return BadRequest("this was not a good request");
        }
    }
}