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
        id: '28123456',
        nombre: "juan",
        email: "123@123",
        tel: 456
    }
]

const operaciones = []

const formCliente = document.getElementById('formCliente')
const formOperacion = document.getElementById('formOperacion')
const tablaBody = document.getElementById('tablaBody')


const inputNombre = document.getElementById('inputNombre')
const inputDni = document.getElementById('inputDni')
const inputEmail = document.getElementById('inputEmail')
const inputTel = document.getElementById('inputTel')
const btnBuscarCliente = document.getElementById('btnBuscarCliente')

const btnSolicitarPrestamo = document.getElementById('btnSolicitarPrestamo')
const btnConfirmarCliente = document.getElementById('btnConfirmarCliente')
const btnCrearCliente = document.getElementById('btnCrearCliente')
const btnModificarCliente = document.getElementById('btnModificarCliente')

const idUsuario = document.getElementById('idUsuario')
const inputMontoInicial = document.getElementById('inputMontoInicial')
const inputMontoFinal = document.getElementById('inputMontoFinal')
const inputMontoCuota = document.getElementById('inputMontoCuota')
const selectCuotas = document.getElementById('selectCuotas')
const solicitudCredito = document.getElementById('solicitudCredito')
const spanCuotas = document.getElementById('spanCuotas')



function guardarStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor))
}

function recuperarStorage(clave) {
    return JSON.parse(localStorage.getItem(clave)) || []
}

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
    const indice = clientes.findIndex(e => e.id === id)
    indice === -1 ? clientes[indice] = { id, nombre, email, tel } : clientes.push({ id, nombre, email, tel })
    guardarStorage('clientes', clientes)
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

function bloquearInputs() {
    inputNombre.setAttribute("readonly", true)
    inputEmail.setAttribute("readonly", true)
    inputTel.setAttribute("readonly", true)
}

function calcularPrestamos() {
    let cuotasInput = selectCuotas.value
    let montoPesos = inputMontoInicial.value
    let cuota = cuotas.find(e => e.id == cuotasInput)
    console.log(montoPesos)
    console.log(cuotasInput)
    if (montoPesos != 0 && cuotasInput != 0) {
        inputMontoFinal.value = parseInt(montoPesos * cuota.interes)
        inputMontoCuota.value = (montoPesos * cuota.interes / cuota.cantidad).toFixed(2)
        spanCuotas.innerText = `${cuota.cantidad} x`
    }
}

crearSelectCuotas()

btnBuscarCliente.addEventListener('click', (e) => {
    e.preventDefault()
    let clienteEncontrado = buscarCliente(inputDni.value)
    if (clienteEncontrado !== undefined) {
        bloquearInputs()
        inputNombre.value = clienteEncontrado.nombre
        inputEmail.value = clienteEncontrado.email
        inputTel.value = clienteEncontrado.tel
        btnSolicitarPrestamo.removeAttribute("hidden")
        btnModificarCliente.removeAttribute("hidden")
        btnCrearCliente.hidden = true
    } else {
        btnCrearCliente.removeAttribute("hidden")
        btnConfirmarCliente.hidden = true
        btnModificarCliente.hidden = true
    }
})

btnSolicitarPrestamo.addEventListener("click", (e) => {
    e.preventDefault()
    formCliente.hidden = true
    formOperacion.removeAttribute("hidden")
    idUsuario.value = inputDni.value
})

btnCrearCliente.addEventListener('click', (e) => {
    e.preventDefault()
    guardarCliente()
    formOperacion.removeAttribute("hidden")
})

btnConfirmarCliente.addEventListener('click', (e) => {
    e.preventDefault()
    guardarCliente()
    bloquearInputs()
    btnConfirmarCliente.hidden = true
    btnSolicitarPrestamo.removeAttribute("hidden")
})

btnModificarCliente.addEventListener('click', (e) => {
    e.preventDefault()
    inputNombre.removeAttribute("readonly")
    inputEmail.removeAttribute("readonly")
    inputTel.removeAttribute("readonly")
    btnModificarCliente.hidden = true
    btnSolicitarPrestamo.hidden = true
    btnConfirmarCliente.removeAttribute("hidden")
})

selectCuotas.addEventListener('change', (e) => {
    console.log(e.target.value)
    console.log(selectCuotas.value)
    calcularPrestamos()

})


inputMontoInicial.addEventListener('input', () => {
    calcularPrestamos()
})

formOperacion.addEventListener('submit', e => {
    e.preventDefault()
    capturarOperacion()
    mostrarOperaciones()
    console.log(operaciones)
})