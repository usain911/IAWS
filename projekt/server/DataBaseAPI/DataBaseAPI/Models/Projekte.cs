using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class Projekte
    {
        public Projekte()
        {
            Aufgaben = new HashSet<Aufgaben>();
            NutzerAufgaben = new HashSet<NutzerAufgaben>();
            NutzerProjekte = new HashSet<NutzerProjekte>();
        }

        public int ProjektId { get; set; }
        public string Name { get; set; }
        public string Bezeichnung { get; set; }
        public int? ProjektOwnerId { get; set; }
        public int? Erledigt { get; set; }

        public virtual ICollection<Aufgaben> Aufgaben { get; set; }
        public virtual ICollection<NutzerAufgaben> NutzerAufgaben { get; set; }
        public virtual ICollection<NutzerProjekte> NutzerProjekte { get; set; }
    }
}
