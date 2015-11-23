using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ProductRepository : IProductRepository
    {
        private ProductsEntities _dbContext;
        public IEnumerable<Product> Get()
        {
            using (_dbContext = new ProductsEntities())
            {
                IEnumerable<Product> products = _dbContext.Products.Include("Category").ToList();
                return products;
            }
        }

        public Product Get(int ID)
        {
            using (_dbContext = new ProductsEntities())
            {
                Product product = _dbContext.Products.Include("Category").FirstOrDefault(p => p.ID == ID);
                return product;
            }
        }

        public int Create(Product product)
        {
            using (_dbContext = new ProductsEntities())
            {
                _dbContext.Products.Add(product);
                var result = _dbContext.SaveChanges();

                return (result > 0) ? product.ID : -1;
            }
        }

        public int Update(Product product)
        {
            Product dbProduct;
            var result = -1;
            using (_dbContext = new ProductsEntities())
            {
                dbProduct = _dbContext.Products.FirstOrDefault(p => p.ID == product.ID);
            }
            if (dbProduct != null)
            {
                MapProduct(dbProduct, product);
                using (_dbContext = new ProductsEntities())
                {
                    _dbContext.Entry(product).State = System.Data.Entity.EntityState.Modified;
                    result = _dbContext.SaveChanges();
                }
            }
            return result;
        }

        public int Delete(int ID)
        {
            using (_dbContext = new ProductsEntities())
            {
                var product = _dbContext.Products.FirstOrDefault(p => p.ID == ID);
                _dbContext.Products.Remove(product);

                var result = _dbContext.SaveChanges();
                return result;
            }
        }

        private void MapProduct(Product productToMap, Product productMapper)
        {
            productToMap.Name = productMapper.Name;
            productToMap.Description = productMapper.Description;
            productToMap.CategoryID = productMapper.CategoryID;
            productToMap.Price = productMapper.Price;
            productToMap.Stock = productMapper.Stock;
            productToMap.EntryDate = productMapper.EntryDate;
            productToMap.ExpirationDate = productMapper.ExpirationDate;
        }
    }
}
