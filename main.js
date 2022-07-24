const cuotas = [
    {
        id: 1,
        cantidad: 3,
        interes: 1.1
    },
    {
        id: 2,
        cantidad: 6,
        interes: 1.15
    },
    {
        id: 3,
        cantidad: 9,
        interes: 1.20
    },
    {
        id: 4,
        cantidad: 12,
        interes: 1.40
    },
    {
        id: 5,
        cantidad: 24,
        interes: 1.80
    }
]

const clientes = [
    {
        id: 28123456,
        nombre: "juan",
        email: "123@123",
        tel: 456
    }
]

const operaciones = []

const selectCuotas = document.getElementById('selectCuotas')
const inputNombre = document.getElementById('inputNombre')
const inputDni = document.getElementById('inputDni')
const inputEmail = document.getElementById('inputEmail')
const inputTel = document.getElementById('inputTel')
const btnBuscarCliente = document.getElementById('btnBuscarCliente')

const btnConfirmarCLiente = document.getElementById('btnConfirmarCLiente')
const btnCrearCLiente = document.getElementById('btnCrearCLiente')
const btnModificarCLiente = document.getElementById('btnModificarCLiente')

const solicitudCredito = document.getElementById('solicitudCredito')
const inputMontoInicial = document.getElementById('inputMontoInicial')
const spanCuotas = document.getElementById('spanCuotas')
const inputMontoFinal = document.getElementById('inputMontoFinal')
const inputMontoCuota = document.getElementById('inputMontoCuota')
const formOperacion = document.getElementById('formOperacion')
const tablaBody = document.getElementById('tablaBody')

function crearSelectCuotas() {
    for (let cuota of cuotas) {
        selectCuotas.innerHTML += `
            <option value="${cuota.id}">${cuota.cantidad}</option>
        `
    }
}

function buscarCliente(id) {
    let clienteEncontrado = clientes.find(e => e.id == id)
    return clienteEncontrado
}

function guardarCliente() {
    let id = inputDni.value
    let nombre = inputNombre.value
    let email = inputEmail.value
    let tel = inputTel.value
    clientes.push({ id, nombre, email, tel })
}

function capturarOperacion() {
    let dni = inputDni.value
    let montoInicial = inputMontoInicial.value
    let cuota = cuotas.find(e => e.id == selectCuotas.value).cantidad
    let montoFinal = inputMontoFinal.value
    const operacionNueva = { dni, montoInicial, cuota, montoFinal }
    return operaciones.push(operacionNueva)
}

function mostrarOperaciones() {
    tablaBody.innerHTML = ""
    operaciones.forEach((operacion, indice) => {
        tablaBody.innerHTML += `
        <tr class="text-center">
            <th scope="row">${indice}</th>
            <td>${operacion.dni}</td>
            <td>${operacion.montoInicial}</td>
            <td>${operacion.cuota} x ${(operacion.montoFinal / operacion.cuota).toFixed(2)}</td>
            <td>${operacion.montoFinal}</td>
        </tr>
        `
    })
}

crearSelectCuotas()

btnBuscarCliente.addEventListener('click', () => {
    let clienteEncontrado = buscarCliente(inputDni.value)
    inputNombre.value = clienteEncontrado.nombre
    inputNombre.setAttribute("readonly", true)
    inputEmail.value = clienteEncontrado.email
    inputEmail.setAttribute("readonly", true)
    inputTel.value = clienteEncontrado.tel
    inputTel.setAttribute("readonly", true)
})

btnCrearCLiente.addEventListener('click', (e)=>{    
    guardarCliente()
})
btnConfirmarCLiente.addEventListener('click', ()=>{
    formOperacion.removeAttribute("hidden")
})
btnModificarCLiente.addEventListener('click', ()=>{
    inputNombre.removeAttribute("readonly")
    inputEmail.removeAttribute("readonly")
    inputTel.removeAttribute("readonly")
})

selectCuotas.addEventListener('change', (e) => {
    console.log(e.target.value)
    console.log(selectCuotas.value)
    let montoPesos = inputMontoInicial.value
    let cuota = cuotas.find(e => e.id == selectCuotas.value)
    if (montoPesos !== 0) {
        inputMontoFinal.value = parseInt(montoPesos * cuota.interes)
        inputMontoCuota.value = (montoPesos * cuota.interes / cuota.cantidad).toFixed(2)
    }
    spanCuotas.innerText = `${cuota.cantidad} x`
})


inputMontoInicial.addEventListener('input', () => {
    let montoPesos = inputMontoInicial.value
    let cuota = cuotas.find(e => e.id == selectCuotas.value)
    if (selectCuotas.value != 0) {
        inputMontoFinal.value = parseInt(montoPesos * cuota.interes)
        inputMontoCuota.value = (montoPesos * cuota.interes / cuota.cantidad).toFixed(2)
    }
})

formOperacion.addEventListener('submit', e => {
    e.preventDefault()
    capturarOperacion()
    mostrarOperaciones()
    console.log(operaciones)
})