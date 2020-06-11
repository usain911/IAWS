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
    public class NutzerProjekteController : ControllerBase
    {
        private readonly ProjektmanagementContext _context;

        public NutzerProjekteController(ProjektmanagementContext context)
        {
            _context = context;
        }

        // GET: api/NutzerProjekte
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NutzerProjekte>>> GetNutzerProjekte()
        {
            return await _context.NutzerProjekte.ToListAsync();
        }

        // GET: api/NutzerProjekte/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NutzerProjekte>> GetNutzerProjekte(int id)
        {
            var nutzerProjekte = await _context.NutzerProjekte.FindAsync(id);

            if (nutzerProjekte == null)
            {
                return NotFound();
            }

            return nutzerProjekte;
        }

        // PUT: api/NutzerProjekte/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNutzerProjekte(int id, NutzerProjekte nutzerProjekte)
        {
            if (id != nutzerProjekte.Id)
            {
                return BadRequest();
            }

            _context.Entry(nutzerProjekte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NutzerProjekteExists(id))
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

        // POST: api/NutzerProjekte
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NutzerProjekte>> PostNutzerProjekte(NutzerProjekte nutzerProjekte)
        {
            _context.NutzerProjekte.Add(nutzerProjekte);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNutzerProjekte", new { id = nutzerProjekte.Id }, nutzerProjekte);
        }

        // DELETE: api/NutzerProjekte/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NutzerProjekte>> DeleteNutzerProjekte(int id)
        {
            var nutzerProjekte = await _context.NutzerProjekte.FindAsync(id);
            if (nutzerProjekte == null)
            {
                return NotFound();
            }

            _context.NutzerProjekte.Remove(nutzerProjekte);
            await _context.SaveChangesAsync();

            return nutzerProjekte;
        }

        private bool NutzerProjekteExists(int id)
        {
            return _context.NutzerProjekte.Any(e => e.Id == id);
        }
    }
}
