import React, { memo } from "react";
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
  return (
    <div className="bg-white rounded shadow p-4 m-2 w-64">
      {editingListId === list.id ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={() => handleTitleBlur(list.id)}
          onKeyDown={(e) => handleTitleKeyDown(e, list.id)}
          autoFocus
          className="font-bold text-lg mb-4 w-full p-1 border"
        />
      ) : (
        <h2
          className="font-bold text-lg mb-4 cursor-pointer"
          onClick={() => {
            setEditingListId(list.id);
            setNewTitle(list.title);
          }}
        >
          {list.title}
        </h2>
      )}
      {list.cards.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          index={index}
          listId={list.id}
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
      <div
        className="bg-gray-200 p-2 rounded mt-2 cursor-pointer"
        onClick={() => addCard(list.id)}
      >
        + Add a card
      </div>
    </div>
  );
};

export default memo(List);
