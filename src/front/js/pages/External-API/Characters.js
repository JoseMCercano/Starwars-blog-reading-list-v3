import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

const Characters = (i) => {
  const { store, actions } = useContext(Context);

  // const [isFavorite, setIsFavorite] = useState(i.favorite);
  // const favIcon = isFavorite ? "fas fa-heart" : "far fa-heart";

  // const handleAddToFavorites = () => {
  //   if (isFavorite) {
  //     actions.removeFromFavorites(i);
  //     setIsFavorite(false);
  //   } else {
  //     actions.addToFavorites(
  //       i.uid,
  //       "/characters/" + i.uid,
  //       i.name,
  //       i.type,
  //       i.index
  //     );
  //     setIsFavorite(true);
  //   }
  // };

  // let favIcon = "";
  // let buttonVar = "";

  return (
    <div>
      <div className="container">
        <h1 className="text-light">Characters</h1>
        <div className="row row-cols-5 g-3 justify-content-center">
          {store.people.map((i) => {
            // if (i.favorite == false) {
            //   favIcon = "far fa-heart";
            // } else {
            //   favIcon = "fas fa-heart";
            // }

            return (
              <div key={i.index} className="m-3 col-12 col-md-5 col-xl-2">
                <div className="card text-light border-light">
                  <img
                    src={
                      "https://starwars-visualguide.com/assets/img/characters/" +
                      i.uid +
                      ".jpg"
                    }
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{i.name}</h5>
                    <div className="d-flex justify-content-between">
                      <Link to={"/characters/" + i.uid}>
                        <button className="btn btn-outline-light">
                          Learn More
                        </button>
                      </Link>
                      {store.auth ? (
                        // <button
                        //         className="btn btn-warning"
                        //           onClick={() =>
                        //             actions.addToFavorites(
                        //               i.uid,
                        //               "/characters/" + i.uid,
                        //               i.name,
                        //               i.type,
                        //               i.index
                        //           )}
                        //     >
                        //       <i className={favIcon} />
                        //     </button>

                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            actions.addToFavorites(
                              i.uid,
                              "/characters/" + i.uid,
                              i.name,
                              i.type,
                              i.index
                            );
                          }}
                        >
                          <i
                            className={
                              store.favorites.some((f) => f.uid === i.uid)
                                ? "fas fa-heart"
                                : "far fa-heart"
                            }
                          />
                        </button>
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="col-md-12 d-flex justify-content-between">
            <button
              className="btn btn-dark"
              onClick={() => actions.getPeople(store.previous)}
            >
              Previous
            </button>
            <button
              className="btn btn-dark"
              onClick={() => actions.getPeople(store.next)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
