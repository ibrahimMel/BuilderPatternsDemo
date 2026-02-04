namespace backend.Models
{
    public class Computer
    {
        public string Id{ get; set; } = string.Empty; //string.Empty met explicitement une chaine vide 
        public string CPU { get; set; } = string.Empty;
        public string GPU { get; set; } = string.Empty;
        public int RAM { get; set; }
        public int Storage { get; set; }
        public string StorageType { get; set; } = string.Empty;
        public string OperatingSystem { get; set; } = string.Empty; 
        public bool HasWifi { get; set; }
        public bool HasBluetooth { get; set; }
        public decimal Price { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}