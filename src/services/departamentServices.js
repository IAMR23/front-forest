import axios from "./axiosConfig";

export const createDepartamento = async (departamentoData) => {
  try {
    const response = await axios.post("/departamento", departamentoData, {
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

export async function obtenerDepartamentosPorArrendador(userId) {
  try {
    console.log("CP1", userId);
    const response = await axios.get(`/departamentos/arrendador/${userId}`, {
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
    const response = await axios.get(`/departamentos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);

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
      `/departamento/${id}`,
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

/* Admin */

export async function obtenerDepartamentosPorVerificar() {
  try {
    const response = await axios.get(`/departamentos/verificacion`, {
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
    console.log(error);
    throw new Error("Error al obtener los departamentos");
  }
}

export async function obtenerDepartamentos() {
  try {
    const response = await axios.get(`/departamentos`, {
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
    console.log(error);
    throw new Error("Error al obtener los departamentos");
  }
}
