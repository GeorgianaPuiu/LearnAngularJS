using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class CategoryRepository : ICategoryRepository
    {
        private ProductsEntities _dbContext;
        public IEnumerable<Category> Get()
        {
            using (_dbContext = new ProductsEntities())
            {
                IEnumerable<Category> categories = _dbContext.Categories.ToList();
                return categories;
            }
        }

        public Category Get(int ID)
        {
            using (_dbContext = new ProductsEntities())
            {
                Category category = _dbContext.Categories.FirstOrDefault(p => p.ID == ID);
                return category;
            }
        }

        public int Create(Category category)
        {
            using (_dbContext = new ProductsEntities())
            {
                _dbContext.Categories.Add(category);
                var result = _dbContext.SaveChanges();

                return (result > 0) ? category.ID : -1;
            }
        }

        public int Update(Category category)
        {
            Category dbCategory;
            var result = -1;
            using (_dbContext = new ProductsEntities())
            {
                dbCategory = _dbContext.Categories.FirstOrDefault(p => p.ID == category.ID);
            }
            if (dbCategory != null)
            {
                MapCategory(dbCategory, category);
                using (_dbContext = new ProductsEntities())
                {
                    _dbContext.Entry(category).State = System.Data.Entity.EntityState.Modified;
                    result = _dbContext.SaveChanges();
                }
            }
            return result;
        }

        public int Delete(int ID)
        {
            using (_dbContext = new ProductsEntities())
            {
                var category = _dbContext.Categories.FirstOrDefault(p => p.ID == ID);
                _dbContext.Categories.Remove(category);

                var result = _dbContext.SaveChanges();
                return result;
            }
        }

        private void MapCategory(Category CategoryToMap, Category CategoryMapper)
        {
            CategoryToMap.Name = CategoryMapper.Name;
        }
    }
}
