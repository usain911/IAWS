using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class NutzerAufgaben
    {
        public int Id { get; set; }
        public int? NutzerId { get; set; }
        public int? AufgabenId { get; set; }
        public int? TeilaufgabenId { get; set; }
    }
}
