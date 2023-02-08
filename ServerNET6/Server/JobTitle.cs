namespace Server;

public class JobTitle
{
    public int Id { get; set; }
    public string TitleCode { get; set; } = string.Empty;
    public string TitleName { get; set; } = string.Empty;
    public bool IsDeleted { get; set; }
}
