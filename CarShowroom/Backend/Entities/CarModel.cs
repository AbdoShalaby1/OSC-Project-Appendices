using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShowroom.Entities
{
    public class CarModel
    {
        // you have to make an empty constructor for object initializer to work
        // to use object initializer you make new {Field = value, ...} not new()
        // works with properties far better in EF core
        public CarModel()
        {
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long CarId { get; set; }
        public int MakerId { get; set; }

        public Make? Maker { get; set; }

        public required string Model { get; set; }

    }
}
