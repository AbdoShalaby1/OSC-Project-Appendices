using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShowroom.Entities
{
    public class CarDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long CarId { get; set; }
        [Required]
        public long CarModelId { get; set; }
        [Required]
        public CarModel? CarModel { get; set; }
        [Required]
        public required int Year { get; set; }
        [Required]
        public required string Color { get; set; }
        [Required]
        public required string Transmission { get; set; }
        [Required]
        public required string FuelType { get; set; }
        [Required]
        public string? BodyType { get; set; }
    }
}
