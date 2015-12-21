using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusinessLogicLayer.Mappers
{
    public class ProductMapper
    {
        public static BusinessObjects.Product To_BO(DataAccessLayer.Product productDAO)
        {
            BusinessObjects.Product productBO = new BusinessObjects.Product();

            productBO.ID = productDAO.ID;
            productBO.Name = productDAO.Name;
            productBO.Description = productDAO.Description;
            productBO.Price = productDAO.Price;
            productBO.Stock = productDAO.Stock;
            productBO.CategoryID = productDAO.CategoryID;
            productBO.EntryDate = productDAO.EntryDate;
            productBO.ExpirationDate = productDAO.ExpirationDate;

            if(productDAO.Category != null)
            {
                productBO.Category = CategoryMapper.To_BO(productDAO.Category);
            }
            return productBO;
        }

        public static DataAccessLayer.Product To_DAO(BusinessObjects.Product productBO)
        {
            DataAccessLayer.Product productDAO = new DataAccessLayer.Product();

            productDAO.ID = productBO.ID;
            productDAO.Name = productBO.Name;
            productDAO.Description = productBO.Description;
            productDAO.Price = productBO.Price;
            productDAO.Stock = productBO.Stock;
            productDAO.CategoryID = productBO.CategoryID;
            productDAO.EntryDate = productBO.EntryDate;
            productDAO.ExpirationDate = productBO.ExpirationDate;

            if (productBO.Category != null)
            {
                productDAO.Category = CategoryMapper.To_DAO(productBO.Category);
            }

            return productDAO;
        }
    }
}