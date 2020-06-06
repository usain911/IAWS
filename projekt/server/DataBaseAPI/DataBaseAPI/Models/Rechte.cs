using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class Rechte
    {
        public int RechteId { get; set; }
        public bool? LeseZugriff { get; set; }
        public bool? SchreibZugriff { get; set; }
        public bool? VerwaltungsZugriff { get; set; }
        public bool? Ownership { get; set; }
    }
}
