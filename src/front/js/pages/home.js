import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import logoANDA from "../../img/logo-ANDA.png";
import manos from "../../img/manos.png";

import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div style={{ marginBottom: '1rem' }}>
				<img src={logoANDA} alt="Bootstrap" width="100rem" height="auto" />
			</div>
			<nav className="navbar"  style={{ backgroundColor: '#eef2ff', height: '3rem' }}>
				<div className="container">
					<a className="navbar-brand" href="#"></a>
				</div>
			</nav>

			<div className="container col-xxl-8 px-4 py-5">
				<div className="row flex-lg-row-reverse align-items-center g-5 py-5">
					<div className="col-10 col-sm-8 col-lg-6 d-flex justify-content-end">
						<img src={manos} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
					</div>
					<div className="col-lg-6">
						<h1 className="display-1 fw-bold  lh-1 mb-3" style={{ color: '#3865e5' }}>Club de funcionarios</h1>
						<p className="lead fw-bold" style={{ fontSize: '1.5rem' }} >¡Disfruta de los beneficios pensados para ti!</p>
						<div className="d-grid gap-2 d-md-flex justify-content-md-start" style={{ marginTop: '5rem' }}>
							<button type="button" className=" btn btn-lg px-4 me-md-2"
								style={{ backgroundColor: '#3865e5', borderColor: '#3865e5', color: '#fff' }}>Acceder</button>
							<button
								type="button"
								className="btn btn-lg me-md-2"
								style={{ backgroundColor: '#fff', borderColor: '#3865e5', color: '#3865e5' }}
							>
								<Link to='/About'>Mas informacion</Link>
							</button>
						</div>
					</div>
				</div>
			</div>


		</div>
	);
};
