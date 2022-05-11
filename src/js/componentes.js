//Referencia en el Html
import { Todo } from '../classes';
import { todoList } from '../index';

const divTodoList   = document.querySelector('.todo-list');
const txtImput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const UlrFltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo)=>{
    const htmlTodo=`
    <li class="${(todo.completado)?'completed':''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado)?'checked':''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`
const div = document.createElement('div');
div.innerHTML=htmlTodo;

divTodoList.append(div.firstElementChild);
return div.firstElementChild;
}


//Eventos 
txtImput.addEventListener('keyup', (event)=>{
        //console.log(txtImput.value); // Revisar info de entrada
    if (event.keyCode===13 && txtImput.value.length>0){
        // console.log(event); // Revisar el evento en cuestion    
        console.log(txtImput.value);
        const nuevoTodo = new Todo(txtImput.value);
        todoList.nuevoTodo(nuevoTodo);
        
        // console.log(todoList);
        crearTodoHtml(nuevoTodo);
        txtImput.value='';
    }
});


divTodoList.addEventListener('click', (event) =>{
    // console.log('click');
    // console.log(event.target.localName);
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    // console.log(nombreElemento);
    
    if (nombreElemento.includes('input')){ //checkear el click
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
        
    }else if(nombreElemento.includes('button')){ //Borrar el ToDo
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }
    
    // console.log(todoList);
});

btnBorrar.addEventListener('click', () =>{
    todoList.eliminarCompletado();

    for(let i = divTodoList.children.length -1; i>=0; i--){
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }

});

UlrFltros.addEventListener('click',(event)=>{
    const filtro = event.target.text;
    if (!filtro){return;}

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    console.log(event.target);

    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado=elemento.classList.contains('completed');

        switch(filtro){
            case 'Pendientes':
                if (completado){
                    elemento.classList.add('hidden')
                }
            break;

            case 'Completados':
                if (!completado){
                    elemento.classList.add('hidden')
                }
            break;
        }
    }

});