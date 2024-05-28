import React from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";

const List = ({
  list,
  addCard,
  moveCard,
  editingListId,
  setEditingListId,
  newTitle,
  setNewTitle,
  handleTitleChange,
  handleTitleBlur,
  handleTitleKeyDown,
  editingCardId,
  setEditingCardId,
  newCardText,
  setNewCardText,
  handleCardTextChange,
  handleCardTextBlur,
  handleCardTextKeyDown,
}) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        moveCard(item.cardId, item.listId, list.id, item.index);
      }
    },
  });

  return (
    <div ref={drop} className="bg-gray-200 rounded p-4 m-2 w-64">
      {editingListId === list.id ? (
        <input
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={() => handleTitleBlur(list.id)}
          onKeyDown={(e) => handleTitleKeyDown(e, list.id)}
          autoFocus
        />
      ) : (
        <div
          onDoubleClick={() => {
            setEditingListId(list.id);
            setNewTitle(list.title);
          }}
        >
          {list.title}
        </div>
      )}
      {list.cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          listId={list.id}
          index={index}
          moveCard={moveCard}
          editingCardId={editingCardId}
          setEditingCardId={setEditingCardId}
          newCardText={newCardText}
          setNewCardText={setNewCardText}
          handleCardTextChange={handleCardTextChange}
          handleCardTextBlur={handleCardTextBlur}
          handleCardTextKeyDown={handleCardTextKeyDown}
        />
      ))}
      <div onClick={() => addCard(list.id)} className="mt-2 cursor-pointer">
        + Add another card
      </div>
    </div>
  );
};

export default List;
