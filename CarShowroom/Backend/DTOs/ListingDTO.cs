namespace CarShowroom.DTOs
{
    public class ListingDTO
    {
        public required String Make { get; set; }
        public required String Model { get; set; }
        public required String Year { get; set; }
        public required String Mileage { get; set; }
        public required String Price { get; set; }
        public required String Color { get; set; }
        public required String Transmission { get; set; }
        public required String BodyType { get; set; }
        public required String FuelType { get; set; }
        public required String CoverImage { get; set; }
        public required List<String> Images  { get; set; }
        public required String Location { get; set; }
        public required String Description { get; set; }
        public required String PostedDate { get; set; }

    }
}
