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
    public class RechteController : ControllerBase
    {
        private readonly ProjektmanagementContext _context;

        public RechteController(ProjektmanagementContext context)
        {
            _context = context;
        }

        // GET: api/Rechte
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rechte>>> GetRechte()
        {
            return await _context.Rechte.ToListAsync();
        }

        // GET: api/Rechte/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rechte>> GetRechte(int id)
        {
            var rechte = await _context.Rechte.FindAsync(id);

            if (rechte == null)
            {
                return NotFound();
            }

            return rechte;
        }

        // PUT: api/Rechte/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRechte(int id, Rechte rechte)
        {
            if (id != rechte.RechteId)
            {
                return BadRequest();
            }

            _context.Entry(rechte).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RechteExists(id))
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

        // POST: api/Rechte
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Rechte>> PostRechte(Rechte rechte)
        {
            _context.Rechte.Add(rechte);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRechte", new { id = rechte.RechteId }, rechte);
        }

        // DELETE: api/Rechte/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Rechte>> DeleteRechte(int id)
        {
            var rechte = await _context.Rechte.FindAsync(id);
            if (rechte == null)
            {
                return NotFound();
            }

            _context.Rechte.Remove(rechte);
            await _context.SaveChangesAsync();

            return rechte;
        }

        private bool RechteExists(int id)
        {
            return _context.Rechte.Any(e => e.RechteId == id);
        }
    }
}
