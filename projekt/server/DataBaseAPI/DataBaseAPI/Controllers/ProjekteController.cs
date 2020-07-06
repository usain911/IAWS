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
    public class ProjekteController : ControllerBase
    {
        private readonly ProjektmanagementContext _context;

        public ProjekteController(ProjektmanagementContext context)
        {
            _context = context;
        }

        // GET: api/Projekte
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Projekte>>> GetProjekte()
        {
            return await _context.Projekte.ToListAsync();
        }

        // GET: api/Projekte/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Projekte>> GetProjekte(int id)
        {
            var projekte = await _context.Projekte.FindAsync(id);

            if (projekte == null)
            {
                return NotFound();
            }

            return projekte;
        }

        // Search for Projects
        // GET: api/Projekte/search/test
        [HttpGet("search/{s}")]
        public async Task<ActionResult<IEnumerable<Projekte>>> SearchProjekte(string s)
        {
            IQueryable<Projekte> query = _context.Projekte;

            if (!string.IsNullOrEmpty(s))
            {
               query = query.Where(e => e.Name.Contains(s));
            }

            return await query.ToListAsync();
        }


    // GET: api/Projekte/GetProjektByOwnerId/5
    [HttpGet("GetProjektByOwnerId/{owner}")]
        public async Task<ActionResult<IEnumerable<Projekte>>> GetProjektByOwnerId(int owner)
        {
          return _context.Projekte.Where(ow => ow.ProjektOwnerId == owner).ToArray();

        }

    // PUT: api/Projekte/5
    // To protect from overposting attacks, enable the specific properties you want to bind to, for
    // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
    [HttpPut("{id}")]
        public async Task<IActionResult> PutProjekte(int id, Projekte projekte)
        {
            if (id != projekte.ProjektId)
            {
                return BadRequest();
            }

            _context.Entry(projekte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjekteExists(id))
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

        // POST: api/Projekte
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Projekte>> PostProjekte(Projekte projekte)
        {
            _context.Projekte.Add(projekte);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjekte", new { id = projekte.ProjektId }, projekte);
        }

        // DELETE: api/Projekte/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Projekte>> DeleteProjekte(int id)
        {
            var projekte = await _context.Projekte.FindAsync(id);
            if (projekte == null)
            {
                return NotFound();
            }

            _context.Projekte.Remove(projekte);
            await _context.SaveChangesAsync();

            return projekte;
        }

        private bool ProjekteExists(int id)
        {
            return _context.Projekte.Any(e => e.ProjektId == id);
        }
    }
}
