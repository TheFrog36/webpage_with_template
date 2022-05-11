const toDo1 = new ExpiringToDo("bolletta luce", ToDo.PRIORITY_LEVEL.medio,["pagamento"], new Date('2022-07-04'));
const toDo2 = new ExpiringToDo("scadenza patente", ToDo.PRIORITY_LEVEL.basso, ['rinnovo','macchina'], new Date('2027-05-04'));
const toDo3 = new ExpiringToDo("Trovare il sacro Graal" , ToDo.PRIORITY_LEVEL.alto,['Cage','varie','Gesù'], new Date('2022-05-10'));
const toDo4 = new ToDo('latte', ToDo.PRIORITY_LEVEL.moltoAlto, ['spesa']);
const toDo5 = new MultiToDo('scadenze', ToDo.PRIORITY_LEVEL.medio, ['vario'], [toDo1, toDo2, toDo3, toDo4]);
const toDo6 = new ExpiringToDo('test', ToDo.PRIORITY_LEVEL.medio, ['test'])
const toDo7 = new ExpiringToDo('yoyo')
const toDo8 = new ExpiringToDo("test" , ToDo.PRIORITY_LEVEL.moltoAlto,['boh2','boh1','boh'], new Date('2023-05-07'));
const toDo9 = new ExpiringToDo('test2', ToDo.PRIORITY_LEVEL.basso, [], new Date('2021-05-07'));
let listToDo = [toDo1, toDo2, toDo3, toDo8, toDo9]
let doneList = []

const TodoTemplate = `
    <div class="task-div" style="background-color:#COLOR;">
        <div class="task-griglia2">
            <div class="titolo-div">#TITOLO</div>
            <div class="flex-tags-div2">
            </div>
            <div class="dates">
                <div class="creation-date-div2">#DATACREAZIONE</div>
                <div class="expiration-date-div2">#DATASCADENZA</div>
            </div>
            <button class="button">Fatto</button>
        </div>
    </div>`

const DoneTemplate = `
    <div class="task-div" style="background-color:#COLOR;">
        <div class="task-griglia2">
            <div class="titolo-div">#TITOLO</div>
            <div class="flex-tags-div2">
            </div>
            <div class="dates">
                <div class="creation-date-div2">#DATACREAZIONE</div>
                <div class="expiration-date-div2">#DATASCADENZA</div>
            </div>
        </div>
    </div>`

const todoContainer = "todo-container"
const doneContainer = "done"

function displayTodoUsingTemplate(array, template, containerName){
    const container = document.getElementById(containerName)
    container.innerHTML = ""
    for(let i = 0; i < array.length; i++){
        const toDo = array[i]
        const div = document.createElement('div')
        const toDoTemplate = template.replace('#TITOLO', toDo.name)
                                     .replace('#COLOR', toDo.actual_priority.color)
                                     .replace('#DATACREAZIONE', 'da ' + ToDo.getHumanDate(toDo.crationDate))
                                     .replace('#DATASCADENZA', 'a ' + ToDo.getHumanDate(toDo.deadLine))
        div.innerHTML = toDoTemplate
        container.appendChild(div)
        const button = div.querySelector('.button')
        if(button)button.onclick = () => removeDoneTodo(toDo);
        const divTagsFlex = div.querySelector('.flex-tags-div2');
        const ul = document.createElement('ul')
        for (const j of toDo.tags) {
            const li = document.createElement('li')
            li.innerHTML = j
            ul.appendChild(li)
        }
        divTagsFlex.appendChild(ul)
    }
}

// function displayDoneToDoUsingTemplate(array){
//     const container = document.getElementById('done')
//     container.innerHTML = ''
    
