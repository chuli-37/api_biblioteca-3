const request = require("supertest");
const app = require("../../app");
const clienteModel = require("../../models/clienteModel");

// Mockup de Autenticación
jest.mock("express-oauth2-jwt-bearer", () => {
  return {
    auth: jest.fn().mockImplementation(() => (req, res, next) => next()),
    requiredScopes: jest.fn().mockImplementation(() => (req, res, next) => next()),
  }
})

//Mockup de Mongoose
jest.mock("../../models/clienteModel");

describe("Cliente API", () => {
  test("GET /clientes debería obtener todos los clientes", async () => {
    const mockClientes = [
      { id: "1", name: "Cliente 1" },
      { id: "2", name: "Cliente 2" },
    ];

    clienteModel.find.mockResolvedValue(mockClientes);

    const response = await request(app).get("/api/clientes");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockClientes);
    expect(clienteModel.find).toHaveBeenCalledTimes(1);
  });
  
  test("POST /clientes debería crear un nuevo cliente", async () => {
    const clienteCreado = { id: "1", name: "Nuevo Cliente" };
    const clienteMock = {
      ...clienteCreado,
      save: () => {}
    };

    clienteModel.create.mockResolvedValue(clienteMock);

    const response = await request(app).post("/api/clientes").send(clienteMock);
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual(clienteCreado);
    expect(clienteModel.create).toHaveBeenCalledTimes(1);
    expect(clienteModel.create).toHaveBeenCalledWith(clienteCreado);

  });
});