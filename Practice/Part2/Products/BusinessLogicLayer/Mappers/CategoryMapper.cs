using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BusinessLogicLayer.Mappers
{
    public class CategoryMapper
    {
        public static BusinessObjects.Category To_BO(DataAccessLayer.Category categoryDAO)
        {
            BusinessObjects.Category categoryBO = new BusinessObjects.Category();

            categoryBO.ID = categoryDAO.ID;
            categoryBO.Name = categoryDAO.Name;

            return categoryBO;
        }

        public static DataAccessLayer.Category To_DAO(BusinessObjects.Category categoryBO)
        {
            DataAccessLayer.Category categoryDAO = new DataAccessLayer.Category();

            categoryDAO.ID = categoryBO.ID;
            categoryDAO.Name = categoryBO.Name;

            return categoryDAO;
        }
    }
}