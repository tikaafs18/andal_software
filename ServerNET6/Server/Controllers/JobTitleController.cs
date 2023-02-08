using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace Server.Controllers;

[Route("job/title")]
[ApiController]

public class JobTitleController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public JobTitleController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<JobTitle>>> GetJobTitle()
    {
        return Ok(await _context.titles.ToListAsync());
    }

    [HttpPost]
    public async Task<ActionResult<List<JobTitle>>> CreateJobTitle(Title title)
    {
        _context.titles.Add(title);
        await _context.SaveChangesAsync();

        return Ok(await _context.titles.ToListAsync());
    }

    [HttpPatch("{idtitle}")]
    public async Task<ActionResult<List<JobTitle>>> UpdateJobTitle(Title title, int idtitle)
    {
        var dbTitle = await _context.titles.FindAsync(idtitle);
        // var dbTitle = await _context.titles.FindAsync(title.idtitle);
        if (dbTitle == null)
            return BadRequest("Title not found");

        // dbTitle.idtitle = title.idtitle;
        dbTitle.title_code = title.title_code;
        dbTitle.title_name = title.title_name;
        dbTitle.isDeleted = title.isDeleted;

        await _context.SaveChangesAsync();

        return Ok(await _context.titles.ToListAsync());
    }

    [HttpDelete("{idtitle}")]
    public async Task<ActionResult<List<JobTitle>>> DeleteJobTitle(int idtitle)
    {
        var title_id = idtitle;
        var dbTitle = await _context.titles.FindAsync(idtitle);
        if (dbTitle == null)
            return BadRequest("Title not found");


        // dbPosition.title_id = 8;
        // _context.titles.Remove(dbTitle);
        dbTitle.isDeleted = true;
        await _context.SaveChangesAsync();

        return Ok();
    }

}