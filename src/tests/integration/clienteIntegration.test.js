const request = require("supertest");
const app = require("../../app");
const clienteModel = require("../../models/clienteModel");

// Mockup de Autenticación
jest.mock("express-oauth2-jwt-bearer", () => ({
    auth: jest.fn((req, res, nextFunction) => typeof nextFunction === 'function' ? nextFunction() : null),
    requiredScopes: jest.fn((scopes) => (req, res, nextFunction) => typeof nextFunction === 'function' ? nextFunction() : null),
  }));

// Mockup de Mongoose
jest.mock("../../models/clienteModel");

describe("Cliente API", () => {
  // Test para GET /api/clientes
  test("GET /api/clientes debería obtener todos los clientes", async () => {
    // Datos de clientes simulados
    const mockClientes = [
      { id: "1", name: "Cliente 1" },
      { id: "2", name: "Cliente 2" },
    ];

    // Configuración del valor de retorno para el método find
    clienteModel.find.mockResolvedValue(mockClientes);

    // Realizar la solicitud al endpoint
    const response = await request(app).get("/api/clientes");

    // Verificar el código de estado, el cuerpo de la respuesta y el número de llamadas al método find
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockClientes);
    expect(clienteModel.find).toHaveBeenCalledTimes(1);
  });

  // Test para POST /api/clientes
  test("POST /api/clientes debería crear un nuevo cliente", async () => {
    // Datos del cliente a crear
    const clienteCreado = { id: "1", name: "Nuevo Cliente" };

    // Configuración del valor de retorno para el método create
    clienteModel.create.mockResolvedValue(clienteCreado);

    // Realizar la solicitud al endpoint con el cliente a crear
    const response = await request(app).post("/api/clientes").send(clienteCreado);

    // Verificar el código de estado, el cuerpo de la respuesta y el número de llamadas al método create
    expect(response.status).toBe(201);
    expect(response.body).toEqual(clienteCreado);
    expect(clienteModel.create).toHaveBeenCalledTimes(1);
    expect(clienteModel.create).toHaveBeenCalledWith(clienteCreado);
  });
});
