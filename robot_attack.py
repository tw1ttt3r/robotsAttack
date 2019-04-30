"""
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
"""

robots = [] #lista con los valores de las armaduras
balas_totales = 0 #balas usadas durante la ejecucion
dano = 0 #daño cuando un valor de las posiciones de la lista llegue a 0

def verificaArmaduras(armaduras):
    """
    Funcion que convierte el string de entrada en una lista, cualquier valor diferente a un entero o menor a 0, será convertido en 0
    """
    armaduras=armaduras.split(",")
    for armadura in armaduras:
        try:
            armadura=int(armadura,10)
            if armadura < 0:
                robots.append(0)
            else:
                robots.append(armadura)
        except ValueError:
            robots.append(0)
    robot_attack()        

def reiniciaDano(valor):
    #se le asigna a dano un valor, ya sea 0 o 2
    global dano
    dano=valor

def balasTotales():
    #se acumula unitariamente a balas_totales
    global balas_totales
    balas_totales += 1                 

def robot_attack():
    global dano
    print("EMPIEZA COMBATE")
    print("ENEMIGOS A DERROTAR: {}".format(str(len(robots))))
    print("ARMADURAS: {}".format(robots))

    #se recorre la lista de valores de armadura
    for robot in robots:
        #si el valor inicial de la posicion de la lista es mayor a 0
        if robot > 0:
            #al valor inicial de la posicon de la lista se le resta lo que tenga dano
            #pero se verifica, si la resta de esto es menor a 0, le asignaremos 0
            #de lo contrario, se le asignara el valor de la resta
            robot = 0 if ((robot - dano) < 0) else (robot - dano)
            #se le asigna 0 a dano, ya que iniciamos el recorrido de una nueva posicion de la lista de valores
            reiniciaDano(0)
            #se recorre en decremento, ya que asi sigue la logica del ejercicio
            for i in range(robot,-1,-1):
                #si el valor del recorrido es 0, se asigna a dano el valor de 2, que se le restara a la siguiente posicion de la lista de valores
                if i == 0:
                    reiniciaDano(2)
                else:
                    #de lo contrario, se acumula unitariamente en balas_totales
                    balasTotales()
        else:
            #de lo contrario, simplemente le asignamos a dano 0 por que no se hara nada en este caso
            reiniciaDano(0)
    #se imprime el total de balas ocupadas durante la ejecucion        
    print("BALAS TOTALES: {}".format(balas_totales))        



armaduras = input("LISTA DE ROBOTS(LISTA EL VALOR DE LA ARMADURA INICIAL SEPARADO POR COMAS): ")

verificaArmaduras(armaduras)