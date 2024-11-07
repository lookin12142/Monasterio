export interface User {
  id: number;
  name: string;
  phonenumber: string;
  dni: string;
  email: string;
  isadmin: boolean;
  modules: {
    ventas: {
      access: boolean;
      reposteria: boolean;
      manualidades: boolean;
    };
    alquiler: {
      access: boolean;
      santaCatalina: boolean;
      santaTeresa: boolean;
      goyoneche: boolean;
    };
    monasterio: {
      access: boolean;
    };
    museo: {
      access: boolean;
    };
    administrador: {
      access: boolean;
      reposteria: boolean;
      manualidades: boolean;
      misa: boolean;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}
