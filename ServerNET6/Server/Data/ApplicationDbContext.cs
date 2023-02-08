namespace Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
    base(options)
    {

    }

    public DbSet<Title> titles { get; set; }
    public DbSet<Position> positions { get; set; }
}