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
    public class TeilaufgabenController : ControllerBase
    {
        private readonly ProjektmanagementContext _context;

        public TeilaufgabenController(ProjektmanagementContext context)
        {
            _context = context;
        }

        // GET: api/Teilaufgaben
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Teilaufgaben>>> GetTeilaufgaben()
        {
            return await _context.Teilaufgaben.ToListAsync();
        }

        // GET: api/Teilaufgaben/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Teilaufgaben>> GetTeilaufgaben(int id)
        {
            var teilaufgaben = await _context.Teilaufgaben.FindAsync(id);

            if (teilaufgaben == null)
            {
                return NotFound();
            }

            return teilaufgaben;
        }

    // GET: api/TeilAufgaben/GetTeilaufgabenByAufgabenId/5
    [HttpGet("GetTeilaufgabenByAufgabenId/{AufgabenID}")]
    public async Task<ActionResult<IEnumerable<Teilaufgaben>>> GetTeilaufgabenByAufgabenId(int AufgabenID)
    {
      return _context.Teilaufgaben.Where(k => k.ZugeordnetZuAufgabe == AufgabenID).ToArray();
    }


    // Search for Teilaufgaben
    // GET: api/Teilaufgaben/search/test
    [HttpGet("search/{s}")]
    public async Task<ActionResult<IEnumerable<Teilaufgaben>>> SearchTeilaufgaben(string s)
    {
      IQueryable<Teilaufgaben> query = _context.Teilaufgaben;

      if (!string.IsNullOrEmpty(s))
      {
        query = query.Where(e => e.Titel.Contains(s));
      }

      return await query.ToListAsync();
    }

    // PUT: api/Teilaufgaben/5
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPut("{id}")]
        public async Task<IActionResult> PutTeilaufgaben(int id, Teilaufgaben teilaufgaben)
        {
            if (id != teilaufgaben.TeilaufgabenId)
            {
                return BadRequest();
            }

            _context.Entry(teilaufgaben).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeilaufgabenExists(id))
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

        // POST: api/Teilaufgaben
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Teilaufgaben>> PostTeilaufgaben(Teilaufgaben teilaufgaben)
        {
            _context.Teilaufgaben.Add(teilaufgaben);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeilaufgaben", new { id = teilaufgaben.TeilaufgabenId }, teilaufgaben);
        }

        // DELETE: api/Teilaufgaben/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Teilaufgaben>> DeleteTeilaufgaben(int id)
        {
            var teilaufgaben = await _context.Teilaufgaben.FindAsync(id);
            if (teilaufgaben == null)
            {
                return NotFound();
            }

            _context.Teilaufgaben.Remove(teilaufgaben);
            await _context.SaveChangesAsync();

            return teilaufgaben;
        }

        private bool TeilaufgabenExists(int id)
        {
            return _context.Teilaufgaben.Any(e => e.TeilaufgabenId == id);
        }
    }
}
