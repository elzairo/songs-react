import React, { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      _id: '',
      titulo: '',
      grupo: '',
      anio: 2022,
      genero: '',
      canciones: [],
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <nav className='p-3 mb-2 bg-info'>
          <div className='container'>
            <a className='navbar-brand text-dark fs-1' href="/">Listado de Canciones</a>
          </div>
        </nav>
        <div className='row vh-50 justify-content-around'>
          <div className='col-lg-5'>
            <div className="card">
              <div className="card-body">
                <form onSubmit={(e) => this.saveSong(e)}>
                  <div className="row">
                    <div className="form-group">
                      <label>Titulo</label>
                      <input type="text" className="form-control" id="txtTitulo"
                        placeholder="Ingrese el Titulo"
                        name="titulo"
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.titulo}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <label>Grupo</label>
                      <input type="text" className="form-control" id="txtGrupo"
                        placeholder="Ingrese el Grupo"
                        name="grupo"
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.grupo}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <label>Anio</label>
                      <input type="number" className="form-control" id="txtAnio"
                        placeholder="Ingrese el Anio"
                        name="anio"
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.anio}
                        min="1900"
                        max="2100"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group">
                      <label>Genero</label>
                      <input type="text" className="form-control" id="txtGenero"
                        placeholder="Ingrese el Genero"
                        name="genero"
                        onChange={(e) => this.handleChange(e)}
                        value={this.state.genero}
                      />
                    </div>
                  </div>
                  <button type="submit"
                    className="btn btn-primary">
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className='col-lg-7'>
            <table className='table table-bodered'>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Grupo</th>
                  <th>Año</th>
                  <th>Genero</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.canciones.map(cancion => {
                    return (
                      <tr key={cancion._id}>
                        <td>{cancion.titulo}</td>
                        <td>{cancion.grupo}</td>
                        <td>{cancion.anio}</td>
                        <td>{cancion.genero}</td>
                        <td>
                          <button type="button" className="btn btn-danger"
                            onClick={() => this.deleteSong(cancion._id)}>
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
    );
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    //console.log([name] + ' ' + value);
  }
  saveSong(e) {
    //e.preventDefault();
    const url = 'https://server-0890.uc.r.appspot.com/api/songs';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          _id: '',
          titulo: '',
          grupo: '',
          anio: 2022,
          genero: '',
        });
        this.getSongs();
      })
      .catch(err => console.log(err));
    e.preventDefault();
  }
  componentDidMount() {
    this.getSongs();
  }
  getSongs = () => {
    fetch('https://server-0890.uc.r.appspot.com/api/songs')
      .then(res => res.json())
      .then(data => this.setState({ canciones: data }));
  }
  deleteSong(id) {
    if (window.confirm('¿Desea eliminar este usuario:?')) {
      fetch('https://server-0890.uc.r.appspot.com/api/songs/' + id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          this.getSongs();
        })
        .catch(err => console.error(err));
    }
  }
}

export default App;
