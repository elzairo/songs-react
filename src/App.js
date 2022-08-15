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
      buscar: '',
      songs: [],
      elimCan: '',
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
                    Agregar Cancion
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="row">
              <div className="form-group">
                <label>Buscar:</label>
                <input type="text" className="form-control" id="txtBuscar"
                  placeholder="Teclea el titulo de la cancion a buscar"
                  name="buscar"
                  onChange={(e) => this.getSongTitle(e)}
                  value={this.state.buscar}
                />
              </div>
            </div>
          </div>

          <div className='row'>
            <table className='table table-bodered' id="tabCan">
              <thead>
                <tr>
                  <th>Id</th>
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
                        <td>{cancion._id}</td>
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
  getSongTitle(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
    console.log(value)
    console.log('metodo obtener nombre del modelo')
    var va = value;
    if (this.state.elimCan === "si"){
      va = "";
    }
    fetch('https://server-0890.uc.r.appspot.com/api/songs/' + va)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ songs: data })
      });

    setTimeout(() => {
      var incId = 1;
      this.borrarTabla();
      var tabla = document.getElementById('tabCan');
      this.state.songs.map(song => {
        console.log('resultado' + song.titulo)
        let tr = document.createElement('tr');
        for (var i = 0; i < 6; i++) {
          //for (const atributo of Object.values(this.state.songs)) {
          //console.log(i);
          var celda = document.createElement('td');
          if (i === 0) {
            celda.textContent = song._id
            celda.id = incId;
            incId++;
            //console.log('id ' + celda.id)
          } else if (i === 1) {
            celda.textContent = song.titulo;
          } else if (i === 2) {
            celda.textContent = song.grupo;
          } else if (i === 3) {
            celda.textContent = song.anio;
          } else if (i === 4) {
            celda.textContent = song.genero;
          } else if (i === 5){
            var botonE = document.createElement("button");
            //var icon = document.createElement("span");
            botonE.id = "btnEli";
            //icon.className = "bi bi-trash-fill"; //onChange={(e) => this.handleChange(e)}
            botonE.addEventListener("click", (event) => { this.eliminarCancion(event) });
            botonE.innerHTML = "Eliminar";
            botonE.className = "btn btn-danger";
            //botonE.appendChild(icon);
            botonE.value = incId - 1;
            //console.log('id ' + incId);
            celda.appendChild(botonE);
          }
          tr.appendChild(celda);

        }
        tr.appendChild(celda);
        tabla.appendChild(tr);

      })
      document.body.appendChild(tabla);
    }, 1000)
  }
  borrarTabla() {
    var elmTable = document.getElementById('tabCan');
    var tableRows = elmTable.getElementsByTagName('tr');
    var rowCount = tableRows.length;
    for (var i = rowCount - 1; i > 0; i--) {
      document.getElementById('tabCan').deleteRow(i);
    }
  }

  saveSong(e) {
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
    if (window.confirm('¿Desea eliminar esta cancion:?')) {
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
  eliminarCancion(e) {
    if (window.confirm('¿Desea eliminar esta cancion:?')) {
      //this.borrarTabla();
      this.setState({ elimCan:"si"});
      var valorId = document.getElementById(e.target.value).innerText;
      fetch('https://server-0890.uc.r.appspot.com/api/songs/' + valorId, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getSongTitle(e);
          console.log(data)
        })
        .catch(err => console.log(err));
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }
}

export default App;
