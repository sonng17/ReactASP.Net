using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostgreSQL.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PostgreSQL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeDepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeDepartmentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/EmployeeDepartments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDepartment>>> GetEmployeeDepartments()
        {
            return await _context.EmployeeDepartments
                .Include(ed => ed.Employee)
                .Include(ed => ed.Department)
                .ToListAsync();
        }

        // GET: api/EmployeeDepartments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDepartment>> GetEmployeeDepartment(int id)
        {
            var employeeDepartment = await _context.EmployeeDepartments
                .Include(ed => ed.Employee)
                .Include(ed => ed.Department)
                .FirstOrDefaultAsync(ed => ed.EmployeeId == id && ed.DepartmentId == id);

            if (employeeDepartment == null)
            {
                return NotFound();
            }

            return employeeDepartment;
        }

        // POST: api/EmployeeDepartments
        [HttpPost]
        public async Task<ActionResult<EmployeeDepartment>> PostEmployeeDepartment(EmployeeDepartment employeeDepartment)
        {
            _context.EmployeeDepartments.Add(employeeDepartment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployeeDepartment), new { id = employeeDepartment.EmployeeId }, employeeDepartment);
        }

        // PUT: api/EmployeeDepartments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployeeDepartment(int id, EmployeeDepartment employeeDepartment)
        {
            if (id != employeeDepartment.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employeeDepartment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeDepartmentExists(id))
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

        // DELETE: api/EmployeeDepartments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployeeDepartment(int id)
        {
            var employeeDepartment = await _context.EmployeeDepartments.FindAsync(id);
            if (employeeDepartment == null)
            {
                return NotFound();
            }

            _context.EmployeeDepartments.Remove(employeeDepartment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeDepartmentExists(int id)
        {
            return _context.EmployeeDepartments.Any(e => e.EmployeeId == id);
        }
    }
}
