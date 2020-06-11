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
    public class ZwischenRechteApController : ControllerBase
    {
        private readonly ProjektmanagementContext _context;

        public ZwischenRechteApController(ProjektmanagementContext context)
        {
            _context = context;
        }

        // GET: api/ZwischenRechteAp
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ZwischenRechteAp>>> GetZwischenRechteAp()
        {
            return await _context.ZwischenRechteAp.ToListAsync();
        }

        // GET: api/ZwischenRechteAp/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ZwischenRechteAp>> GetZwischenRechteAp(int id)
        {
            var zwischenRechteAp = await _context.ZwischenRechteAp.FindAsync(id);

            if (zwischenRechteAp == null)
            {
                return NotFound();
            }

            return zwischenRechteAp;
        }

        // PUT: api/ZwischenRechteAp/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZwischenRechteAp(int id, ZwischenRechteAp zwischenRechteAp)
        {
            if (id != zwischenRechteAp.ZwischenRechteId)
            {
                return BadRequest();
            }

            _context.Entry(zwischenRechteAp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZwischenRechteApExists(id))
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

        // POST: api/ZwischenRechteAp
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ZwischenRechteAp>> PostZwischenRechteAp(ZwischenRechteAp zwischenRechteAp)
        {
            _context.ZwischenRechteAp.Add(zwischenRechteAp);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZwischenRechteAp", new { id = zwischenRechteAp.ZwischenRechteId }, zwischenRechteAp);
        }

        // DELETE: api/ZwischenRechteAp/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ZwischenRechteAp>> DeleteZwischenRechteAp(int id)
        {
            var zwischenRechteAp = await _context.ZwischenRechteAp.FindAsync(id);
            if (zwischenRechteAp == null)
            {
                return NotFound();
            }

            _context.ZwischenRechteAp.Remove(zwischenRechteAp);
            await _context.SaveChangesAsync();

            return zwischenRechteAp;
        }

        private bool ZwischenRechteApExists(int id)
        {
            return _context.ZwischenRechteAp.Any(e => e.ZwischenRechteId == id);
        }
    }
}
