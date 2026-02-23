using CarShowroom.Context;
using CarShowroom.DTOs;
using CarShowroom.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace CarShowroom.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CarsController(ListingDTOBuilder builder, DBContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllCars([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            if (limit > 100)
            {
                return BadRequest("Limit is too high!");
            }
            if (page < 1) page = 1;
            var count = await context.Listings.CountAsync();

            return Ok(new ListingPageDTO
            {
                Listings = [.. (await context.Listings.AsNoTracking()
                            .Include(d => d.CarDetails)
                                .ThenInclude(m => m!.CarModel)
                                    .ThenInclude(m => m!.Maker)
                            .Include(i => i.ImagePaths)
                            .Skip((page-1)*limit)
                            .Take(limit)
                            .ToListAsync())
                            .Select(listing => builder.ToListingDTO(listing))
                            .ToList()],
                    
                    

                TotalListingCount = count,
                TotalPageCount = (int)Math.Ceiling((double)count / limit)

            });

        }
    }
}
