using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly FinanceiroService _service;

        public PessoasController(FinanceiroService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Criar([FromBody] Pessoa pessoa)
        {
            var novaPessoa = _service.CriarPessoa(pessoa);
            return CreatedAtAction(nameof(Listar), new { id = novaPessoa.Id }, novaPessoa);
        }

        [HttpGet]
        public IActionResult Listar() => Ok(_service.ListarPessoas());

        [HttpDelete("{id}")]
        public IActionResult Deletar(Guid id)
        {
            var deletado = _service.DeletarPessoa(id);
            if (!deletado) return NotFound("Pessoa não encontrada.");
            return NoContent();
        }
    }
}