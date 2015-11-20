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
    [RoutePrefix("api/products")]
    [EnableCors(origins: "http://localhost:8082", headers: "*", methods: "*")]
    public class ProductController : ApiController
    {
        private IProductRepository _productRepository;

        public ProductController()
        {
            _productRepository = new ProductRepository(); //no DI
        }

        //Post
        [Route("")]
        public IHttpActionResult CreateProduct(BusinessObjects.Product productBO)
        {
            Product productDAO = ProductMapper.To_DAO(productBO);
            int newID = _productRepository.Create(productDAO);

            if (newID > 0)
            {
                return Ok();
            }
            else
            {
                return InternalServerError();
            }
        }

        [Route("{ID:int}")]
        public IHttpActionResult GetProduct(int ID)
        {
            Product productDAO = _productRepository.Get(ID);
         
            if (productDAO != null)
            {
                BusinessObjects.Product productBO = ProductMapper.To_BO(productDAO);
                return Ok(productBO);
            }
            return NotFound();
        }

        [Route("")]
        public IHttpActionResult GetProducts()
        {
            IEnumerable<Product> productDAOs = _productRepository.Get();

            if (productDAOs != null)
            {
                ICollection<BusinessObjects.Product> productBOs = new List<BusinessObjects.Product>();

                foreach (var productDAO in productDAOs)
                {
                    var productBO = ProductMapper.To_BO(productDAO);
                    productBOs.Add(productBO);
                }
                return Ok(productBOs);
            }
            return NotFound();
        }

        //put
        [HttpPut]
        [Route("update")]
        public IHttpActionResult UpdateProduct(BusinessObjects.Product productBO)
        {
            Product productDAO = ProductMapper.To_DAO(productBO);
            int result = _productRepository.Update(productDAO);
            if (result > 0)
            {
                return Ok();
            }
            else
            {
                return InternalServerError();
            }
        }

        [HttpDelete]
        [Route("{ID:int}")]
        public IHttpActionResult DeleteProduct(int ID)
        {
            int result = _productRepository.Delete(ID);

            if (result > 0)
            {
                return Ok();
            }
            else
            {
                return InternalServerError();
            }
        }
    }
}
