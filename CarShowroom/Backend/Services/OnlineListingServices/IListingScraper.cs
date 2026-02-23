using CarShowroom.DTOs;

namespace CarShowroom.Services.OnlineListingServices
{
    public interface IListingScraper
    {
        /*
         * We will use selenium on brave to scrape a car page (Hatla2ee or others)
         * then send the object we constructed to the validator to check if it exists in our database
         * we will hash the car make and model for the model database
         * and hash the url of the listing for the listing database
         * we are using bigint (long)
         * the data as is should be sent to the frontend first for user confirmation
         * then if he edited and confirmed we will send it to the validator again
         * 
         * workflow: request -> scrape -> send to frontend as is (if empty no problem) -> user confirm/edit -> send to validator -> if not exist save to db
         * 
         * we will implement scraping for hatla2ee first then we can add more sources later
         */

        public abstract static Task<AddListingOnlineDTO> Scrape(string target);
    }
}
