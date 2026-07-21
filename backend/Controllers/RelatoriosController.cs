using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {
        private readonly FinanceiroService _service;

        public RelatoriosController(FinanceiroService service)
        {
            _service = service;
        }

        [HttpGet("totais")]
        public IActionResult ObterTotais() => Ok(_service.ObterRelatorioTotais());
    }
}