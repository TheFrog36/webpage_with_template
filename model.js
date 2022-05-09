class ToDo {
    constructor(name, priority = ToDo.PRIORITY_LEVEL.basso, tags = []){
        this.name = name;
        this.priority = priority;
        this._creationDate = new Date().getTime();
        this.tags = tags;
    }
    static PRIORITY_LEVEL = {
        basso: {order: 0, name:'basso', color:'green'},
        medio: {order: 1, name:'medio', color:'yellow'},
        alto: {order: 2, name:'alto', color:'orange'},
        moltoAlto: {order: 3, name:'moltoAlto', color:'red'},
        expired: {order: -1, name:'scaduto', color:'grey'}
    }
    static getHumanDate(inputDate = new Date() ){
        const dateNumber = inputDate
        const year = dateNumber.getFullYear()
        const month = dateNumber.getMonth()
        const day = dateNumber.getDate()
        const mesi = ['gennaio', 'febbraio', 'marzo',
                      'aprile', 'maggio', 'giugno',
                      'luglio', 'agosto', 'settembre', 
                      'ottobre', 'novembre', 'dicembre']
        return day + '/' + mesi[month] + '/' + year
    }
    get creationDate(){
        return new Date(this._creationDate)
    }
    toString(){
        return 'name: ' + this.name + '\n' +
               'prority: ' + this.priority.order + '\n' +
               'creationDate: ' + this.creationDate + '\n' +
               'tags: ' + this.tags + '\n';
    }
}


class MultiToDo extends ToDo{
    constructor(name, priority, tags, subToDo= []){
        super(name, priority, tags)
        this.subToDo = subToDo
        this.actual_priority = this.getPriority()
    } 
    getPriority(){    //Restituisce la priorità più alta tra this.priority e le priorità di subToDo
        if(this.priority.order === 3) return 3;
        const array_highest_priority = this.subToDo.reduce((p,c) => p.priority.order > c.priority.order ? p:c)
        return array_highest_priority.priority.order > this.priority.order ? array_highest_priority.priority : this.priority
    }
    toString(){    //Stampo i dati di MultiToDo e i nomi e priorità di subToDo
        const to_do_string = super.toString();
        let my_string = 'actual priority: ' + this.actual_priority.order + '\n';
         for (const iterator of this.subToDo) {
            my_string += 'task name: ' + iterator.name + ' priority: ' + iterator.priority.order + '\n';
        }
        return to_do_string + my_string
    }
    toStringOP(){    //Stampo tutto
        const to_do_string = super.toString();
        return to_do_string + 'actual priority: ' + this.actual_priority.order + '\n' + this.subToDo.toString();
    }
}


class ExpiringToDo extends ToDo{
    constructor(name, priority, tags, deadLine = new Date().getTime() + 1000*60*60*24){
        super(name, priority, tags);
        this._deadLine = deadLine;
        this.time_left = this.timeLeft();
        this.actual_priority = this.getPriority();
    }
    get deadLine(){    //imposta la data di scadenza come numero
        const date = new Date(this._deadLine);
        return date;
    }
    set deadLine(value){    // restituisce la data di scadenza nel formato normale
        const time = value.getTime();
        this._deadLine = time;     
    }
    toString(){    //stampa i vari dati  
        return super.toString() +
               'dead line: ' + this.deadLine + '\n' +
               'actual priority:' + this.actual_priority.order + '\n';
    }
    timeLeft(){    //restituisce il tempo rimanente prima della data di scadenza
        const time_difference = this._deadLine - this._creationDate;
        const days_left = Math.floor(time_difference /(1000*60*60*24));
        const hours_left = Math.floor((time_difference % 1000*60*60*24)/(1000*60*60)) ;
        const minutes_left = Math.floor((time_difference %1000*60*60) / (1000*60));
        return 'giorni: ' + days_left + '\n' +   
               'ore: ' + hours_left + '\n' +
               'minuti: ' + minutes_left;
    }
    getPriority(){    //Restituisce la priorità in base ai giorni rimanenti       //alsoalso fare in modo che restituisca un dato .priority              
        const time_difference = this._deadLine - this._creationDate - 1;   //Sostituire creationDate con now
        if(time_difference < 0) return ToDo.PRIORITY_LEVEL.expired;
        const days_left = Math.floor(time_difference /(1000*60*60*24));
        // const calculated_priority = Math.max((3-days_left), this.priority.order) 
        const calculated_priority = 3-days_left >  this.priority.order ? 3-days_left : this.priority.order
        // const priorities = [ToDo.PRIORITY_LEVEL.basso, ToDo.PRIORITY_LEVEL.medio, ToDo.PRIORITY_LEVEL.alto, ToDo.PRIORITY_LEVEL.moltoAlto]
        switch (calculated_priority){
            case 0: 
                return ToDo.PRIORITY_LEVEL.basso;
            case 1: 
                return ToDo.PRIORITY_LEVEL.medio;
            case 2: 
                return ToDo.PRIORITY_LEVEL.alto;
            case 3: 
                return ToDo.PRIORITY_LEVEL.moltoAlto;
            default: break;
        }
    } 
}