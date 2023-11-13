import Paso from "../bot/pasos/paso.js";
import PasoOpciones from "../bot/pasos/pasoOpciones.js";
import PasoQuery from "../bot/pasos/pasoQuery.js";
import FiltroCelular from "../bot/pasos/filtroCelular.js";
import RegistroCelular from "../bot/pasos/registroCelular.js";
import PasoInput from "../bot/pasos/pasoInput.js";

describe("paso opciones", () => {
  const pInicio = new PasoOpciones(
    "0",
    "inicio",
    "¡Bienvenido al Chatbot de MariangelCell! 😊📱\n¡Hola! Soy tu asistente virtual Mari, estoy aquí para ayudarte con todas tus consultas y necesidades relacionadas con nuestros productos y servicios tecnológicos. 🤖\nNo dudes en preguntarme sobre nuestros últimos modelos de celulares 📲, audífonos 🎧, cámaras fotográficas 📷 y periféricos 🖱️. También puedo ayudarte a conocer nuestro inventario actualizado, registrar tus compras en tienda física 🛒, brindarte información sobre nuestros servicios técnicos 🛠️, y mucho más.\nEstoy aquí para hacer tu experiencia con MariangelCell más fácil y conveniente. ¡Así que adelante! 👍\n\nSelecciona una de las opciones : \n\n"
  );
  const pUbicacion = new Paso("1", "Ubicación", "Aún no implementado");
  const pConsultarProductos = new PasoOpciones(
    "2",
    "Consultar productos",
    "Elija el tipo de producto"
  );
  pInicio.agregarOpcion(pUbicacion, pConsultarProductos);

  test("Ingresa opcion válida", () => {
    const opcionIngresada = "1";
    const siguiente = pInicio.siguientePaso(opcionIngresada);

    expect(siguiente).toBe(pUbicacion);
  });

  test("Ingresa opcion inválida, undefine, no string....", () => {
    let opcionIngresada = 532;
    let siguiente = pInicio.siguientePaso(opcionIngresada);
    expect(siguiente).toBeUndefined();

    opcionIngresada = "hola";
    siguiente = pInicio.siguientePaso(opcionIngresada);
    expect(siguiente).toBeUndefined();

    opcionIngresada = undefined;
    siguiente = pInicio.siguientePaso(opcionIngresada);
    expect(siguiente).toBeUndefined();
  });
});

describe("paso query", () => {
  const filtroCelular = new FiltroCelular();
  const pConsultarCelularesFiltro = new PasoQuery(
    "0",
    "Filtrar",
    "!Perfecto! ¿Qué tipo de celular estás buscando?",
    "_",
    filtroCelular
  );
  const pConsultarCelularesFiltroNuevos = new PasoQuery(
    "1",
    "Nuevo",
    "!Listo!, Por favor elija la capacidad de memoria",
    "tipo",
    filtroCelular
  );

  const pConsultarCelularesFiltroExhibicion = new PasoQuery(
    "2",
    "Exhibición",
    "!Listo!, Por favor elija la capacidad de memoria",
    "tipo",
    filtroCelular
  );
  pConsultarCelularesFiltro.agregarOpcion(
    pConsultarCelularesFiltroNuevos,
    pConsultarCelularesFiltroExhibicion
  );

  test("Ingresa valor inválido para una opción", () => {
    const opcionIngresada = "9";
    const siguiente = pConsultarCelularesFiltro.siguientePaso(opcionIngresada);

    expect(siguiente).toBeUndefined();
    expect(filtroCelular.valores.get("tipo")).toBeNull();
  });

  test("Ingresa valor válido para una opción", () => {
    const opcionIngresada = "1";
    const siguiente = pConsultarCelularesFiltro.siguientePaso(opcionIngresada);

    expect(siguiente).toBe(pConsultarCelularesFiltroNuevos);
    expect(filtroCelular.valores.get("tipo")).toBe("Nuevo");
  });
});

describe("paso input", () => {
  const queryRegistroProductos = new RegistroCelular();

  const pRegistroCelular = new PasoInput(
    "1",
    "Registro de productos",
    "Ingrese el nombre del producto",
    "_",
    queryRegistroProductos
  );
  const pRegistroCelularValor = new PasoInput(
    "2",
    "_",
    "_",
    "nombre",
    queryRegistroProductos
  );
  pRegistroCelular.agregarOpcion(pRegistroCelularValor);

  test("Ingresa algún valor", () => {
    const valorIngresado = "Samsung Galaxy S20";
    const siguiente = pRegistroCelular.siguientePaso(valorIngresado);

    expect(siguiente).toBe(pRegistroCelularValor);
    expect(queryRegistroProductos.valores.get("nombre")).toBe(
      "Samsung Galaxy S20"
    );
  });
});