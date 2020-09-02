import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Pagination from 'react-js-pagination';
import UserForm from '../components/UserForm';
import Gravatar from 'react-awesome-gravatar';

$('.sponsor').hide();

export default function Users(props) {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [images, setShowImages] = useState(false);
	const [nombres, setNombres] = useState('');
	const [apellidos, setApellidos] = useState('');
	const [email, setEmail] = useState('');
	const [empresa, setEmpresa] = useState('');
	const [id_title, setId_title] = useState('');
	const [id_ciudad, setId_ciudad] = useState('');
	const [profesiones, setProfesiones] = useState([]);
	const [ciudades, setCiudades] = useState([]);
	const [grupos, setGrupos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [show, setShow] = useState(true);
	const [data, setData] = useState({});
	const [first_name, setFirst_name] = useState('');
	const [title, setTitle] = useState('');
	const [activePage, setActivePage] = useState(1);
	const [itemsCountPerPage, setItemsCountPerPage] = useState(1);
	const [totalItemsCount, setTotalItemsCount] = useState(1);
	const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);
	const [pageNumber, setPageNumber] = useState(1);
	const [loggedUser, setLoggedUser] = useState(props.data);
	const [urlApi, setUrlApi] = useState(($('#urlApi').text()).trim());
	$('.indexSponsor').css('display', 'none');
	$(".navbar-collapse").collapse('hide');
	let searchStr = '';
	let userType = '';
	//const [role, setRole] = useState(props.data.role);
	$('.redTitle').hide();
	$('.home-block').hide();
	//$('#miembros').prop('checked', true);
	console.log('papitoUUUUUU');
	console.log(props);
	//console.log(props.data);
	//console.log(props.data[0]);
	console.log('papitoUUUUUU');
	// const intialValues = {
	//   nombres: 'bill',
	//};
	//const [state, update] = useState(intialValues.nombres);
	/* const onSubmit = (data) => {
        //console.log(data);
        const result = axios.post('http://www.localhost/avatar/api/saveUser', { data });
        //console.log(result);
        if(result == 'success'){
            getUsers();
        }
	} */
	const getUsersType = () => {
		//let searchStr = $('#search').val();
		//console.log("INSIDE GET USER TYPE")
		userType = $("input[name='usuarios']:checked").val();
		//console.log(userType);
		////console.log($(":radio[name='usuarios']").val())
		////console.log($("#usertype").val())
		//	if (searchStr.length > 3) {
		////console.log(searchStr);
		//console.log('COORDINADOR');
		handlePageChange(1, searchStr, userType);
		//}
	};
	function getUsers() {
		//console.log($(":radio[name='usuarios']").val());
		useEffect(() => {
			//let mounted = true;
			// if (mounted) {
			const fetchData = async () => {
				setLoading(true);

				const result = await axios.get(urlApi + '/api/getUsers', {
					params: {
						page: pageNumber,
						searchStr: '',
						id_grupo: loggedUser.id_grupo,
						role: loggedUser.role,
						userType: userType,
					},
				});

				setUsers(result.data.data);
				setItemsCountPerPage(result.data.per_page);
				setTotalItemsCount(result.data.total);
				setActivePage(result.data.current_page);
				setLoading(false);
				//console.log('GET USERS');
				//console.log(result.data);
				////console.log(result);
				//console.log('GET USERS');
			};

			fetchData();
			//return () => mounted = false;
			// }
		}, []);
	}
	getUsers();
	//console.log(show);

	const handlePageChange = (pageNumber, searchStr, userType) => {
		//console.log(searchStr);
		//console.log('active page is' + pageNumber);
		//if(searchStr.length > 2){
		setActivePage(pageNumber);
		axios
			.get(urlApi + '/api/getUsers', {
				params: {
					page: pageNumber,
					searchStr: searchStr,
					id_grupo: loggedUser.id_grupo,
					role: loggedUser.role,
					userType: userType,
				},
			})
			.then((response) => {
				setUsers(response.data.data);
				setItemsCountPerPage(response.data.per_page);
				setTotalItemsCount(response.data.total);
				setActivePage(response.data.current_page);
				setLoading(false);
				//console.log('searching based string');
				//console.log(response.data);
				//console.log('searching based string');
				setShow(true);
			});
		//}
	};
	const searchUsers = () => {
		searchStr = $('#search').val();
		//	if (searchStr.length > 3) {
		//console.log(searchStr);
		handlePageChange(1, searchStr);
		//}
	};
	/*const usuariosTypeChange = () => {
		//let searchStr = $('#search').val();
		//	if (searchStr.length > 3) {
		//console.log("USUARIOS TIPO CHANGE");
		//handlePageChange(1, searchStr);
		//}
	}; */
	//the following is to show hide userform and user listing

	const showUsers = (stat) => {
		//     setShowMsg(true);
		//  setMsg('Registro completado');
		//console.log(stat);
		//setShow(stat);
		//console.log('lucilaboem');
		//console.log(stat);
		//setShow(stat);
		//console.log(show);
		handlePageChange(1, '');
	};
	const addUser = (dat) => {
		setShow(false);
		//console.log('adding user user');
		//console.log(dat);
		//console.log('adding user');
		dat.first_name ? setTitle('Editar Usuario') : setTitle('Nuevo Usuario');

		if (dat) {
			if (dat.first_name !== '') setShow(false);
			//console.log(dat);
			setData(dat);
		}
	};
	const deleteUser = (data) => {
		//console.log('deleting user');
		//console.log(data);
		//console.log(props.role);
		//console.log(props.id_grupo);
		//console.log(loggedUser);
		//console.log('deleting user');
		axios.get(urlApi + '/api/deleteUser', { params: { id: data } }).then((response) => {
			//console.log('9090909090990');
			//console.log(response.data);
			//console.log('12121212121');
			handlePageChange(1, '');
		});
	};
	const cancelar = () => {
		setTitle('');
		setShow(true);
	};
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(urlApi + '/api/getCiudades');
			setCiudades(result.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(urlApi + '/api/getTitles');
			setProfesiones(result.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);
	if (loading) {
		<h2>Loading...</h2>;
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-7">
					<div className="row dashRad">
						<div className="col-md-6">
							<input
								type="radio"
								name="usuarios"
								id="miembros"
								value="Miembros"
								onChange={getUsersType}
							/>
							<FormLabel className="mt-4">Miembros</FormLabel>
						</div>
						<div className="col-md-6">
							<input
								type="radio"
								name="usuarios"
								id="coordinadores"
								value="Coordinadores"
								onChange={getUsersType}
							/>
							<FormLabel className="mt-4">Coordinadores</FormLabel>
						</div>
					</div>
				</div>
				{title == 'Nuevo Usuario' && (
					<div className="col-md-2">
						<p className="text-primary mb-3"> {title}</p>
					</div>
				)}
				{title == 'Editar Usuario' && (
					<div className="col-md-2">
						<p className="text-primary mb-3"> {title}</p>
					</div>
				)}
				{title == '' && (
					<div className="col-md-2">
						<button className="btn btn-link text-primary" onClick={addUser}>
							<i className="fa fa-plus" title="Agregar Usuario" style={{ fontSize: '2rem' }}></i>
						</button>
					</div>
				)}
				{title == '' && (
					<div className="col-md-2 emailIcon">
						<a onClick={() => emailUser(users, 'todos')}>
							<img
								className="iconTable cursorPointer"
								src={urlApi + '/public/images/email2.png'}
								title="email a todos los usuarios"
							/>
						</a>
					</div>
				)}
				{(title == 'Nuevo Usuario' || title == 'Editar Usuario') && (
					<div className="col-md-2">
						<button onClick={cancelar}>Cancelar</button>
					</div>
				)}
			</div>
			<div className="row">
				{title !== 'Nuevo Usuario' && title !== 'Editar Usuario' && (
					<div className=" col-md-12 p-1 bg-light rounded rounded-pill shadow-sm mb-2">
						<div className="input-group">
							<input
								type="search"
								onChange={searchUsers}
								id="search"
								placeholder="Buscar"
								aria-describedby="button-addon1"
								className="form-control border-0 bg-light"
							/>
							<div className="input-group-append">
								<button id="button-addon1" className="btn btn-link text-primary">
									<i className="fa fa-search"></i>
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			{!show && <UserForm data={data} showUsers={showUsers} logged={loggedUser} />}
			{show && (
				<div className="row">
					<table className="table table-striped tableProd2">
						<thead className="tableHeadArt">
							<tr>
								<th>Email</th>
								<th>Nombre</th>
								<th>Apellido</th>
								<th>Ciudad</th>
								<th>Rol</th>
								<th></th>
								{title == '' &&
									props &&
									(props.data.role == 'superusuario' || props.data.role == 'admin') && <th></th>}
								{title == '' &&
									props &&
									(props.data.role == 'superusuario' || props.data.role == 'admin') && <th></th>}
							</tr>
						</thead>
						<tbody className="bodyArt">
							{users.map((user) => (
								<tr key={user.id}>
									<td className="emailDash"> {user.email} </td>
									<td> {user.first_name} </td>
									<td> {user.last_name} </td>
									<td> {user.ciudad} </td>
									<td> {user.role} </td>
									<td>
										<img
											className="userImg"
											src={user.foto && urlApi + '/docs/fotosUsuarios/' + user.foto}
										/>
									</td>
									{title == '' &&
										props &&
										(props.data.role == 'superusuario' || props.data.role == 'admin' || props.data.role == 'coordinador') && (
											<td colSpan="2" className="capitalize authorArt cursorPointer">
												<div className="divIcon">
													<a
														onClick={() => {
															addUser(user);
														}}
													>
														<img
															className="iconTable cursorPointer"
															src={urlApi + '/public/images/edit.jpg'}
															title="edit"
														/>
													</a>
												</div>
												<div className="divIcon">
													<a onClick={() => deleteUser(user.id)}>
														<img
															className="iconTable cursorPointer"
															src={urlApi + '/public/images/delete.png'}
															title="delete"
														/>
													</a>
												</div>
												<div className="divIcon">
													<a onClick={() => deleteUser(user.id)}>
														<img
															className="iconTable cursorPointer"
															src={urlApi + '/public/images/email1.jpg'}
															title="email a este usuario"
														/>
													</a>
												</div>
											</td>
										)}
								</tr>
							))}
						</tbody>
					</table>
					<div className="d-flex justify-content-center">
						<Pagination
							activePage={activePage}
							itemsCountPerPage={itemsCountPerPage}
							totalItemsCount={totalItemsCount}
							pageRangeDisplayed={pageRangeDisplayed}
							onChange={handlePageChange}
							itemClass='"page-item'
							linkClass="page-link"
						/>
					</div>
				</div>
			)}
		</div>
	);
}
