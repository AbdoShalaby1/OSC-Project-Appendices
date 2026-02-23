using CarShowroom.Context;
using Microsoft.EntityFrameworkCore;

namespace CarShowroom.Services.OnlineListingServices
{
    public class CheckListingExist(DBContext context)
    {
        public async Task<bool> CheckListingExists(string inputString)
        {
            var hashed = Hash.GetHash(inputString);
            if (await context.Listings.AsNoTracking().AnyAsync(l => l.Hash.SequenceEqual(hashed)))
            {
                return true;
            }
            return false;
        }   
    }
}
