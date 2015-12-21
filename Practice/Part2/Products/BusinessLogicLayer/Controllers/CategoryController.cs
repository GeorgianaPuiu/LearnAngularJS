using BusinessLogicLayer.Mappers;
using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BusinessLogicLayer.Controllers
{
    [RoutePrefix("api/categories")]
    [EnableCors(origins: "http://localhost:8082", headers: "*", methods: "*")]

    public class CategoryController : ApiController
    {
        private ICategoryRepository _categoryRepository;

        public CategoryController()
        {
            _categoryRepository = new CategoryRepository(); //no DI
        }

        //Post
        [Route("")]
        public IHttpActionResult CreateCategory(BusinessObjects.Category categoryBO)
        {
            Category categoryDAO = CategoryMapper.To_DAO(categoryBO);
            int newID = _categoryRepository.Create(categoryDAO);

            if (newID > 0)
            {
                return Ok();
            }
            return InternalServerError();
        }

        [Route("{ID:int}")]
        public IHttpActionResult GetCategory(int ID)
        {
            Category categoryDAO = _categoryRepository.Get(ID);
            if (categoryDAO != null)
            {
                BusinessObjects.Category categoryBO = CategoryMapper.To_BO(categoryDAO);
                return Ok(categoryBO);
            }
            return NotFound();
        }

        [Route("")]
        public IHttpActionResult GetCategories()
        {
            IEnumerable<Category> categoryDAOs = _categoryRepository.Get();
            if (categoryDAOs != null)
            {
                ICollection<BusinessObjects.Category> categoryBOs = new List<BusinessObjects.Category>();

                foreach (var categoryDAO in categoryDAOs)
                {
                    var categoryBO = CategoryMapper.To_BO(categoryDAO);
                    categoryBOs.Add(categoryBO);
                }
                return Ok(categoryBOs);
            }
            return NotFound();
        }
    }

}
