using backend.Models;
namespace backend.Builders
{
    public class ComputerBuilder : IComputerBuilder
    {
        //l'objet computer en cours de construction
        private Computer _computer = new Computer();

        //methodoe pour definir le cpu 
        public IComputerBuilder SetCPU(string cpu)
        {
            _computer.CPU = cpu;
            return this;
        }
        public IComputerBuilder SetGPU(string gpu)
        {
            _computer.GPU = gpu;
            return this;
        }
        public IComputerBuilder SetRAM(int ram)
        {
            _computer.RAM = ram;
            return this;
        }
        public IComputerBuilder SetStorage(int sizeGB, string type)
        {
            _computer.Storage = sizeGB;
            _computer.StorageType = type;
            return this;
        }       
        public IComputerBuilder SetOperatingSystem(string os)
        {
            _computer.OperatingSystem = os;
            return this;
        }
        public IComputerBuilder SetWifi()
        {
            _computer.HasWifi = true;
            return this;
        }
        public IComputerBuilder SetBluetooth()
        {
            _computer.HasBluetooth = true;
            return this;
        }
        public IComputerBuilder SetPrice(decimal price)
        {
            _computer.Price = price;
            return this;
        }
        public Computer Build()
        {
            return _computer;
        }
        



    }
}