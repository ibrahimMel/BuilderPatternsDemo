using backend.Builders;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;


namespace backend.Controllers;

[ApiController] //indique que cette classe est un controleur d API
[Route("api/[controller]")] //definir la route de l API
public class ComputerController : ControllerBase //herite de ControllerBase pour les fonctionnalites de controleur d API
{
    private readonly MongoDBService _mongoService;

    // Injection du service MongoDb
    public ComputerController(MongoDBService mongoService)
    {
        _mongoService = mongoService;
    }

    //liste tous les pc 
    [HttpGet]
    public async Task<IActionResult> GetAllComputers()
    {
        var computers = await _mongoService.GetAllAsync();
        return Ok(computers); //renvoie la liste des pc avec un code de statut 200 (OK)
    }
    //recuperer un pc par id
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var computer = await _mongoService.GetByIdAsync(id);
        if (computer == null)
        {
            return NotFound(new {message = " le pc que vous cherche n'exisite pas "}); //renvoie un code de statut 404 si le pc n est pas trouve
        }
        return Ok(computer); //renvoie le pc avec un code de statut 200 (OK)
    }
    
    //construire un pc perso
    [HttpPost("build")]
    public async Task<ActionResult<Computer>> BuildCustom([FromBody] Computer request)
    {
        var computer = new ComputerBuilder()
            .SetCPU(request.CPU)
            .SetGPU(request.GPU)
            .SetRAM(request.RAM)
            .SetStorage(request.Storage, request.StorageType)
            .SetOperatingSystem(request.OperatingSystem)
            .SetPrice(request.Price)
            .Build();

            if(request.HasWifi)
            {
                computer.HasWifi = true;
            }
            if(request.HasBluetooth)
            {
                computer.HasBluetooth = true;
            }
        await _mongoService.CreateAsync(computer);

        return CreatedAtAction(nameof(GetById), new { id = computer.Id }, computer);
    }

    // get /api/comuter/presets/developer
    [HttpGet("presets/developer")] // construire un pc de devloppeur predefinie  presets/developer c'est le chemin d API
    public async Task<ActionResult<Computer>> builderDeveloperPC()
    {
        var builder = new ComputerBuilder();
        var director = new ComputerDirector(builder);
        var computer = director.ConstructDeveloperPC();

        await _mongoService.CreateAsync(computer);

        return Ok(computer);
    }

    // get /api/comuter/presets/gaming
    [HttpGet("presets/gaming")] // construire un pc gaming predefinie
    public async Task<ActionResult<Computer>> builderGamingPC()
    {
        var builder = new ComputerBuilder();
        var director = new ComputerDirector(builder);
        var computer = director.ConstructGamingPC();

        await _mongoService.CreateAsync(computer);

        return Ok(computer);
    }

    // get /api/comuter/presets/office
    [HttpGet("presets/office")] // construire un pc bureautique predefinie
    public async Task<ActionResult<Computer>> builderOfficePC()
    {
        var builder = new ComputerBuilder();
        var director = new ComputerDirector(builder);
        var computer = director.ConstructOfficePC();

        await _mongoService.CreateAsync(computer);

        return Ok(computer);
    }

    // supprimer un pc par id
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComputer(string id)
    {
        var computer = await _mongoService.GetByIdAsync(id);
        if (computer == null)
        {
            return NotFound(new { message = "le pc que vous essayez de supprimer n'existe pas" });
        }

        await _mongoService.DeleteAsync(id);
        return Ok(new {message = " pc supprime"}); //renvoie un code de statut 204 (No Content) pour indiquer que la suppression a reussi
    }   
}
