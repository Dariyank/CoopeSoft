/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { createClient } from '@supabase/supabase-js';
import {Prestamo } from '@/app/Context/prestamoContext'

const supabase = createClient("https://akufmgyltmzzfypsqmll.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrdWZtZ3lsdG16emZ5cHNxbWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNDU0MDksImV4cCI6MjA0ODkyMTQwOX0.kb_JHFPDDkh2VSQ9z3FvPRQ_DEpgh1ryGYZQvqjdh84")

// if(Cookies.get('userType'))


// Función para obtener la fecha actual en formato AAAA-MM-DD
async function obtenerFechaActual() {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11, ajustado +1
  const día = String(hoy.getDate()).padStart(2, '0');
  return `${año}-${mes}-${día}`;
}

export const obtenerCooperativa = async (correo: string) => {
  try {
    // Realizar la consulta para obtener los representantes de la cooperativa
    const { data, error } = await supabase
      .from('cooperativa')  // Nombre de la tabla de representantes
      .select('*')             // Obtener todas las columnas, ajusta según necesites
      .eq('correo', correo)
      .single();  // Filtrar por el ID de la cooperativa

    if (error) {
      throw new Error(`Error al obtener socios: ${error.message}`);
    }

    // Si no hay representantes, retornar un mensaje vacío
    if (data?.length === 0) {
      return { success: false, message: 'No se encontraron socios.' };
    }

    return { success: true, data };
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error('Error en obtenerSocio:', error.message);
      return { success: false, error: error.message };
    }
    console.error('Error desconocido:', error);
    return { success: false, error: 'Error desconocido' };
  }
};


/**
 * HAce un insert para crear al socio
 * @param formData - Una list de datos que seran los que se utilizaran para crear el Socio
 * @returns 
 */
export const crearCooperativa = async (
  formData: {
    nombre: string;
    correo: string;
    rnc: string
    localizacion: string;
    contacto: string;
    contrasena: string
  }
) => {
  try {

    // Preparamos los datos para el insert
    const {
      nombre,
      correo,
      rnc,
      localizacion,
      contacto,
      contrasena,
    } = formData;

    // Realizamos el insert en la tabla socio
    const { data, error } = await supabase
      .from("cooperativas")
      .insert([
        {
          nombre,
          correo,
          rnc,
          localizacion,
          contacto,
          contrasena,
        },
      ])
      .select("cooperativaid, nombre, correo, rnc, localizacion, contacto, contrasena");;
    
    if (error) {
      throw new Error(`Error al registrar cooperativa: ${error.message}`);
    }

    return { success: true, data};
  } catch (error: unknown) {
    console.error(
      "Error en crearCooperativa:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}

/**
 * Obtiene todos los representantes de una cooperativa específica.
 * @param cooperativaID - El ID de la cooperativa para la que se desean obtener los representantes.
 * @returns Una lista de representantes o un error si la consulta falla.
 */
export const obtenerSociosPorCooperativa = async (cooperativaID: string) => {
  try {
    // Realizar la consulta para obtener los representantes de la cooperativa
    const { data, error } = await supabase
      .from('socios')  // Nombre de la tabla de representantes
      .select('*')             // Obtener todas las columnas, ajusta según necesites
      .eq('cooperativaid', cooperativaID)
      .order('socioid', { ascending: true }); // Filtrar por el ID de la cooperativa

    if (error) {
      throw new Error(`Error al obtener socios: ${error.message}`);
    }

    // Si no hay representantes, retornar un mensaje vacío
    if (data?.length === 0) {
      return { success: false, message: 'No se encontraron socios.' };
    }

    return { success: true, data };
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error('Error en obtenerSociosPorCooperativa:', error.message);
      return { success: false, error: error.message };
    }
    console.error('Error desconocido:', error);
    return { success: false, error: 'Error desconocido' };
  }
};

/**
 * Obtiene todos los representantes de una cooperativa específica.
 * @param cooperativaID - El ID de la cooperativa para la que se desean obtener los representantes.
 * @returns Una lista de representantes o un error si la consulta falla.
 */
export const obtenerRepresentantesPorCooperativa = async (cooperativaID: string) => {
  try {
    // Realizar la consulta para obtener los representantes de la cooperativa
    const { data, error } = await supabase
      .from('representantes')  // Nombre de la tabla de representantes
      .select('*')             // Obtener todas las columnas, ajusta según necesites
      .eq('cooperativaid', cooperativaID)
      .order('representanteid', { ascending: true }); // Filtrar por el ID de la cooperativa

    if (error) {
      throw new Error(`Error al obtener socios: ${error.message}`);
    }

    // Si no hay representantes, retornar un mensaje vacío
    if (data?.length === 0) {
      return { success: false, message: 'No se encontraron representantes.' };
    }

    return { success: true, data };
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error('Error en obtenerRepresentantesPorCooperativa:', error.message);
      return { success: false, error: error.message };
    }
    console.error('Error desconocido:', error);
    return { success: false, error: 'Error desconocido' };
  }
};

/**
 * Obtiene todos los representantes de una cooperativa específica.
 * @param socioID - El ID de la cooperativa para la que se desean obtener los representantes.
 * @returns Una lista de representantes o un error si la consulta falla.
 */
export const obtenerSocio = async (socioID: string) => {
  try {
    // Realizar la consulta para obtener los representantes de la cooperativa
    const { data, error } = await supabase
      .from('socios')  // Nombre de la tabla de representantes
      .select('*')             // Obtener todas las columnas, ajusta según necesites
      .eq('socioid', socioID);  // Filtrar por el ID de la cooperativa

    if (error) {
      throw new Error(`Error al obtener socios: ${error.message}`);
    }

    // Si no hay representantes, retornar un mensaje vacío
    if (data?.length === 0) {
      return { success: false, message: 'No se encontraron socios.' };
    }

    return { success: true, data };
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error('Error en obtenerSocio:', error.message);
      return { success: false, error: error.message };
    }
    console.error('Error desconocido:', error);
    return { success: false, error: 'Error desconocido' };
  }
};

