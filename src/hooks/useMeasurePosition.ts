import { useEffect, useRef } from "react";

export interface UpdateProps {
  height: number;
  top: number;
}

export function useMeasurePosition(update: (data: UpdateProps) => void): React.MutableRefObject<any> {
  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref: any = useRef();

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    const current = ref.current as { offsetHeight: number; offsetTop: number };
    update({
      height: current.offsetHeight,
      top: current.offsetTop,
    });
  });

  return ref;
}
