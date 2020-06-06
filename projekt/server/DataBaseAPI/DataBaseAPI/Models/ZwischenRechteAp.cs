using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class ZwischenRechteAp
    {
        public int ZwischenRechteId { get; set; }
        public bool? LeseZugriffAufgaben { get; set; }
        public bool? SchreibZugriffAufgaben { get; set; }
        public bool? VerwaltungZugriffAufgaben { get; set; }
        public bool? LeseZugriffProjekt { get; set; }
        public bool? SchreibZugriffProjekt { get; set; }
        public bool? VerwaltungsZugriffProjekt { get; set; }
    }
}