/**
 * Obtiene todos los representantes de una cooperativa específica.
 * @param RepresentanteID - El ID de el representante para la que se desean obtener los datos.
 * @returns Una lista de representantes o un error si la consulta falla.
 */
export const obtenerRepresentante= async (RepresentanteID: string) => {
  try {
    // Realizar la consulta para obtener los representantes de la cooperativa
    const { data, error } = await supabase
      .from('representantes')  // Nombre de la tabla de representantes
      .select('*')             // Obtener todas las columnas, ajusta según necesites
      .eq('representanteid', RepresentanteID);  // Filtrar por el ID de la cooperativa

    if (error) {
      throw new Error(`Error al obtener representante: ${error.message}`);
    }

    // Si no hay representantes, retornar un mensaje vacío
    if (data?.length === 0) {
      return { success: false, message: 'No se encontraron representantes.' };
    }

    return { success: true, data };
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error('Error en obtenerRepresentante:', error.message);
      return { success: false, error: error.message };
    }
    console.error('Error desconocido:', error);
    return { success: false, error: 'Error desconocido' };
  }
};

/**
 * Obtiene todos los representantes de una cooperativa específica.
 * @param socioID - El ID de la cooperativa para la que se desean obtener los representantes.
 * @returns Una lista de representantes o un error si la consulta falla.
 */
export const obtenerMovimiento = async (movimientoID: string) => {
  try {
    const { data, error } = await supabase
      .from('transacciones') // Tabla principal
      .select('transaccionid, socios(nombre), representantes(nombre), tipo, monto, fecha, estado, descripcion')
      .eq('estado', '1')
      .eq('transaccionid', movimientoID);

    
    if (error) {
      throw new Error(`Error al obtener movimiento ${error.message}`);
    }

    // Si no hay representantes, retornar un mensaje vacío
    if (data == null || data == undefined) {
      return { success: false };
    }

    // Asumiendo que data tiene al menos un elemento, obtener el primer movimiento
    return { success: true, data };
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error('Error en obtenerMovimiento:', error.message);
      return { success: false, error: error.message };
    }
    console.error('Error desconocido:', error);
    return { success: false, error: 'Error desconocido' };
  }
};

