using CarShowroom.Context;
using CarShowroom.DTOs;
using CarShowroom.Entities;
using CarShowroom.Services.OnlineListingServices;
using Microsoft.EntityFrameworkCore;

namespace CarShowroom.Services
{
    public class SaveListing(DBContext _context)
    {
        public async Task<bool> SaveOnlineListing(AddListingOnlineDTO dto)
        {
            try
            {
                // 1. Get or Create the Make & Model (Clutter reduction)
                var make = await _context.Makes.FirstOrDefaultAsync(m => m.MakeName == dto.Make)
                           ?? throw new Exception("Make not found");

                var model = await _context.CarModels.FirstOrDefaultAsync(m => m.MakerId == make.MakeId && m.Model == dto.Model)
                            ?? new CarModel { MakerId = make.MakeId, Model = dto.Model };

                // 2. Get or Create the Details
                var details = await _context.CarDetails.FirstOrDefaultAsync(d =>
                    d.CarModelId == model.CarId &&
                    d.Year == int.Parse(dto.Year) &&
                    d.Color == dto.Color)
                    ?? new CarDetails
                    {
                        CarModel = model, // EF links this even if model is new!
                        Year = int.Parse(dto.Year),
                        Color = dto.Color!,
                        Transmission = dto.Transmission!,
                        FuelType = dto.FuelType!,
                        BodyType = dto.BodyType!
                    };

                // 3. Build the Listing (The Final Object)
                Listing listing = new()
                {
                    CarDetails = details, // This links the whole chain back to the Make
                    MileageKM = int.Parse(dto.Mileage!),
                    Price = decimal.Parse(dto.Price),
                    PostedDate = DateTime.Now,
                    IsAvailable = true,
                    Hash = Hash.GetHash(dto.Source!),
                    Description = dto.Description,
                    Location = dto.Location!,
                    CoverImage = dto.CoverImage!,
                    ImagePaths = [.. dto.Images!.Select(i => new ListingImage { ImagePath = i })]
                };

                // 4. The Single Save
                await _context.Listings.AddAsync(listing);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
        }
    }
}
