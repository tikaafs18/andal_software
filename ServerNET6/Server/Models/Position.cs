namespace Server.Models;

[Index(nameof(position_code), IsUnique = true)]
[Index(nameof(position_name), IsUnique = true)]
public class Position
{
    [Key]
    public int idposition { get; set; }

    [Required(ErrorMessage = "Title code field is required")]
    [StringLength(maximumLength: 100, MinimumLength = 2)]
    public string position_code { get; set; }

    [Required(ErrorMessage = "Title name field is required")]
    [StringLength(maximumLength: 100, MinimumLength = 2)]
    public string position_name { get; set; }

    public int title_id { get; set; }
}