/**
 * Obtiene todos los representantes de una cooperativa específica.
 * @param socioID - El ID de la cooperativa para la que se desean obtener los representantes.
 * @returns Una lista de representantes o un error si la consulta falla.
 */
export const obtenerPrestamo = async (movimientoID: string) => {
  try {
    const { data, error } = await supabase
      .from('prestamos') // Tabla principal
      .select('prestamoid, socioid, socios(nombre, correo), representanteid, representantes(nombre),tiempo, totalprestado, totaloriginal, taza, fecha, montomensual')
      .eq('prestamoid', movimientoID);

    
    if (error) {
      throw new Error(`Error al obtener movimiento ${error.message}`);
    }

    // Si no hay representantes, retornar un mensaje vacío
    if (data == null || data == undefined) {
      return { success: false };
    }

    // Asumiendo que data tiene al menos un elemento, obtener el primer movimiento
    return { success: true, data };
  } catch (error: unknown) {
    // Manejo de errores
    if (error instanceof Error) {
      console.error('Error en obtenerMovimiento:', error.message);
      return { success: false, error: error.message };
    }
    console.error('Error desconocido:', error);
    return { success: false, error: 'Error desconocido' };
  }
};

/**
 * Obtiene todos los representantes de una cooperativa específica.
 * @param socioID - El ID del socio para la que se desean obtener los movimientos.
 * @returns Una lista de movimientos o un error si la consulta falla.
 */
