const{
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} = require("../../controllers/clienteController");

const clienteModel = require("../../models/clienteModel");

jest.mock("../../models/clienteModel");

describe("Cliente Controller", () => {
  test("getAllClientes debería obtener todos los clientes", async () => {
    const mockClientes = [
      { id: "1", name: "Cliente 1" },
      { id: "2", name: "Cliente 2" },
    ];

    clienteModel.find.mockResolvedValue(mockClientes);

    const mockReq = {};

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllClientes(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockClientes);
  });

  test("getClienteById debería obtener un cliente", async () => {
    const mockCliente = { id: "1", name: "Cliente Encontrado" };

    clienteModel.findById.mockResolvedValue(mockCliente);

    const mockReq = { params: { id: "1" } };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getClienteById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockCliente);
  });

  test("createCliente debería manejar errores al crear un nuevo cliente", async () => {
    const errorMock = new Error("Error al crear el cliente");
    clienteModel.create.mockRejectedValue(errorMock);
  
    const mockReq = { body: { id: "1", name: "Nuevo Cliente" } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    await createCliente(mockReq, mockRes);
  
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Error al crear el cliente" });
  });

  test("updateCliente debería actualizar un cliente existente", async () => {
    const clienteId = '1';
    const clienteActualizado = { name: 'Cliente Actualizado' };
    const clienteActualizadoMock = { _id: clienteId, ...clienteActualizado };

    clienteModel.findByIdAndUpdate.mockResolvedValue(clienteActualizadoMock);

    const mockReq = { params: { id: "1" }, body: clienteActualizado };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await updateCliente(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(clienteActualizadoMock);
  });

  test("deleteCliente debería manejar errores al eliminar un cliente", async () => {
    const clienteId = '1';
    const errorMock = new Error("Error al eliminar el cliente");
    clienteModel.findByIdAndRemove.mockRejectedValue(errorMock);
  
    const mockReq = { params: { id: clienteId } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await deleteCliente(mockReq, mockRes);
  
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Error al eliminar el cliente" });
  });

});

