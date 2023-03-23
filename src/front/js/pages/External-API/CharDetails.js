import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';

const CharDetails = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    useEffect(() => {
        actions.getPerson(params.id)
    },[]);

  return (
	<div>
    <div className="jumbotron ">

			<div className="card" style={{ maxWidth: "60%", margin: "auto", background: "#282727"}}>
				<div className="row g-0">
					<div className="col-md-3">
						<img src={"https://starwars-visualguide.com/assets/img/characters/"+ params.id + ".jpg"} className="img-fluid rounded-start" alt="..." />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h2 className="card-title text-light"></h2>
							<p className="textCard card-text text-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus lobortis mi ut tempor. Curabitur ultrices dapibus nisl. Sed dictum tempor ligula, eget varius enim dignissim eu. Maecenas ut sapien sagittis odio elementum eleifend convallis sollicitudin erat. Praesent finibus ligula turpis, ac placerat enim euismod ut. Maecenas laoreet dolor leo, ut ultricies ex ultricies vel.</p>
							<p className="card-text text-light"><small className="text-muted">Last updated 3 mins ago</small></p>
							<h5>Name</h5><h5>name</h5>
						</div>
					</div>
				</div>

				<div className="singleViewDetails container text-center">
					<div className="row row-cols-6">
						<div className="spacer col text-light"><h5>Name</h5><h5>{store.person.name}</h5></div>
						<div className="spacer col text-light"><h5>Birth Year</h5><h5>{store.person.birth_year}</h5></div>
						<div className="spacer col text-light"><h5>Gender</h5><h5>{store.person.gender}</h5></div>
						<div className="spacer col text-light"><h5>Height</h5><h5>{store.person.height}</h5></div>
						<div className="spacer col text-light"><h5>Skin Color</h5><h5>{store.person.skin_color}</h5></div>
						<div className="onlyUp col text-light"><h5>Eye color</h5><h5>{store.person.eye_color}</h5></div>
					</div>
				</div>
			</div>
			
		</div>
		</div>
  )
}

export default CharDetails;