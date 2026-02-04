using backend.Models;
namespace backend.Builders
{
    // le director contient des recettes de construction predefinies
    public class ComputerDirector
    {
        private readonly IComputerBuilder _builder;

        // le constructeur du director prend un builder en parametre
        public ComputerDirector(IComputerBuilder builder)
        {
            _builder = builder;
        }

        // methode pour construire un pc gaming
        public Computer ConstructGamingPC()
        {
            return _builder
                .SetCPU("Intel Core i9-13900K")
                .SetGPU("NVIDIA GeForce RTX 4090")
                .SetRAM(32)
                .SetStorage(2000, "NVMe SSD")
                .SetOperatingSystem("Windows 11 Pro")
                .SetWifi()
                .SetBluetooth()
                .SetPrice(3499)
                .Build();
        }
        // methode pour construire un pc de devloppeur
        public Computer ConstructDeveloperPC()
        {
            return _builder
                .SetCPU("AMD Ryzen 9 7950X")
                .SetGPU("NVIDIA GeForce RTX 4070")
                .SetRAM(32)
                .SetStorage(1000, "NVMe SSD")
                .SetOperatingSystem("Ubuntu 22.04 LTS")
                .SetWifi()
                .SetBluetooth()
                .SetPrice(2499)
                .Build();
        }
        // methode pour construire un pc bureautique
        public Computer ConstructOfficePC()
        {
            return _builder
                .SetCPU("Intel Core i5-13400")
                .SetGPU("Integrated Graphics")
                .SetRAM(16)
                .SetStorage(512, "SATA SSD")
                .SetOperatingSystem("Windows 11 Home")
                .SetWifi()
                .SetBluetooth()
                .SetPrice(999)
                .Build();
        }
    }
}