//     for(let i = 0; i < array.length; i++){
//         const toDo = array[i]
//         const div = document.createElement('div')
//         const toDoTemplate = template.replace('#TITOLO', toDo.name)
//                                      .replace('#COLOR', toDo.actual_priority.color)
//                                      .replace('#DATACREAZIONE', 'da ' + ToDo.getHumanDate(toDo.crationDate))
//                                      .replace('#DATASCADENZA', 'a ' + ToDo.getHumanDate(toDo.deadLine))
//         div.innerHTML = toDoTemplate
//         container.appendChild(div)
//         const divTagsFlex = div.querySelector('.flex-tags-div2');
//         const ul = document.createElement('ul')
//         for (const j of toDo.tags) {
//             const li = document.createElement('li')
//             li.innerHTML = j
//             ul.appendChild(li)
//         }
//         divTagsFlex.appendChild(ul)
//     }
// }
function updateHTML(){
    displayTodoUsingTemplate(listToDo, TodoTemplate,todoContainer)
    displayTodoUsingTemplate(doneList, DoneTemplate, doneContainer)
}

updateHTML()

// function displayTodo(array){
//     const container = document.getElementById('todo-container')
//     container.innerHTML = ''
//     for(let i = 0; i < array.length; i++){
//         const toDo = array[i]
//         //taskDiv
//         const taskDiv = document.createElement('div')
//         taskDiv.style.backgroundColor = toDo.actual_priority.color
//         taskDiv.className = 'task-div'
//         //gridDiv
//         const gridDiv = document.createElement('div')
//         gridDiv.className = 'task-griglia2'
//         taskDiv.appendChild(gridDiv)
//         //titleDiv
//         const titleDiv = document.createElement('div')
//         titleDiv.innerHTML = toDo.name
//         titleDiv.className = 'titolo-div'
//         //flex-tags-div2
//         const flexDiv = document.createElement('div')
//         flexDiv.className = 'flex-tags-div2'
//         //tags
//         const ul = document.createElement('ul')
//         for (const tag of toDo.tags) {
//             const li = document.createElement('li')
//             li.innerHTML = tag
//             ul.appendChild(li)
//         }
//         flexDiv.appendChild(ul)
//         //dates
//         const datesDiv = document.createElement('div')
//         datesDiv.className = 'dates'
//         datesDiv.innerHTML = 'da ' + ToDo.getHumanDate(toDo.crationDate) + '\na ' + ToDo.getHumanDate(toDo.deadLine)
//         //button
//         const button = document.createElement('button')
//         button.className = 'button'
//         button.innerHTML = 'Fatto'
//         button.onclick = () => removeDoneTodo(toDo)
//         gridDiv.append(titleDiv, flexDiv, datesDiv, button)
//         taskDiv.appendChild(gridDiv)
//         container.appendChild(taskDiv)
//     }
// }
// displayTodo(listToDo)

function removeDoneTodo(todo){
    listToDo = listToDo.filter(t => t.name !== todo.name)
    doneList.push(todo)
    console.log(todo.name)
    console.log(doneList)
    console.log(listToDo)
    displayTodoUsingTemplate(listToDo, TodoTemplate,todoContainer)
    displayTodoUsingTemplate(doneList, DoneTemplate, doneContainer)
}

function orderByName(){
    listToDo.sort((a,b) => a.name.localeCompare(b.name))
    doneList.sort((a,b) => a.name.localeCompare(b.name))
    updateHTML()
}

function orderByDate(){
    listToDo.sort((a,b) => a.deadLine.getTime() - b.deadLine.getTime())
    doneList.sort((a,b) => a.deadLine.getTime() - b.deadLine.getTime())
    updateHTML()
}

function orderByPriority(){
    listToDo.sort((a,b) => b.actual_priority.order - a.actual_priority.order)
    doneList.sort((a,b) => b.actual_priority.order - a.actual_priority.order)
    updateHTML()
}

function logTodo(){
    console.log('yoyo')
}

function colorButton(){
    event.target.style.backgroundColor = 'red'
}

function oldColor(){
    event.target.style.backgroundColor = null
}
const dateButton = document.getElementById('date-order-button')
dateButton.onclick = orderByDate

const priortyButton = document.getElementById('priority-order-button')
priortyButton.addEventListener('click', orderByPriority)
priortyButton.addEventListener('click', logTodo) //Con eventListener posso associare più funzioni allo stesso evento
priortyButton.addEventListener('mouseenter', () => colorButton())
priortyButton.addEventListener('mouseleave', () => oldColor())
