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
    public class NutzerAufgabenController : ControllerBase
    {
        private readonly ProjektmanagementContext _context;

        public NutzerAufgabenController(ProjektmanagementContext context)
        {
            _context = context;
        }

        // GET: api/NutzerAufgaben
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NutzerAufgaben>>> GetNutzerAufgaben()
        {
            return await _context.NutzerAufgaben.ToListAsync();
        }

        // GET: api/NutzerAufgaben/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NutzerAufgaben>> GetNutzerAufgaben(int id)
        {
            var nutzerAufgaben = await _context.NutzerAufgaben.FindAsync(id);

            if (nutzerAufgaben == null)
            {
                return NotFound();
            }

            return nutzerAufgaben;
        }

        // GET: api/Nutzer/GetNutzerByAufgabenId/5
        [HttpGet("GetNutzerIdByAufgabenId/{aid}")]
        public async Task<ActionResult<IEnumerable<NutzerAufgaben>>> GetNutzerIdByAufgabenId(int aid)
            {
               return _context.NutzerAufgaben.Where(ai => ai.NutzerId == aid).ToArray();

            }

        // PUT: api/NutzerAufgaben/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNutzerAufgaben(int id, NutzerAufgaben nutzerAufgaben)
        {
            if (id != nutzerAufgaben.Id)
            {
                return BadRequest();
            }

            _context.Entry(nutzerAufgaben).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NutzerAufgabenExists(id))
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

        // POST: api/NutzerAufgaben
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NutzerAufgaben>> PostNutzerAufgaben(NutzerAufgaben nutzerAufgaben)
        {
            _context.NutzerAufgaben.Add(nutzerAufgaben);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNutzerAufgaben", new { id = nutzerAufgaben.Id }, nutzerAufgaben);
        }

        // DELETE: api/NutzerAufgaben/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NutzerAufgaben>> DeleteNutzerAufgaben(int id)
        {
            var nutzerAufgaben = await _context.NutzerAufgaben.FindAsync(id);
            if (nutzerAufgaben == null)
            {
                return NotFound();
            }

            _context.NutzerAufgaben.Remove(nutzerAufgaben);
            await _context.SaveChangesAsync();

            return nutzerAufgaben;
        }

        private bool NutzerAufgabenExists(int id)
        {
            return _context.NutzerAufgaben.Any(e => e.Id == id);
        }
    }
}
