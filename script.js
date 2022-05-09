const toDo1 = new ExpiringToDo("bolletta luce", ToDo.PRIORITY_LEVEL.medio,["pagamento"], new Date('2022-07-04'));
const toDo2 = new ExpiringToDo("scadenza patente", ToDo.PRIORITY_LEVEL.basso, ['rinnovo','macchina'], new Date('2027-05-04'));
const toDo3 = new ExpiringToDo("abbonamento xbox" , ToDo.PRIORITY_LEVEL.alto,['xbox','varie','futile'], new Date('2022-05-10 '));
const toDo4 = new ToDo('latte', ToDo.PRIORITY_LEVEL.moltoAlto, ['spesa']);
const toDo5 = new MultiToDo('scadenze', ToDo.PRIORITY_LEVEL.medio, ['vario'], [toDo1, toDo2, toDo3, toDo4]);
const toDo6 = new ExpiringToDo('test', ToDo.PRIORITY_LEVEL.medio, ['test'])
const toDo7 = new ExpiringToDo('yoyo')
const toDo8 = new ExpiringToDo("test" , ToDo.PRIORITY_LEVEL.moltoAlto,['boh2','boh1','boh'], new Date('2023-05-07'));
const toDo9 = new ExpiringToDo('test2', ToDo.PRIORITY_LEVEL.basso, [], new Date('2021-05-07'));
const listToDo = [toDo1, toDo2, toDo3, toDo8, toDo9]

console.log(ToDo.getHumanDate(toDo1._deadLine))

// function displayToDo(arrayTask) {
//     const container = document.getElementById('todo-container'); 
//     for(let i = 0; i < arrayTask.length; i ++){
//         const divGenerale = document.createElement('div'); 
//         divGenerale.className = "task-div";  
//         divGenerale.style.backgroundColor = arrayTask[i].actual_priority.color
//         const divGriglia = document.createElement('div'); 
//         divGriglia.className = "task-griglia"; 
//         const titolo = document.createElement('div'); 
//         titolo.appendChild(document.createTextNode(arrayTask[i].name + ' | priority: ' + arrayTask[i].priority.name))
//         titolo.className = "titolo-div";  
//         const divTagsFlex = document.createElement('div'); 
//         divTagsFlex.className = "flex-tags-div"; 
//         for (const j of arrayTask[i].tags) {
//             const divTag = document.createElement('div');
//             divTag.className = "tag-div" 
//             const tagText = document.createTextNode(j); 
//             divTag.appendChild(tagText)
//             divTagsFlex.appendChild(divTag);
//         }
//         const checkboxDiv = document.createElement('div')
//         checkboxDiv.className = 'checkbox-div'
//         const checkBox = document.createElement('input')
//         checkBox.type = "checkbox"
//         checkBox.className = 'task-completed-check'
//         checkBox.id = 'checkbox' + i
//         const checkboxLabel = document.createElement('label')
//         checkboxLabel.className = 'task-completed-label'
//         checkboxLabel.htmlFor = 'checkbox' + i
//         const checkboxLabelDiv = document.createElement('div')
//         checkboxLabelDiv.className = 'checkbox-label-div'
//         checkboxLabel.appendChild(checkboxLabelDiv)
//         checkboxDiv.append(checkBox, checkboxLabel)
//         const creationDateDiv = document.createElement('div')
//         creationDateDiv.className = 'creation-date-div'
//         creationDateDiv.appendChild(document.createTextNode(ToDo.getHumanDate(arrayTask[i].creationDate)))
//         const expirationDateDiv = document.createElement('div')
//         expirationDateDiv.className = 'expiration-date-div'
//         expirationDateDiv.appendChild(document.createTextNode(ToDo.getHumanDate(arrayTask[i]._deadLine)))
//         divGriglia.append(titolo, divTagsFlex, checkboxDiv, creationDateDiv, expirationDateDiv)
//         divGenerale.appendChild(divGriglia)
//         container.appendChild(divGenerale);
//     }
// } 

// displayToDo(listToDo);

// function displayTodoWithTemplate(array){
//     const template =  `
//     <div class="task-div" style="background-color: #COLOR;">
//         <div class="task-griglia">
//             <div class="titolo-div">#TITOLO | #PRIORITA</div>
//             <div class="flex-tags-div">
//             </div>
//             <div class="checkbox-div">
//                 <input type="checkbox" class="task-completed-check" id="#CHECKBOXID">
//                 <label class="task-completed-label" for="#CHECKBOXID">
//                     <div class="checkbox-label-div"></div>
//                 </label>
//             </div>
//             <div class="creation-date-div">#DATACREAZIONE</div>
//             <div class="expiration-date-div">#DATASCADENZA</div>
//         </div>
//     </div>`;
//     const toDoContainer = document.getElementById('todo-container')
//     for(let i = 0;i < array.length; i++){
//         const toDo = array[i]
//         const div = document.createElement('div')
//         const toDoTemplate = template.replace('#TITOLO', toDo.name)
//                                      .replace('#COLOR', toDo.actual_priority.color)
//                                      .replace('#PRIORITA', toDo.priority.name)
//                                      .replace('#DATACREAZIONE', ToDo.getHumanDate(toDo.crationDate))
//                                      .replace('#DATASCADENZA', ToDo.getHumanDate(toDo.deadLine))
//                                      .replaceAll('#CHECKBOXID', 'checkbox'+i)
//         const container = document.getElementById('todo-container')
//         div.innerHTML = toDoTemplate
//         toDoContainer.appendChild(div)
//         const divTagsFlex = div.querySelector('.flex-tags-div'); 
//         for (const j of toDo.tags) {
//             const divTag = document.createElement('div');
//             divTag.className = "tag-div"
//             const tagText = document.createTextNode(j);
//             divTag.appendChild(tagText)
//             divTagsFlex.appendChild(divTag);
//         }

//     }
// }

function displayTodo2(array){
    const toDoContainer = document.getElementById('todo-container')
    const template = `
    <div class="task-div" style="background-color:#COLOR;">
        <div class="task-griglia2">
            <div class="titolo-div">#TITOLO</div>
            <div class="flex-tags-div2">
            </div>
            <div class="dates">
                <div class="creation-date-div2">#DATACREAZIONE</div>
                <div class="expiration-date-div2">#DATASCADENZA</div>
            </div>
            <button class="button" onclick="createShadow()">Fatto</button>
        </div>
    </div>`
    for(let i = 0; i < array.length; i++){
        const toDo = array[i]
        const div = document.createElement('div')
        const toDoTemplate = template.replace('#TITOLO', toDo.name)
                                     .replace('#COLOR', toDo.actual_priority.color)
                                     .replace('#DATACREAZIONE', 'da ' + ToDo.getHumanDate(toDo.crationDate))
                                     .replace('#DATASCADENZA', 'a ' + ToDo.getHumanDate(toDo.deadLine))
        const container = document.getElementById('todo-container')
        div.innerHTML = toDoTemplate
        toDoContainer.appendChild(div)
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

// function createShadow(){
//     const bottone = document.querySelector('button')
//     bottone.style.borderRadius = "50px";
//     bottone.style.background = "#ebebeb";
//     bottone.style.boxShadow = "inset - 20px 20px 60px #c8c8c8,inset 20px - 20px 60px #ffffff";
        
// }
displayTodo2(listToDo)

