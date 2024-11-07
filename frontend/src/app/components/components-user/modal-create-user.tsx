"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Checkbox from "../ui/checkbox";
import { User } from '@/app/lib/interfaces';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<User, "createdAt" | "updatedAt">) => void; 
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [isAdmin, setIsAdmin] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const formData: Record<string, unknown> = Object.fromEntries(data.entries());

    formData.isadmin = isAdmin;
    formData.modules = JSON.parse(formData.modules as string);
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
            <Label htmlFor="modules">Módulos</Label>
            <Input id="modules" name="modules" type="hidden" value={JSON.stringify({
              ventas: { access: false, reposteria: false, manualidades: false },
              alquiler: { access: false, santaCatalina: false, santaTeresa: false, goyoneche: false },
              monasterio: { access: false },
              museo: { access: false },
              administrador: { access: false, reposteria: false, manualidades: false, misa: false }
            })} />
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
