using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusinessLogicLayer.BusinessObjects
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Stock { get; set; }
        public System.DateTime EntryDate { get; set; }
        public System.DateTime ExpirationDate { get; set; }
        public int CategoryID { get; set; }

        public Category Category { get; set; }
    }
}