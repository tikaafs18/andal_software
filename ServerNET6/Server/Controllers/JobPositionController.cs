using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace Server.Controllers;

[Route("job/position")]
[ApiController]

public class JobPositionController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public JobPositionController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<JobPosition>>> GetJobPosition()
    {

        var Data = (from positions in _context.positions
                    from titles in _context.titles
                    where positions.title_id == titles.idtitle
                    select new
                    {
                        positions.idposition,
                        positions.position_code,
                        positions.position_name,
                        positions.title_id,
                        titles.title_code,
                        titles.title_name,
                        titles.isDeleted
                    });
        return Ok(await Data.ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult<List<JobPosition>>> CreateJobPosition(Position position)
    {
        _context.positions.Add(position);
        await _context.SaveChangesAsync();

        return Ok(await _context.positions.ToListAsync());
    }

    [HttpPatch("{idposition}")]
    public async Task<ActionResult<List<JobPosition>>> UpdateJobPosition(Position position, int idposition)
    {
        var dbPosition = await _context.positions.FindAsync(idposition);
        if (dbPosition == null)
            return BadRequest("Position not found");

        dbPosition.position_code = position.position_code;
        dbPosition.position_name = position.position_name;
        dbPosition.title_id = position.title_id;

        await _context.SaveChangesAsync();

        return Ok(await _context.positions.ToListAsync());
    }

    [HttpDelete("{idposition}")]
    public async Task<ActionResult<List<JobPosition>>> DeleteJobPosition(int idposition)
    {
        var dbPosition = await _context.positions.FindAsync(idposition);
        if (dbPosition == null)
            return BadRequest("Position not found");

        _context.positions.Remove(dbPosition);
        await _context.SaveChangesAsync();

        return Ok();
    }

}