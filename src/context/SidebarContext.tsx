import { createContext, useContext, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  toggle: () => {},
  setOpen: () => {},
});

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
