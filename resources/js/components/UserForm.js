import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import Pagination from '../components/Pagination';
import ReactInterval from 'react-interval';
import Users from './Users';
import { withRouter } from 'react-router-dom';

export default function UserForm(props) {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showMsg, setShowMsg] = useState(false);
	const [show, setShow] = useState(true);
	const [msg, setMsg] = useState();
	const [id_title, setId_title] = useState('');
	const [id_ciudad, setId_ciudad] = useState('');
	const [grupos, setGrupos] = useState([]);
	const [profesion, setProfesion] = useState();
	const [ciudades, setCiudades] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	//const [readOnly, setReadOnly] = useState(false);
	const [showForm, setShowForm] = useState(true);
	const { register, handleSubmit, setValue, errors } = useForm();
	const [selectedFile, setSelectedFile] = useState({});
	const [image, setImage] = useState();
	const [urlApi, setUrlApi] = useState(($('#urlApi').text()).trim());
	$('.indexSponsor').css('display', 'none');
	$(".navbar-collapse").collapse('hide');
	//const [read, setRead] = useState();
	$('.home-block').hide();
	let read = false;
	let logged = ''
	let role = ''
	if (props && props.data && props.data.id) {
		setValue('id', props.data.id);
		read = true;
		logged = props.logged
		role = logged.role
	}
	if (props && props.logged && props.logged.id_grupo && props.logged.role !== 'superusuario' && props.logged.role !== 'admin') {
		setValue('id_grupo', props.logged.id_grupo);
		setValue('id_ciudad', props.logged.id_ciudad);
		read = true;
	}
	//read = true;
	console.log('FINAL FORM USER');
	console.log(props);
	console.log(logged)
	console.log('FINAL FORM USER');
	//const [selectedFile, setSelectedFile] = useState({});
	//const [usersPerPage, setUsersPerPage] = useState(2)

	//const [show, setShow] = useState(false)
	// props.showUsers(false);
	if (props.data && props.data.first_name) setValue('nombres', props.data.first_name);
	if (props.data && props.data.last_name) setValue('apellidos', props.data.last_name);
	if (props.data && props.data.email) setValue('email', props.data.email);
	//setValue('id_ciudad', data.id_ciudad);
	if (props.data && props.data.profesion) setValue('profesion', props.data.profesion);
	if (props.data && props.data.id_ciudad) setValue('id_ciudad', props.data.id_ciudad);
	if (props.data && props.data.id_grupo) setValue('id_grupo', props.data.id_grupo);

	if (props.data && props.data.empresa) setValue('empresa', props.data.empresa);
	if (props.data && props.data.password) setValue('password', props.data.password);
	if (props.data && props.data.genero) setValue('genero', props.data.genero);
	if (props.data && props.data.estado_civil) setValue('estado_civil', props.data.estado_civil);
	// props.showUsers(true)

	if (props.data && props.data.foto) {
		console.log('INSIDE IF');
		$('.image-preview__image1').prop('src', '/avatar/docs/fotosUsuarios/' + props.data.foto);
		$('.image-preview__image1').css('display', 'block');
		$('.image-preview__default-text').css('display', 'none');
	}
	const imageSelectedHandler = (event) => {
		const selectedFile = event.target.files[0];
		const file = event.target.files[0];
		//const inpFile = document.getElementById('inpFile');
		//setFlag(true);
		//setInpFile(document.getElementById('inpFile'));
		//const previewContainer = document.getElementById('imagePreview');
		const previewContainer = document.getElementById('imagePreview1');
		const previewImage = previewContainer.querySelector('.image-preview__image1');
		const previewDefaultText = previewContainer.querySelector('.image-preview__default-text');
		//console.log('NNNNNNNNNNNNNNNNNNNNNN');
		//console.log(file);
		//console.log('NNNNNNNNNNNNNNNNNNNNNN');
		if (file) {
			const reader = new FileReader();

			previewDefaultText.style.display = 'none';
			previewImage.style.display = 'block';
			reader.addEventListener('load', function () {
				//console.log('INSIDE FILE');
				//console.log(reader.result);
				//console.log('INSIDE FILE');
				previewImage.setAttribute('src', reader.result);
			});
			reader.readAsDataURL(file);
		}
		props.data.image = selectedFile;
		//atencion aquí...
		props.data.editImage = URL.createObjectURL(event.target.files[0]);

		const ext = selectedFile.name.substr(selectedFile.name.lastIndexOf('.') + 1);
		if (!(ext == 'jpg' || ext == 'gif' || ext == 'jpeg' || ext == 'png' || ext == 'bmp')) {
			setMsg('formato de imagen inválido....');
			setShowMsg(true);
		}
	};

	const backHome = () => {
		console.log("going home")
		window.location = urlApi;
	}

	//const [state, update] = useState(intialValues.nombres);
	const onSubmit = data => {
		//console.log(selectedFile);
		//const fd = new FormData();
		let jm = { email: data.email };
		let formData = new FormData();
		console.log('XXXXXXXXXXXXXXXXXXX');
		let details = JSON.stringify(data);
		console.log(data);
		console.log(details);
		console.log('MMMMMMMMMMMMMM');
		console.log('ZZZZZZZZZZZZZZZZZZZZZZ');
		formData.append('data', details);
		//formData.append('upload', fileData, fileName)
		/*if (props && props.edit.image) {
			let $editImage = props.edit.image;
			formData.append('editImage', $editImage);

		} */
		if (props.data && props.data.image)
			formData.append('image', props.data.image, props.data.image.name);

		console.log('3333333333333333333');
		//console.log(props.data.formData); undefined
		console.log('CCCCCCCCCCCCCC');
		console.log(data);
		console.log(data.email);
		console.log('DDDDDDDDDDDDDD');
		console.log('444444444444444444444');
		let mounted = true;
		setShowMsg(true);
		setMsg('Generando Id de Avatar');
		const result = axios
			.post(urlApi + '/api/saveUser', formData)
			.then(response => {
				console.log('555555555555555555');
				console.log(response.data);
				console.log('666666666666666666');
				if (mounted) {
					if (response.data == 'success') {

						setMsg('Registro completado');
						setInterval(() => {
							setShowMsg(false);
						}, 5000);
						if (props.showUsers) {
							props.showUsers(true);
							console.log("working props show users")
						}
						else {
							console.log("working history")
							backHome()
						}
					}
					if (response.data == 'existing') {
						//setShowMsg(true);
						setMsg('Email ya está registrado');
						setInterval(() => {
							setShowMsg(false);
							console.log('inside use interval')
						}, 5000);

						// setValue('nombres', data.nombres);
						$('#nombres').val(props.data.nombres);
						$('#apellidos').val(props.data.apellidos);
						$('#email').val(props.data.email);
						$('#profesion').val(props.data.profesion);
						$('#id_ciudad').val(props.data.id_ciudad);
						$('#id_grupo').val(props.data.id_grupo);
						$('#genero').val(props.data.genero);
						$('#estado_civil').val(props.data.estado_civil);
						// console.log(nombres)
						//console.log(data.first_name)
						//console.log(data)
						//console.log(data.id_ciudad)
						//console.log(data.id_profesion)
						setValue('apellidos', data.apellidos);
						setValue('email', data.email);
						setValue('id_ciudad', data.id_ciudad);
						setValue('id_grupo', data.id_grupo);
						if (data.id_profesion) setValue('id_profesion', data.id_profesion);
						if (data.empresa) setValue('empresa', data.empresa);
						if (data.password) setValue('password', data.password);
						console.log('miguel');
					}
				}
			})
			.catch(error => {
				if (mounted) {
					//console.log(error);
				}
			});

		return () => (mounted = false);
	};

	//const editUser = (jms) => {
	//console.log('xxxxxxxxxxx');
	// console.log(data.first_name);
	//console.log('uuuuuuuuuuuuu');
	//console.log({data});

	// }
	const deleteUser = data => {
		console.log(data);
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
			const result = await axios(urlApi + '/api/getGrupos', {
				params: { logged: props.logged },
			});
			setGrupos(result.data);
			console.log("CCCCCCCCCCCCCU")
			console.log(result)
			console.log(result.data)
			console.log(ciudades)
			console.log("CCCCCCCCCCCCCCCCC")
			setIsLoading(false);
		};
		fetchData();
	}, []);
	if (loading) {
		<h2>Loading...</h2>;
	}
	return (
		<div className="container integrateMt">
			{show && (
				<div className="row">
					<div className="col-8 offset-2">
						<h5>Conviértete en un Avatar de Paz</h5>
						<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
							<input type="hidden" name="id" ref={register} />
							{showMsg && <p className="alert alert-danger mb-3">{msg}</p>}

							<FormGroup controlId="email">
								<FormLabel className="formLabel">
									email {errors.email && <span style={{ color: 'Red' }}> requerido</span>}
								</FormLabel>
								<FormControl autoFocus name="email" ref={register({ required: true })} />
							</FormGroup>
							{(role == 'superusuario' || role == 'admin') && (
								<FormGroup className="mt-3" controlId="password" bssize="large">
									<FormLabel>Clave</FormLabel>
									<FormControl
										//value={password}
										//onChange={(e) => setPassword(e.target.value)}
										type="password"
										name="password"
										ref={register()}
									/>
								</FormGroup>
							)}
							<FormGroup controlId="nombres" bssize="large">
								<FormLabel className="formLabel">
									Nombres {errors.nombres && <span style={{ color: 'Red' }}> requerido</span>}{' '}
								</FormLabel>

								<FormControl
									name="nombres"
									ref={register({ required: true })}
								// onChange={e => update(e.target.value)}
								//value=""
								/>
							</FormGroup>
							<FormGroup controlId="apellidos" bssize="large">
								<FormLabel className="formLabel">
									Apellidos {errors.apellidos && <span style={{ color: 'Red' }}> requerido</span>}
								</FormLabel>
								<FormControl name="apellidos" ref={register({ required: true })} />
							</FormGroup>
							<FormGroup controlId="id_ciudad" bssize="large">
								<FormLabel className="formLabel">Ciudad {errors.nombres && <span style={{ color: 'Red' }}> requerida</span>}</FormLabel>

								<select ref={register({ required: true })} name="id_ciudad" disabled={read}>
									<option></option>
									{ciudades.map((item, index) => (
										<option value={item.id} key={index}>
											{item.nombre}
										</option>
									))}
								</select>
							</FormGroup>
							<FormLabel className="text-center formLabel mt-5">Información Opcional</FormLabel>

							<div className="row">
								<div className="col-md-6">
									<FormGroup className="mt-2" controlId="id_grupo" bssize="large">
										<FormLabel className="formLabel">Grupo {read}</FormLabel>

										<select ref={register} name="id_grupo" disabled={read}>
											<option>Seleccionar</option>
											{grupos.map((item, index) => (
												<option value={item.id} key={index}>
													{item.nombre}
												</option>
											))}
										</select>
									</FormGroup>
								</div>
								<div className="col-md-6">
									<FormGroup controlId="profesion" bssize="large">
										<FormLabel className="formLabel">Profesión u Oficio</FormLabel>

										<FormControl name="profesion" ref={register} />

									</FormGroup>
								</div>
								<div className="col-md-6">
									<FormGroup controlId="genero" bssize="large">
										<FormLabel className="formLabel">Género</FormLabel>

										<select ref={register} name="genero">
											<option>Seleccionar</option>
											<option value="Femenino">Femenino</option>
											<option value="Masculino">Masculino</option>
										</select>
									</FormGroup>
								</div>
								<div className="col-md-6">
									<FormGroup controlId="estado_civil" bssize="large">
										<FormLabel className="formLabel">Estado Civil</FormLabel>

										<select ref={register} name="estado_civil">
											<option>Seleccionar</option>
											<option value="Soltero">Soltero-a</option>
											<option value="Casado">Casado-a</option>
											<option value="Libre">Unión Libre</option>
										</select>
									</FormGroup>
								</div>
								<div className="col-md-12  mt-3">
									{showMsg && <p className="alert alert-danger mb-3">{msg}</p>}
								</div>
								<div className="col-md-6">
									<FormLabel className="formLabel">Foto</FormLabel>
									<input name="image" id="image" type="file" onChange={imageSelectedHandler} />
									<div className="image-preview" id="imagePreview1">
										<img src="" className="image-preview__image1" />
										<span className="image-preview__default-text">Image Preview</span>
									</div>
								</div>
								<div className="row form-group">
									<div className="col-md-6">
										<input type="submit" value="Guardar" className="btn btn-lg login-button" />
									</div>
									<div className="col-md-6">
										<a className="btn btn-lg login-button" href="/avatar/usuarios">
											Cancelar
										</a>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
if (document.getElementById('userform')) {
	ReactDOM.render(<UserForm />, document.getElementById('userform'));
}