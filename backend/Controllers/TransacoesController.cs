using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacoesController : ControllerBase
    {
        private readonly FinanceiroService _service;

        public TransacoesController(FinanceiroService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Criar([FromBody] Transacao transacao)
        {
            var (novaTransacao, erro) = _service.CriarTransacao(transacao);
            if (erro != null) return BadRequest(erro);
            
            return Ok(novaTransacao);
        }

        [HttpGet]
        public IActionResult Listar() => Ok(_service.ListarTransacoes());
    }
}