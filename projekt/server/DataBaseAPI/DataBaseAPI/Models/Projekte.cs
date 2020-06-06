using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class Projekte
    {
        public int ProjektId { get; set; }
        public string Name { get; set; }
        public string Bezeichnung { get; set; }
        public int? ProjektOwnerId { get; set; }
    }
}
