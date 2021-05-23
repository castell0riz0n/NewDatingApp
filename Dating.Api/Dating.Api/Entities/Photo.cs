using System.ComponentModel.DataAnnotations.Schema;

namespace Dating.Api.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public AppUser AppUser { get; set; }
        [ForeignKey("AppUser")]
        public int AppUserId { get; set; }

    }
}