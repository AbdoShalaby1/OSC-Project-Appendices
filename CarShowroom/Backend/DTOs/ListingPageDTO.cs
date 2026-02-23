namespace CarShowroom.DTOs
{
    public class ListingPageDTO
    {
        public required List<ListingDTO> Listings { get; set; }
        public int TotalListingCount { get; set; }
        public int TotalPageCount { get; set; }
    }
}
