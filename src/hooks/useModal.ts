import { useState } from "react";

export interface ModalContextProps<T = any> {
  visible: boolean;
  data: T;
  set: (args: T) => void;
  clear: () => void;
  open: (args?: T) => void;
  close: () => void;
}

const useModal = <T = any>(): ModalContextProps => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<T>();

  const open = (args?: T) => {
    setVisible(true);
    if (args) {
      setData(args);
    }
  }
  const close = () => {
    setVisible(false);
    clear();
  };
  const clear = () => setData(undefined);
  const set =  (args: T) => setData(args);

  return {
    visible,
    open,
    close,
    data,
    clear,
    set,
  };
};

export default useModal;
