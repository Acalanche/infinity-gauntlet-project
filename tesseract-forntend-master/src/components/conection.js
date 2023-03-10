
//GET
export const llamarLista = async () =>{
   try{ const respuesta = await fetch('http://localhost:3001/v1/to-dos');
    console.log(respuesta.status);
    const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error(error);
    }
  };

//POST
  
export const createTodo = async (todo) => {
    try {
      const response = await fetch('http://localhost:3001/v1/to-do', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: todo.text,
          description: todo.description,
          is_done:todo.is_done
        })
      });
            const data = await response.json();
      
     
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  //PATCH(description)
  export const actualizar = async (id, updatedTodo) => {
    try {
      const respuesta = await fetch(`http://localhost:3001/v1/to-do/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTodo.text,
          description: updatedTodo.description,
          is_done: updatedTodo.is_done
      })
      });
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.log(error);
    }
  };
  

  
  //DELETE
  export const eliminar = async(id)=>{
    try{
      const respuesta = await fetch(`http://localhost:3001/v1/to-do/${id}`,{
        method : 'DELETE',
        headers:{'Content-Type': 'application/json'}
      });
      return respuesta.status;
    } catch (error) {
      console.log(error);
    }
  }
  