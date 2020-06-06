using System;
using System.Collections.Generic;

namespace DataBaseAPI.Models
{
    public partial class Nutzer
    {
        public int NutzerId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Passwort { get; set; }
        public bool? IsAdmin { get; set; }
        public string Team { get; set; }
    }
}
