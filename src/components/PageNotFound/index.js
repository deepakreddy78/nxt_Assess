import './index.css'
import pageNotFound from '../imgs/pageNotFound.svg'

const NotFound = () => (
  <div className="not-found-container">
    <img src={pageNotFound} alt="not-found" className="not-found-img" />
    <h1 className="pnf-heading">Page Not Found</h1>
    <p className="pnf-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
