using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class NutzerProjekte
    {
        public int Id { get; set; }
        public int? NutzerId { get; set; }
        public int? ProjektId { get; set; }
        public bool? ProjektOwner { get; set; }

        public virtual Projekte Projekt { get; set; }
    }
}