export const obtenerTransaccionesPorSocio = async (socioID: string) => {
  try {
    // Realizar la consulta a la tabla 'transacciones' filtrando por 'socioID'
    const { data, error } = await supabase
      .from('transacciones')  // Nombre de la tabla de transacciones
      .select('*')             // Obtener todas las columnas
      .eq('socioid', socioID)
      .order('transaccionid', { ascending: false }); // Filtrar por el ID del socio

    // Manejo de error
    if (error) {
      throw new Error(`Error al obtener transacciones: ${error.message}`);
    }

    return { success: true, data };  // Retornar los datos de las transacciones
  } catch (error: unknown) {
    console.error('Error en obtenerTransaccionesPorSocio:', error instanceof Error ? error.message : 'Error desconocido');
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

/**
 * Obtiene todos los representantes de una cooperativa específica.
 * @param representanteID - El ID del representante para la que se desean obtener los movimientos.
 * @returns Una lista de movimientos o un error si la consulta falla.
 */
export const obtenerTransaccionesPorRepresentante = async (representanteID: string) => {
  try {
    // Realizar la consulta a la tabla 'transacciones' filtrando por 'socioID'
    const { data, error } = await supabase
      .from('transacciones')  
      .select('transaccionid, socios(nombre), representanteid, monto, tipo, fecha, estado, descripcion')             // Obtener todas las columnas
      .eq('representanteid', representanteID)
      .order('transaccionid', { ascending: false }); // Filtrar por el ID del socio
    // Manejo de error
    if (error) {
      throw new Error(`Error al obtener transacciones: ${error.message}`);
    }

    return { success: true, data };  // Retornar los datos de las transacciones
  } catch (error: unknown) {
    console.error('Error en obtenerTransaccionesPorRepresentante:', error instanceof Error ? error.message : 'Error desconocido');
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

/**
 * Obtiene el prestamo de un socio en específico.
 * @param formDataInsert - Estos son los valores a insertar en la tabla.
 * @returns 
 */
export const obtenerPrestamosPorSocio = async (socioID: string) => {
  // Simula la llamada a una API para obtener los préstamos de un socio por su ID
  try {
    const { data, error } = await supabase
      .from('prestamos')  // Nombre de la tabla de transacciones
      .select('*')             // Obtener todas las columnas
      .eq('socioid', socioID) // Filtrar por el ID del socio

    if (error) {
      throw new Error(`Error al obtener prestamos: ${error.message}`);
    }

    return { success: true, data };  // Retornar los datos de las transacciones
  } catch (error: unknown) {
    console.error('Error en obtenerPrestamosPorSocio:', error instanceof Error ? error.message : 'Error desconocido');
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};


/**
 * Obtiene el prestamo de un socio en específico.
 * @param formDataInsert - Estos son los valores a insertar en la tabla.
 * @returns 
 */
export const obtenerPrestamosPorCooperativa = async (cooperativaId: string) => {
  // Simula la llamada a una API para obtener los préstamos de un socio por su ID
  try {
    const { data, error } = await supabase
    .from('prestamos')
    .select('prestamoid, socioid, socios(nombre, correo), totaloriginal, taza, fecha') 
    .eq('cooperativaid', cooperativaId)
    .order('prestamoid', { ascending: true });

    if (error) {
      throw new Error(`Error al obtener prestamos: ${error.message}`);
    }

    return { success: true, data };  // Retornar los datos de las transacciones
  } catch (error: unknown) {
    console.error('Error en obtenerPrestamosPorCooperativa:', error instanceof Error ? error.message : 'Error desconocido');
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

/**
 * Obtiene el prestamo de un socio en específico.
 * @param formDataInsert - Estos son los valores a insertar en la tabla.
 * @returns 
 */
export const obtenerTrasaccionesPorCooperativa = async (cooperativaId: string) => {
  // Simula la llamada a una API para obtener los préstamos de un socio por su ID
  try {
    const { data, error } = await supabase
    .from('transacciones')
    .select('*') 
    .eq('cooperativaid', cooperativaId)
    .order('prestamoid', { ascending: true });

    if (error) {
      throw new Error(`Error al obtener transacciones: ${error.message}`);
    }

    return { success: true, data };  // Retornar los datos de las transacciones
  } catch (error: unknown) {
    console.error('Error en obtenerTrasaccionesPorCooperativa:', error instanceof Error ? error.message : 'Error desconocido');
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

/**
 * Actualiza el valor de totalprestado en tabla prestamos
 * @param socioID - El ID de la cooperativa para la que se desean obtener los representantes.
 * @returns Un objeto con los nuevos valores de prestamo
 */
export const actualizarPrestamopendiente = async (socioID: string): Promise<{ success: boolean, data?: Prestamo, error?: string }> => {
  try {
    // Paso 1: Obtener el único préstamo del socio
    const { data: prestamos, error: prestamosError } = await supabase
      .from('prestamos')
      .select('prestamoid, totaloriginal, totalprestado')
      .eq('socioid', socioID)
      .single();  // Solo esperamos un único préstamo

    if (prestamosError) {
      throw new Error(`Error al obtener el préstamo: ${prestamosError.message}`);
    }
    // Si no hay préstamo para el socio
    if (!prestamos) {
      return { success: false, error: 'No se encontró un préstamo para el socio.' };
    }

    // Paso 2: Obtener las transacciones asociadas a este préstamo
    const { data: transacciones, error: transaccionesError } = await supabase
      .from('transacciones')
      .select('prestamoid, monto')
      .eq('prestamoid', prestamos.prestamoid)
      .eq('tipo', 'PagoPrestamo')
      .eq('estado', '1');

    if (transaccionesError) {
      throw new Error(`Error al obtener transacciones: ${transaccionesError.message}`);
    }

    // Paso 3: Calcular el monto total pagado
    const montoPagado = transacciones.reduce((total: number, transaccion: any) => total + transaccion.monto, 0);


    // Paso 4: Calcular el nuevo totalprestado
    const totalPrestadoActualizado = prestamos.totaloriginal- montoPagado;

    // Paso 5: Actualizar el préstamo en la base de datos
    const { error: updateError } = await supabase
      .from('prestamos')
      .update({ totalprestado: totalPrestadoActualizado })
      .eq('prestamoid', prestamos.prestamoid);

    if (updateError) {
      throw new Error(`Error al actualizar el préstamo: ${updateError.message}`);
    }

    // Paso 6: Obtener el préstamo actualizado desde la base de datos
    const { data: prestamoActualizado, error: getPrestamoError } = await supabase
      .from('prestamos')
      .select('*')
      .eq('prestamoid', prestamos.prestamoid)
      .single();

    if (getPrestamoError) {
      throw new Error(`Error al obtener el préstamo actualizado: ${getPrestamoError.message}`);
    }

    // Paso 7: Retornar el préstamo completo actualizado
    return { success: true, data: prestamoActualizado as Prestamo };

  } catch (error: unknown) {
    console.error('Error al actualizar total prestado por socio:', error instanceof Error ? error.message : 'Error desconocido');
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

/**
 * HAce un insert para crear al socio
 * @param formData - Una list de datos que seran los que se utilizaran para crear el Socio
 * @returns 
 */
export const insertarSocio = async (
  formData: {
    nombre: string;
    cooperativaid: number;
    genero: string;
    edad: number;
    direccion: string;
    correo: string;
    telefono: string;
    montoahorrado: number;
    empresa: string;
    salario: number;
    cedula: string;
  }
) => {
  try {

    // Preparamos los datos para el insert
    const {
      nombre,
      cooperativaid,
      genero,
      edad,
      direccion,
      correo,
      telefono,
      montoahorrado,
      empresa,
      salario,
      cedula
    } = formData;

    // Obtenemos la fecha actual
    const fechaCreacion = await obtenerFechaActual();
    const generoData =  genero == 'masculino' ? 'M':
                        genero == 'femenino' ? 'F' :
                        'X';

    // Realizamos el insert en la tabla socio
    const { data, error } = await supabase
      .from("socios")
      .insert([
        {
          nombre,
          cooperativaid,
          genero: generoData,
          edad,
          direccion,
          correo,
          telefono,
          montoahorrado,
          empresa,
          salario,
          cedula,
          registro: fechaCreacion,
        },
      ]);
    
    if (error) {
      throw new Error(`Error al insertar el socio: ${error.message}`);
    }

    console.log("Socio insertado con éxito:", data);
    return { success: true};
  } catch (error: unknown) {
    console.error(
      "Error en insertarSocio:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}

export const actualizarSocio = async (
  socioID: string,
  formData: {
    nombre: string;
    cooperativaid: number;
    genero: string;
    edad: number;
    direccion: string;
    correo: string;
    telefono: string;
    montoahorrado: number;
    empresa: string;
    salario: number;
    cedula: string;
  }
) => {
  try {

    // Preparamos los datos para el insert
    const {
      nombre,
      cooperativaid,
      genero,
      edad,
      direccion,
      correo,
      telefono,
      montoahorrado,
      empresa,
      salario,
      cedula
    } = formData;

    // Obtenemos la fecha actual
    const fechaCreacion = await obtenerFechaActual();
    const generoData =  genero == 'masculino' ? 'M':
                        genero == 'femenino' ? 'F' :
                        'X';

    // Realizamos el insert en la tabla socio
    const { data, error } = await supabase
      .from("socios")
      .update([
        {
          nombre,
          cooperativaid,
          genero: generoData,
          edad,
          direccion,
          correo,
          telefono,
          montoahorrado,
          empresa,
          salario,
          cedula,
          fechaactualizacion: fechaCreacion,
        },
      ])
      .eq("socioid", socioID);
    
    if (error) {
      throw new Error(`Error al actualizar el socio: ${error.message}`);
    }

    console.log("Socio insertado con éxito:", data);
    return { success: true};
  } catch (error: unknown) {
    console.error(
      "Error en actualizarSocio:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}

export const insertarTransaccion = async (
  socioID: string,
  formData: {
    representanteid: number,
    prestamoid: number,
    monto: number,
    tipo: string,
    estado: string,
    descripcion: string
    cooperativaid: number
  }
) => {
  try {

    // Obtenemos la fecha actual
    const fechaCreacion = await obtenerFechaActual();

    // Preparamos los datos para el insert
    const {
      representanteid,
      prestamoid: rawPrestamoid,
      monto,
      tipo,
      estado = 1,
      descripcion,
      cooperativaid = 1
    } = formData;

    const prestamoid = rawPrestamoid === 0 ? null : rawPrestamoid;

    // Realizamos el insert en la tabla socio
    const { data, error } = await supabase
      .from("transacciones")
      .insert([
        {
          socioid: socioID,
          representanteid,
          prestamoid,
          monto,
          tipo,
          fecha:  fechaCreacion,
          estado,
          descripcion,
          cooperativaid
        }
      ])
      .eq("socioid", socioID);
    
    if (error) {
      throw new Error(`Error al crear el transaccion: ${error.message}`);
    }

    console.log("Transaccion creado con éxito:", data);
    return { success: true};
  } catch (error: unknown) {
    console.error(
      "Error en insertarPrestamo:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}

/**
 * HAce un insert para crear al socio
 * @param formData - Una list de datos que seran los que se utilizaran para crear el Socio
 * @returns 
 */
export const insertarRepresentante = async (
  formData: {
    nombre: string,
    cooperativaid: number,
    genero: string,
    edad: number,
    direccion: string,
    correo: string,
    telefono: string,
    contrasena: string,
  }
) => {
  try {

    // Preparamos los datos para el insert
    const {
      nombre,
      cooperativaid,
      genero,
      edad,
      direccion,
      correo,
      telefono,
      contrasena,
    } = formData;

    // Obtenemos la fecha actual
    const generoData =  genero == 'masculino' ? 'M':
                        genero == 'femenino' ? 'F' :
                        'X';

    // Realizamos el insert en la tabla socio
    const { data, error } = await supabase
      .from("representantes")
      .insert([
        {
          nombre,
          cooperativaid,
          genero: generoData,
          edad,
          direccion,
          correo,
          telefono,
          contrasena,
        },
      ]);
    
    if (error) {
      throw new Error(`Error al insertar el representante: ${error.message}`);
    }

    console.log("Representante insertado con éxito:", data);
    return { success: true};
  } catch (error: unknown) {
    console.error(
      "Error en insertarRepresentante:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}

export const actualizarRepresentante = async (
  representanteID: string,
  formData: {
    nombre: string,
    cooperativaid: number,
    genero: string,
    edad: number,
    direccion: string,
    correo: string,
    telefono: string,
    contrasena: string,
  }
) => {
  try {

    // Preparamos los datos para el insert
    const {
      nombre,
      cooperativaid,
      genero,
      edad,
      direccion,
      correo,
      telefono,
      contrasena,
    } = formData;

    // Obtenemos la fecha actual
    const generoData =  genero == 'masculino' ? 'M':
                        genero == 'femenino' ? 'F' :
                        'X';

    // Realizamos el insert en la tabla socio
    const { data, error } = await supabase
      .from("representantes")
      .update([
        {
          nombre,
          cooperativaid,
          genero: generoData,
          edad,
          direccion,
          correo,
          telefono,
          contrasena,
        },
      ])
      .eq("representanteid", representanteID);
    
    if (error) {
      throw new Error(`Error al actualizar el representante: ${error.message}`);
    }

    console.log("Representante actualizo con éxito:", data);
    return { success: true};
  } catch (error: unknown) {
    console.error(
      "Error en actualizarRepresentante:",
      error instanceof Error ? error.message : "Error desconocido"
    );
    return { success: false, error: error instanceof Error ? error.message : "Error desconocido" };
  }
}

