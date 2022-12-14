const btnSend = document.getElementById('send');
const numero = /^[0-9]+$/;

class Nodo {
  constructor(numero) {
    this.numero = numero;
    this.izquierda = null;
    this.derecha = null;
  }
}
class Arbol {
  constructor() {
    this.raiz = null;
    this.lifo = [];
    this.fifo = [];
  }

  agregar(expresion) {
    /*
    if (this.raiz == null) {
      this.raiz = nuevo;
    } else {
      this._agregarRec(nuevo, this.raiz);
    }
    */
    let operacion = [];
    let cSR = 0;
    let cMD = 0;

    for (let k = 0; k < expresion.length; k++) {
      let nodo = new Nodo(expresion[k]);
      operacion.push(nodo);
      if ((operacion[k].numero == '*') || (operacion[k].numero == '/')) {
        cMD++;
      } else if ((operacion[k].numero == '-') || (operacion[k].numero == '+')) {
        cSR++;
      }


    }


    if ((cMD > 0) && (cSR == 0)) {



      for (let i = 0; i < expresion.length; i++) {

        if ((operacion[i].numero == '*') || (operacion[i].numero == '/')) {

          let h = 1;
          while (operacion[i - h] == '') {
            h++;
          }
          operacion[i].izquierda = operacion[i - h];
          operacion[i - h] = '';
          h = 1;
          while (operacion[i + h] == '') {
            h++;
          }
          operacion[i].derecha = operacion[i + h];
          operacion[i + h] = '';
          this.raiz = operacion[h];
        }
      }



    } else if ((cSR > 0) && (cMD == 0)) {


      for (let j = 0; j < operacion.length; j++) {
        if ((operacion[j].numero == '+') || (operacion[j].numero == '-')) {
          let h = 1;
          while (operacion[j - h] == '') {
            h++;
          }
          operacion[j].izquierda = operacion[j - h];
          operacion[j - h] = '';
          h = 1;
          while (operacion[j + h] == '') {
            h++;
          }
          operacion[j].derecha = operacion[j + h];
          operacion[j + h] = '';
          this.raiz = operacion[j];
        }

      }

    } else {

      for (let i = 0; i < expresion.length; i++) {

        if ((operacion[i].numero == '*') || (operacion[i].numero == '/')) {

          let h = 1;
          while (operacion[i - h] == '') {
            h++;
          }
          operacion[i].izquierda = operacion[i - h];
          operacion[i - h] = '';
          h = 1;
          while (operacion[i + h] == '') {
            h++;
          }
          operacion[i].derecha = operacion[i + h];
          operacion[i + h] = '';
        }
      }


      for (let j = 0; j < operacion.length; j++) {
        if ((operacion[j].numero == '+') || (operacion[j].numero == '-')) {
          let h = 1;
          while (operacion[j - h] == '') {
            h++;
          }
          operacion[j].izquierda = operacion[j - h];
          operacion[j - h] = '';
          h = 1;
          while (operacion[j + h] == '') {
            h++;
          }
          operacion[j].derecha = operacion[j + h];
          operacion[j + h] = '';
          this.raiz = operacion[j];
        }
      }
    }
  }

  _agregarRec(nuevo, nodox) {
    if (nuevo.numero < nodox.numero) {
      if (nodox.izquierda == null) {
        nodox.izquierda = nuevo;
      } else {
        this._agregarRec(nuevo, nodox.izquierda);
      }
    } else {
      if (nodox.derecha == null) {
        nodox.derecha = nuevo;
      } else {
        this._agregarRec(nuevo, nodox.derecha);
      }
    }
  }


  posorder() {
    if (this.raiz == null) {
      return null;
    } else {
      this._posOrder(this.raiz);
    }
  }
  _posOrder(nodox) {
    if (nodox.izquierda != null)
      this._posOrder(nodox.izquierda);
    if (nodox.derecha)
      this._posOrder(nodox.derecha);
    console.log(nodox.numero);
    this.fifo.push(nodox.numero);
  }

