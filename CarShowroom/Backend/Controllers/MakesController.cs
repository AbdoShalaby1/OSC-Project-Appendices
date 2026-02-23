using CarShowroom.Context;
using CarShowroom.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarShowroom.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MakesController(DBContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetMakes()
        {
            var makes = await context.Set<Make>().AsNoTracking().ToListAsync();
            return Ok(makes);
        }
    }
}
