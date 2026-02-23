using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShowroom.Entities
{
    public class Listing
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long ListingId { get; set; }
        [Required]
        public required int MileageKM { get; set; }
        [Required]
        public required decimal Price { get; set; }
        [Required]
        public long CarDetailsId { get; set; }
        [Required]
        public CarDetails? CarDetails { get; set; }
        [Required]
        public required DateTime PostedDate { get; set; }
        [Required]
        public required bool IsAvailable { get; set; }
        [Required]
        public required byte[] Hash { get; set; }
        public string? ContactInfo { get; set; }

        [Required]
        public List<ListingImage>? ImagePaths { get; set; }
        [Required]
        public required String CoverImage { get; set; }

        public string? Description { get; set; }

        [Required]
        public required string Location { get; set; }

        public int? OwnerId { get; set; }

        public User? Owner { get; set; }

    }
}
