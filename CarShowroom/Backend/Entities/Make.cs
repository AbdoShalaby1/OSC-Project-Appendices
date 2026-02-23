using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShowroom.Entities
{
    public class Make
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MakeId { get; set; }

        [Required]
        public required string MakeName { get; set; }

        [Required]
        public required string MakeIconPath { get; set; }
    }
}
