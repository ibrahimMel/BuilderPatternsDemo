using backend.Models;
namespace backend.Builders
{
    public interface IComputerBuilder
{
    IComputerBuilder SetCPU(string cpu);
    IComputerBuilder SetGPU(string gpu);
    IComputerBuilder SetRAM(int ram);
    IComputerBuilder SetStorage(int sizeGB, string Type);
    IComputerBuilder SetOperatingSystem(string os);
    IComputerBuilder SetWifi();
    IComputerBuilder SetBluetooth();
    IComputerBuilder SetPrice(decimal price);
    Computer Build(); // la methode finale qui construit l'objet Computer

    
}
}