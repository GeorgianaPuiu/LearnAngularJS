using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
   public interface IRepository<T>
    {
       int Create(T item);
       T Get(int ID);
       IEnumerable<T> Get();
       int Update(T item);
       int Delete(int ID);
    }
}
