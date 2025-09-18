
import React ,{useState, useEffect} from 'react'
import { getCategories, getProduct } from './api';

export default function ProductPage () {
     const [Categories, setCategories] = useState([]);
     const [product, setProduct] = useState([])

     useEffect(() => {
       fetchCategories();
       fetchProducts();
     }, [])
     

     const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("failed to fetch the categories", err); 
        }
     }

     const fetchProducts = async () => {
        try {
            const data = await getProduct();
            setProduct(data)
        } catch (error) {
            console.error("failed to fetch the products, error");   
        }
     }

    return (
        <>
      
        <div>
            <main>
        <div className="container-fluid py-2">

    {/* Category table starts here */}
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Categories</h6>
              </div>
            </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">CATEGORY</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">DESCRIPTION</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">SELECT</th>
                      <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Categories.map((c) => (
                        <tr key={c.id}>
                      <td>
                    
                        <div className="d-flex px-2 py-1">
                          <div>
                            <img src={"../assets/img/products_image.jpg"} className="avatar avatar-sm me-3 border-radius-lg" alt="user1"></img>
                          </div>
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{c.name}</h6>
                             <p className="text-xs text-secondary mb-0">{c.description || "Root"}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-xs font-weight-bold mb-0">{c.description}</p>
                        <p className="text-xs text-secondary mb-0">{c.Category_description}</p>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <span className="badge badge-sm bg-gradient-success">View products</span>
                      </td>
                
                      <td className="align-middle">
                        <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                        AVAILABLE
                        </a>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* product table starts here  */}
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Products</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">    
                <table className="table align-items-center justify-content-center mb-0">
                  <thead>
                    <tr>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">PRODUCT</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">PRICE</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">DESCRIPTION</th>
                      <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Discount Available</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((p) => {
                        const categoryName = Categories.find((c) => c.id === p.category_id)?.name || "No category";
                   return (
                    <tr key={p.id}>
                      <td>
                        <div className="d-flex px-2">
                          <div>
                            <img src={"../assets/img/small-logos/logo-asana.svg"} className="avatar avatar-sm rounded-circle me-2" alt="spotify"></img>
                          </div>
                          <div className="my-auto">
                            <h6 className="mb-0 text-sm">{p.name}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-sm font-weight-bold mb-0">{p.price}</p>
                      </td>
                      <td>
                        <span className="text-xs font-weight-bold">{p.description}</span>
                      </td>
                      <td className="align-middle text-center">
                        <div className="d-flex align-items-center justify-content-center">
                          <span className="me-2 text-xs font-weight-bold">60% OFF</span>
                          <div>
                            <div className="progress">
                              <div className="progress-bar bg-gradient-info" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: "60%"}}>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        <button className="btn btn-link text-secondary mb-0">
                          <i className="fa fa-ellipsis-v text-xs"></i>
                        </button>
                      </td>
                    </tr>
                   );
                     })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer py-4  ">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-6 mb-lg-0 mb-4">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                © <script>
                  document.write(new Date().getFullYear())
                </script>,
                made with <i className="fa fa-heart"></i> by
                <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">  fashion by RS  </a>
                for a better web.
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com" className="nav-link text-muted" target="_blank">fashion by RS</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" className="nav-link text-muted" target="_blank">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/blog" className="nav-link text-muted" target="_blank">Blog</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">License</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </div>
</>

)
}  