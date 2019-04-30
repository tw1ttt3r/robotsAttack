/*
VERSION 1

You are being attacked by an army of robots!
Luckily they are rather stupid and approach in one row.

Every robot has an armor value of larger than 0.
To defend yourself you have a single shot front loader rifle that will reduce
a robots armor value by 1.
If a robots armor value goes below 1, it will explode and inflict a damage of 2
(reducing armor by 2) to the robots standing next to it.

So, given a list of robot armor values, your function robotAttack must return
the minimum number of bullets you have to use to destroy all the robots

Attention: A value 0 in the list of robots means, that this space is not taken by a robot.

Sample:
Input: robots = [1, 2, 1, 2, 1, 1]
Output: 1

Input: robots = [3, 3, 3]
Output: 5

Input: robots = [3, 0, 3, 0, 3]
Output: 9  
*/

/*
VERSION 2
Input: robots = [7, 9, 1, 0, 8, 7]
inicio: 2 
Output: 9  
UPDATE: Considerar atacar desde cualquier posicion del array

*/

const app={
    version:"2.0",//version 2.0, donde se contempla iniciar desde cualquier posicion del array
    robots: [7, 9, 1, 0, 8, 7],//array de robots con valores de armadura
    robotsDestruidos: [],//se guardan las posiciones de los robots destruidos
    posicionInicial: 2,//desde 0 hasta n(app.robots.length)
    balas_totales: 0,//total de balas usadas 
    dano: 0,//daño infligido cuando se llegue a 0
    onOffDano: (valor) => {
        //se le asigna a la propiedad el valor que se envio desde el llamdo de la funcion
        app.dano=valor;
    },
    balasUsadas: () => {
        //se acumulara unitariamente a la propiedad balas_totales
        app.balas_totales++;
    },
    addChatarra: (robot) => {
        app.robotsDestruidos.push(robot);
    },
    danoSiblings: (posicionActual) => {
        //daño a robot anterior
        if(!app.robotsDestruidos.includes((posicionActual - 1))){
            if(app.robots[(posicionActual - 1)] > 0){
                app.robots[(posicionActual - 1)] -= app.dano;   
            }
        }

        //daño a robot siguiente
        if(!app.robotsDestruidos.includes((posicionActual + 1))){
            if(app.robots[(posicionActual + 1)] > 0){
                app.robots[(posicionActual + 1)] -= app.dano;   
            }
        }
        app.onOffDano(0);
    },
    validaRobots: () => {
        if(!(app.posicionInicial >= 0 && app.posicionInicial < app.robots.length) || app.posicionInicial == null){
            app.posicionInicial=0;
        }
        console.log(app.robots);
        app.atacaRobots();
    },
    atacaRobots: () => {
        let contador=0;
        let posicionActual=app.posicionInicial;
        while(contador < app.robots.length){
            (app.dano > 0 ? app.danoSiblings(posicionActual) : 1);
            let robot = app.robots[posicionActual];
            console.log(robot);
            //se revisa que el valor inicial de la posicion
            if(robot > 0){
                //si el valor inicial de la posicion es mayor a 0, se le resta el valor de dano, el cual puede ser 2 o 0, dependiendo lo que haya sucedido en el recorrido del valor de la posicion anterior
                /*
                //se verifica que la resta de dano al valor inicial de la posicion sea mayor a 0 o 0, de lo contrario, se asignara 0
                robot = ((robot - app.dano) < 0 ? 0 : robot - app.dano);
                //se asigna a dano el valor de 0 ya que empezamos una nueva posicion 
                app.onOffDano(0);
                */
                //Se recorre en decremento el for, porque asi es más organica el funcionamiento del algoritmo con la lógica del ejercicio
                for(let a = robot; a >= 0; a--){
                    if(a == 0){
                        //si el valor del recorrido se llega a 0, se asigna el valor 2 a dano, el cual se le restara a la siguiente posicion del array
                        app.addChatarra(posicionActual);
                        app.onOffDano(2);
                    }else{
                        //mientras no sea 0, se incrementara la propiedad balas_totales
                        app.balasUsadas(0);
                    }
                }
            }else{
                //Si el valor inicial de la propiedad es 0, simplemente asignamos a dano el valor de 0, porque con un valor 0 inicial, no debe provocar mayor accion
                app.onOffDano(0);
                app.addChatarra(posicionActual);
            }
            contador++;
            if(posicionActual == (app.robots.length - 1)){
                posicionActual=0;
                app.onOffDano(0);
            }else{
                posicionActual++;
            }
        }
        console.log(app.robotsDestruidos);
        app.imprimeBalasTotales();
    },
    imprimeBalasTotales: () => {
        //se imprime el total de balas usudas
        console.log("BALAS USADAS:",app.balas_totales);
    }
};

app.validaRobots();