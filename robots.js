/*
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

const app = {
    version:"2.0",//se considera comenzar a atacar desde cualquier posicion del array
    //robots : [3,0,3,0,3],//listado de valores de armadura
    robots: [7, 9, 1, 0, 8, 7],
    balas_totales: 0,//total de balas usadas 
    dano: 0,//daño inflijido cuando se llegue a 0
    verificaRobots: (posicionAtaque=0) => {
        //si pos viene vacia, comenzara a atacar desde la posicion 0, 
        //de lo contrario, comenzara de la posicion dada, 
        //verificando que sea >= 0 y < al numero de robots del array, si no cumple, pos se convierte en 0
        //Se revisa que los elementos del array sean enteros y mayores o iguales a 0, de lo contrario, seran convertidos a 0
        if(posicionAtaque < 0 || posicionAtaque > app.robots.length || typeof posicionAtaque != "number"){
            posicionAtaque=0;
        }
        app.robots = app.robots.map( robot => {
            if(typeof robot == "string" || robot < 0){
                return 0;
            }else{
                return robot;
            }
        });
        app.atacaRobots(posicionAtaque);
    },
    onOffDano: (valor) => {
        //se le asigna a la propiedad el valor que se envio desde el llamdo de la funcion
        app.dano=valor;
    },
    balasUsadas: () => {
        //se acumulara unitariamente a la propiedad balas_totales
        app.balas_totales++;
    },
    atacaRobotsAsc: () => {
        //se recorre el array de valores, ya verificado
        app.robots.forEach(robot => {
            //se revisa que el valor inicial de la posicion
            if(robot > 0){
                //si el valor inicial de la posicion es mayor a 0, se le resta el valor de dano, el cual puede ser 2 o 0, dependiendo lo que haya sucedido en el recorrido del valor de la posicion anterior
                //se verifica que la resta de dano al valor inicial de la posicion sea mayor a 0 o 0, de lo contrario, se asignara 0
                robot = ((robot - app.dano) < 0 ? 0 : robot - app.dano);
                //se asigna a dano el valor de 0 ya que empezamos una nueva posicion 
                app.onOffDano(0);
                //Se recorre en decremento el for, porque asi es más organica el funcionamiento del algoritmo con la lógica del ejercicio
                for(let a = robot; a >= 0; a--){
                    if(a == 0){
                        //si el valor del recorrido se llega a 0, se asigna el valor 2 a dano, el cual se le restara a la siguiente posicion del array
                        app.onOffDano(2);
                    }else{
                        //mientras no sea 0, se incrementara la propiedad balas_totales
                        app.balasUsadas(0);
                    }
                }
            }else{
                //Si el valor inicial de la propiedad es 0, simplemente asignamos a dano el valor de 0, porque con un valor 0 inicial, no debe provocar mayor accion
                app.onOffDano(0);
            }
        });
        app.imprimeBalasTotales();
    },
    atacaRobotsDsc: () => {
        //se recorre el array de valores, ya verificado
        for(let a = app.robots.length; a >= 0; a--){
            let robot = app.robots[a];        
            //se revisa que el valor inicial de la posicion
            if(robot > 0){
                //si el valor inicial de la posicion es mayor a 0, se le resta el valor de dano, el cual puede ser 2 o 0, dependiendo lo que haya sucedido en el recorrido del valor de la posicion anterior
                //se verifica que la resta de dano al valor inicial de la posicion sea mayor a 0 o 0, de lo contrario, se asignara 0
                robot = ((robot - app.dano) < 0 ? 0 : robot - app.dano);
                //se asigna a dano el valor de 0 ya que empezamos una nueva posicion 
                app.onOffDano(0);
                //Se recorre en decremento el for, porque asi es más organica el funcionamiento del algoritmo con la lógica del ejercicio
                for(let a = robot; a >= 0; a--){
                    if(a == 0){
                        //si el valor del recorrido se llega a 0, se asigna el valor 2 a dano, el cual se le restara a la siguiente posicion del array
                        app.onOffDano(2);
                    }else{
                        //mientras no sea 0, se incrementara la propiedad balas_totales
                        app.balasUsadas(0);
                    }
                }
            }else{
                //Si el valor inicial de la propiedad es 0, simplemente asignamos a dano el valor de 0, porque con un valor 0 inicial, no debe provocar mayor accion
                app.onOffDano(0);
            }
        }
        app.imprimeBalasTotales();
    },
    atacaRobots: (posicionAtaque) => {
        switch(posicionAtaque){
            case 0:
                app.atacaRobotsAsc();
                break;
            case (app.robots.length - 1):
                app.atacaRobotsDsc();
                break;
            default:
                console.log("desde cualquier posicion");        
        } 
    },
    imprimeBalasTotales: () => {
        //se imprime el total de balas usudas
        console.log("BALAS USADAS:",app.balas_totales);
    }
};

app.verificaRobots(5);

