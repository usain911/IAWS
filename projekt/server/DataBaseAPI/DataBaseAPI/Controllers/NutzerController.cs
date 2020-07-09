using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBaseAPI.Models;

namespace DataBaseAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class NutzerController : ControllerBase
  {
    private readonly ProjektmanagementContext _context;

    public NutzerController(ProjektmanagementContext context)
    {
      _context = context;
    }

    // GET: api/Nutzer
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Nutzer>>> GetNutzer()
    {
      return await _context.Nutzer.ToListAsync();
    }

    // GET: api/Nutzer/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Nutzer>> GetNutzer(int id)
    {
      var nutzer = await _context.Nutzer.FindAsync(id);

      if (nutzer == null)
      {
        return NotFound();
      }

      return nutzer;
    }

    // GET: api/Nutzer/5
    [HttpGet("GetNutzerByNutzername/{nname}")]
    public async Task<ActionResult<Nutzer>> GetNutzerByBenutzerName(string nname)
    {
      var nutzer = _context.Nutzer.Where(bn => bn.Nutzername == nname).FirstOrDefault();

      if (nutzer == null)
      {
        return NotFound();
      }

      return nutzer;
    }



    // PUT: api/Nutzer/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutNutzer(int id, Nutzer nutzer)
    {
      if (id != nutzer.NutzerId)
      {
        return BadRequest();
      }

      _context.Entry(nutzer).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!NutzerExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Nutzer
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPost]
    public async Task<ActionResult<Nutzer>> PostNutzer(Nutzer nutzer)
    {
      _context.Nutzer.Add(nutzer);
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateException)
      {
        if (NutzerExists(nutzer.NutzerId))
        {
          return Conflict();
        }
        else
        {
          throw;
        }
      }

      return CreatedAtAction("GetNutzer", new { id = nutzer.NutzerId }, nutzer);
    }

    // DELETE: api/Nutzer/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Nutzer>> DeleteNutzer(int id)
    {
      var nutzer = await _context.Nutzer.FindAsync(id);
      if (nutzer == null)
      {
        return NotFound();
      }

      _context.Nutzer.Remove(nutzer);
      await _context.SaveChangesAsync();

      return nutzer;
    }

    private bool NutzerExists(int id)
    {
      return _context.Nutzer.Any(e => e.NutzerId == id);
    }
  }
}
