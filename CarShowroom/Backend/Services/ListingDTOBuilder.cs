using CarShowroom.DTOs;
using CarShowroom.Entities;
namespace CarShowroom.Services
{
    public class ListingDTOBuilder
    {
        public ListingDTO ToListingDTO(Listing listing)
        {
            return new ListingDTO
            {
                Make = listing.CarDetails!.CarModel!.Maker!.MakeName,
                Model = listing.CarDetails.CarModel.Model,
                Year = listing.CarDetails.Year.ToString(),
                Mileage = listing.MileageKM.ToString(),
                Price = listing.Price.ToString(),
                Color = listing.CarDetails.Color,
                Transmission = listing.CarDetails.Transmission,
                BodyType = listing.CarDetails.BodyType!,
                FuelType = listing.CarDetails.FuelType!,
                CoverImage = listing.CoverImage,
                Images = listing.ImagePaths!.Select(image => image.ImagePath).ToList(),
                Location = listing.Location,
                Description = listing.Description ?? "",
                PostedDate = listing.PostedDate.ToString()
            };
        }
    }
}
