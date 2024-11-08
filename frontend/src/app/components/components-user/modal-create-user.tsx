"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Checkbox from "../ui/checkbox";
import { User } from '@/app/lib/interfaces';

type ModuleKeys = 'administrativo' | 'ventas' | 'alquileres';
type PermissionKeys = 'misa' | 'reposteria' | 'manualidades' | 'santaCatalina' | 'goyoneche' | 'santaMarta' | 'usersgroups';

type ModulesState = {
  [key in ModuleKeys]: {
    [key in PermissionKeys]?: boolean;
  };
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<User, "createdAt" | "updatedAt">) => void; 
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isAdmin, setIsAdmin] = useState(false); 
  const [modules, setModules] = useState<ModulesState>({
    administrativo: { usersgroups: false},
    ventas: { misa: false, reposteria: false, manualidades: false },
    alquileres: { santaCatalina: false, goyoneche: false, santaMarta: false },
  });

  const handleModuleChange = (module: ModuleKeys, permission: PermissionKeys) => {
    setModules((prevModules) => ({
      ...prevModules,
      [module]: {
        ...prevModules[module],
        [permission]: !prevModules[module][permission],
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const formData: Record<string, unknown> = Object.fromEntries(data.entries());

    formData.isadmin = isAdmin;
    formData.modules = modules; 
    onSubmit(formData as Omit<User, "createdAt" | "updatedAt">); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Usuario</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phonenumber">Número de Teléfono</Label>
            <Input id="phonenumber" name="phonenumber" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dni">DNI</Label>
            <Input id="dni" name="dni" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isadmin">Administrador</Label>
            <Checkbox
              id="isadmin"
              name="isadmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)} 
            />
          </div>
          <div className="space-y-2">
            <Label>Módulos</Label>
            {/* Módulo Administrativo */}
            <div>
              <h3>Administrativo</h3>
              <Checkbox
                id="admin-access"
                name="admin-access"
                checked={modules.administrativo.usersgroups}
                onChange={() => handleModuleChange('administrativo', 'usersgroups')}
              />
              <Label htmlFor="ventas-access">usersgroups</Label>
            </div>
            {/* Módulo Ventas */}
            <div> 
              <h3>Ventas</h3>
              <Checkbox
                id="ventas-access"
                name="ventas-access"
                checked={modules.ventas.misa}
                onChange={() => handleModuleChange('ventas', 'misa')}
              />
              <Label htmlFor="ventas-access">misa</Label>
              <Checkbox
                id="ventas-reposteria"
                name="ventas-reposteria"
                checked={modules.ventas.reposteria}
                onChange={() => handleModuleChange('ventas', 'reposteria')}
              />
              <Label htmlFor="ventas-reposteria">Repostería</Label>
              <Checkbox
                id="ventas-manualidades"
                name="ventas-manualidades"
                checked={modules.ventas.manualidades}
                onChange={() => handleModuleChange('ventas', 'manualidades')}
              />
              <Label htmlFor="ventas-manualidades">Manualidades</Label>
            </div>
            {/* Módulo Alquileres */}
            <div>
              <h3>Alquileres</h3>
              <Checkbox
                id="alquileres-santaCatalina"
                name="alquileres-santaCatalina"
                checked={modules.alquileres.santaCatalina}
                onChange={() => handleModuleChange('alquileres', 'santaCatalina')}
              />
              <Label htmlFor="alquileres-santaCatalina">Santa Catalina</Label>
              <Checkbox
                id="alquileres-goyoneche"
                name="alquileres-goyoneche"
                checked={modules.alquileres.goyoneche}
                onChange={() => handleModuleChange('alquileres', 'goyoneche')}
              />
              <Label htmlFor="alquileres-goyoneche">Goyoneche</Label>
              <Checkbox
                id="alquileres-santaMarta"
                name="alquileres-santaMarta"
                checked={modules.alquileres.santaMarta}
                onChange={() => handleModuleChange('alquileres', 'santaMarta')}
              />
              <Label htmlFor="alquileres-santaMarta">Santa Marta</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;