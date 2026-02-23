using CarShowroom.Context;
using CarShowroom.DTOs;
using CarShowroom.Services;
using CarShowroom.Services.OnlineListingServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarShowroom.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OnlineListingController(DBContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult> ScrapeURL([FromQuery] string target, [FromQuery] string provider)
        {
            try
            {
                CheckListingExist ch = new(context);
                if (!await ch.CheckListingExists(target))
                {
                    var data = await Hatla2eeScraper.Scrape(target);

                    return Ok(data);
                }
                return Conflict("This listing is already in the database!");
            }
            catch (Exception)
            {
                return BadRequest("Invalid Page!");
            }
        }

        [HttpPost]
        public async Task<ActionResult> SaveListing([FromBody] AddListingOnlineDTO listingDTO)
        {

            SaveListing saver = new(context);
            if (await saver.SaveOnlineListing(listingDTO))
            {
                return NoContent();
            }
            return Conflict("This listing is already in the database!");
        }
    }
}
