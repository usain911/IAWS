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
        public int? ProjektId { get; set; }

        public virtual Aufgaben Aufgaben { get; set; }
        public virtual Nutzer Nutzer { get; set; }
        public virtual Projekte Projekt { get; set; }
        public virtual Teilaufgaben Teilaufgaben { get; set; }
    }
}