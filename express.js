$(document).ready(function() {
    // Función para cargar la lista de estudiantes al cargar la página
    cargarListaEstudiantes();
  
    // Manejar el envío del formulario para crear un nuevo estudiante
    $('#crearEstudianteForm').submit(function(event) {
      event.preventDefault();
      var nombre = $('#nombre').val();
      var edad = $('#edad').val();
  
      // Crear el objeto estudiante
      var nuevoEstudiante = {
        nombre: nombre,
        edad: edad
      };
  
      // Enviar la solicitud POST para crear un nuevo estudiante
      $.ajax({
        type: 'POST',
        url: 'https://pje4h805t4.execute-api.us-west-2.amazonaws.com/dev/students',
        contentType: 'application/json',
        data: JSON.stringify(nuevoEstudiante),
        success: function(response) {
          // Recargar la lista de estudiantes después de crear uno nuevo
          cargarListaEstudiantes();
          // Limpiar el formulario después de crear un estudiante
          $('#crearEstudianteForm')[0].reset();
        },
        error: function(xhr, status, error) {
          alert('Error al crear estudiante: ' + error);
        }
      });
    });
  
    // Función para cargar la lista de estudiantes
    function cargarListaEstudiantes() {
      $.ajax({
        type: 'GET',
        url: 'https://pje4h805t4.execute-api.us-west-2.amazonaws.com/dev/students',
        success: function(response) {
          mostrarEstudiantes(response);
        },
        error: function(xhr, status, error) {
          alert('Error al cargar la lista de estudiantes: ' + error);
        }
      });
    }
  
    // Función para mostrar la lista de estudiantes en la página
    function mostrarEstudiantes(estudiantes) {
      var listaEstudiantes = $('#estudiantes');
      listaEstudiantes.empty();
      estudiantes.forEach(function(estudiante) {
        listaEstudiantes.append('<li>' + estudiante.nombre + ' - Edad: ' + estudiante.edad + '</li>');
      });
    }
  });
  