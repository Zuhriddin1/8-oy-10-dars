import React, { memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemType } from "../constants/itemType";

const Card = ({
  card,
  index,
  listId,
  moveCard,
  editingCardId,
  setEditingCardId,
  newCardText,
  setNewCardText,
  handleCardTextChange,
  handleCardTextBlur,
  handleCardTextKeyDown,
}) => {
  const [, drag] = useDrag({
    type: ItemType.CARD,
    item: { id: card.id, listId, index },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.listId !== item.listId) {
        moveCard(item.id, item.listId, dropResult.listId, dropResult.index);
      }
    },
  });
  const [, drop] = useDrop({
    accept: ItemType.CARD,
    drop: () => ({
      listId,
      index,
    }),
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="bg-gray-100 p-2 rounded mt-2 shadow"
    >
      {editingCardId === card.id ? (
        <input
          type="text"
          value={newCardText}
          onChange={handleCardTextChange}
          onBlur={() => handleCardTextBlur(listId, card.id)}
          onKeyDown={(e) => handleCardTextKeyDown(e, listId, card.id)}
          autoFocus
          className="w-full p-1 border"
        />
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => {
            setEditingCardId(card.id);
            setNewCardText(card.text);
          }}
        >
          {card.text}
        </div>
      )}
    </div>
  );
};
export default memo(Card);
