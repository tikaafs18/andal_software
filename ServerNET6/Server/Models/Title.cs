namespace Server.Models;

[Index(nameof(title_code), IsUnique = true)]
[Index(nameof(title_name), IsUnique = true)]
public class Title
{
    [Key]
    public int idtitle { get; set; }

    [Required(ErrorMessage = "Title code field is required")]
    [StringLength(maximumLength: 100, MinimumLength = 2)]
    public string title_code { get; set; }

    [Required(ErrorMessage = "Title name field is required")]
    [StringLength(maximumLength: 100, MinimumLength = 2)]
    public string title_name { get; set; }

    [Required(ErrorMessage = "IsDeleted field is required")]
    public bool isDeleted { get; set; }

}