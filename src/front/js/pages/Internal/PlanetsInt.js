import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';

const PlanetsInt = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();

  useEffect(() => {
    actions.getPlanetsInt(params.id);
  },[]);

  return (
    <div>
     
      <div className="container">
        <h1>Planets Internal</h1>
        <div className="row row-cols-5 g-3 justify-content-center">
          {store.planet.map((item) => (
            <div key={item.id}>          
              <div className="col">
                <div className="card m-3 text-light border-light">
                  <img
                    src={
                      "https://starwars-visualguide.com/assets/img/planets/" +
                      item.id +
                      ".jpg"
                    }
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <div className="d-flex justify-content-between">
                      <Link to={"/planetsint/" + item.id}>
                        <button className="btn btn-outline-light">
                          Learn More
                        </button>
                      </Link>

                      {/* <button
                      className="btn btn-warning"
                        onClick={() =>
                          actions.addToFavorites(
                            i.uid,
                            "/planets/" + i.uid,
                            i.name,
                            i.type,
                            i.index
                        )}
                  >
                    <i className={favIcon} />
                  </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlanetsInt;