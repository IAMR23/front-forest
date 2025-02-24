import axios from "./axiosConfig";

export const createDepartamento = async (departamentoData) => {
  try {
    const response = await axios.post("/departamentos", departamentoData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el departamento:", error);
    throw error;
  }
};

export async function obtenerDepartamentosPorArrendador() {
  try {
    const response = await axios.get(`/departamentosArrendador`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al decodificar el token o al hacer la solicitud:",
      error
    );
    throw new Error("Error al obtener los departamentos");
  }
}

export async function obtenerDepartamento(id) {
  try {
    const response = await axios.get(`/api/departamentos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    console.error(
      "Error al decodificar el token o al hacer la solicitud:",
      error
    );
    throw new Error("Error al obtener los departamentos");
  }
}

export const updateDepartament = async (id, departamentoData) => {
  try {
    console.log(id);
    const response = await axios.patch(
      `/actualizarDep/${id}`,
      departamentoData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el departamento:", error);
    throw error;
  }
};
