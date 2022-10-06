import { useState } from "react";
import { motion } from "framer-motion";
import { UpdateProps, useMeasurePosition } from "src/hooks/useMeasurePosition";
import { usePositionReorder } from "src/hooks/usePositionReorder";

interface DragAndReorderProps {}
interface ItemProps {
  i:number; 
  height:number; 
  updatePosition:(i:number, pos:UpdateProps) => void;
  updateOrder: (i:number, pos:any) => void;
}

const items = [60, 80, 120, 40];

const Item: React.FC<ItemProps> = ({ i, height, updatePosition, updateOrder }) => {
  const [isDragging, setDragging] = useState(false);

  const ref = useMeasurePosition((pos) => updatePosition(i, pos) as any);
  return ( <li
    style={{
      padding: 0,
      height,
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      zIndex: isDragging ? 3 : 1
    }}
  >
    <motion.div
      ref={ref}
      layout
      initial={false}
      style={{
        background: "red",
        width: "120px",
        borderRadius: 5,
        zIndex: isDragging ? 3 : 1,
        height: 40,
        padding: "12px",
        margin: 3
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 3px 3px rgba(0,0,0,0.15)"
      }}
      whileTap={{
        scale: 1.12,
        boxShadow: "0px 5px 5px rgba(0,0,0,0.1)"
      }}
      drag="y"
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      // onViewportBoxUpdate={(viewportBox, _) => {
      //   isDragging && updateOrder(i, viewportBox);
      // }}
    />
  </li> );
}

const DragAndReorder: React.FC<DragAndReorderProps> = () => {
  const {order, updatePosition, updateOrder} = usePositionReorder(items);
  return (
    <ul>
      {order.map((height, i) => (
        <Item
          key={height}
          height={height}
          i={i}
          updatePosition={updatePosition}
          updateOrder={updateOrder}
        />
      ))}
    </ul>
  );
};


 


export default DragAndReorder;
