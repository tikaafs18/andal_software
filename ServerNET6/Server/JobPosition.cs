namespace Server;

public class JobPosition
{
    public int Id { get; set; }
    public string PositionCode { get; set; } = string.Empty;
    public string PositionName { get; set; } = string.Empty;
    public int Title_Id { get; set; }
    public string TitleCode { get; set; } = string.Empty;
    public string TitleName { get; set; } = string.Empty;
    public bool TitleDelete { get; set; }
}