  preorder() {
    if (this.raiz == null) {
      return null;
    } else {
      this._preOrder(this.raiz);
    }
  }
  _preOrder(nodox) {
    console.log(nodox.numero);
    this.lifo.push(nodox.numero);
    if (nodox.izquierda != null)
      this._preOrder(nodox.izquierda);
    if (nodox.derecha)
      this._preOrder(nodox.derecha);
  }
  inorder() {
    if (this.raiz == null) {
      return null;
    } else {
      this._inOrder(this.raiz);
    }
  }
  _inOrder(nodox) {
    if (nodox.izquierda != null)
      this._inOrder(nodox.izquierda);
    console.log(nodox.numero);
    if (nodox.derecha)
      this._inOrder(nodox.derecha);
  }

  sPreOrder() {
    let aux = [];
    let derecha = '';
    let izquierda = '';
    let operacion = '';
    let res = 0;
    //(this.lifo[i] == '*') || (this.lifo[i] == '/')
    for (let i = this.lifo.length - 1; i >= 0; i--) {
      if (this.lifo[i].match(/^[0-9]+$/)) {
        aux.push(this.lifo.pop());
      } else {
        izquierda = aux.pop();
        operacion = this.lifo[i];
        this.lifo.pop();
        derecha = aux.pop();
        if (operacion == '/') {
          res = parseInt(izquierda) / parseInt(derecha);
          aux.push(res);
        } else if (operacion == '*') {
          res = parseInt(izquierda) * parseInt(derecha);
          aux.push(res);
        } else if (operacion == '+') {
          res = parseInt(izquierda) + parseInt(derecha);
          aux.push(res);
        } else if (operacion == '-') {
          res = parseInt(izquierda) - parseInt(derecha);
          aux.push(res);
        }
      }
    }
    return aux;
  }

  sPosOrder() {
    let aux = [];
    let derecha = 0;
    let izquierda = 0;
    let operacion = '';
    let resultado = 0;

    for (let i = 0; i <= this.fifo.length - 1; i++) {
      if (this.fifo[0].match(/^[0-9]+$/)) {
        aux.push(this.fifo[0]);
        for (let j = 0; j <= this.fifo.length - 1; j++) {
          this.fifo[j] = this.fifo[j + 1];
        }
        this.fifo[this.fifo.length - 1] = null;
      } else {
        derecha = aux.pop();
        operacion = this.fifo[0];
        for (let k = 0; k <= this.fifo.length - 1; k++) {
          this.fifo[k] = this.fifo[k + 1];
        }
        this.fifo[this.fifo.length - 1] = null;
        izquierda = aux.pop();

        if (operacion == '/') {
          derecha = parseInt(izquierda) / parseInt(derecha);
          aux.push(derecha);
        }

        if (operacion == '*') {
          derecha = parseInt(izquierda) * parseInt(derecha);
          aux.push(derecha);
        }

        if (operacion == '+') {
          derecha = parseInt(izquierda) + parseInt(derecha);
          aux.push(derecha);
        }

        if (operacion == '-') {
          derecha = parseInt(izquierda) - parseInt(derecha);
          aux.push(derecha);
        }

      }
    }
    return derecha;
  }

}

const arbol = new Arbol();

btnSend.addEventListener('click', () => {
  const input = document.getElementById('input').value;
  let expresion = input.split('');
  //console.log(expresion);

  arbol.agregar(expresion);





  /*
  for (let i = 0; i < expresion.length; i++) {
    if (expresion[i].match(numero)) {
      let nodo = new Nodo(parseInt(expresion[i]));
      console.log(i + ' ' + expresion[i]);
      arbol.agregar(nodo);
    } else {
      let nodo = new Nodo(expresion[i]);
      console.log(i + ' ' + expresion[i]);
      arbol.agregar(nodo);
    }
    //  let nodo = new Nodo(i);

  }
  */

  console.log('PREORDER: ');
  arbol.preorder();
  console.log('POSORDER');
  arbol.posorder();

  console.log('solucion con serial de preorder:');
  console.log(arbol.sPreOrder());
  console.log('solucion con serial de postorder:');
  console.log(arbol.sPosOrder());

});