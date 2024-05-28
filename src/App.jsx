import { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import List from "./components/List";

const App = () => {
  const [lists, setLists] = useState([
    { id: "1", title: "To do", cards: [] },
    { id: "2", title: "Doing", cards: [] },
    { id: "3", title: "End", cards: [] },
  ]);
  const [editingListId, setEditingListId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [editingCardId, setEditingCardId] = useState(null);
  const [newCardText, setNewCardText] = useState("");

  const addList = useCallback(() => {
    const newList = { id: Date.now().toString(), title: "New List", cards: [] };
    setLists((prevLists) => [...prevLists, newList]);
    setEditingListId(newList.id);
    setNewTitle(newList.title);
  }, []);

  const addCard = useCallback((listId) => {
    const text = prompt("Enter card text:");
    if (text) {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? {
                ...list,
                cards: [...list.cards, { id: Date.now().toString(), text }],
              }
            : list
        )
      );
    }
  }, []);

  const moveCard = useCallback(
    (cardId, sourceListId, destinationListId, destinationIndex) => {
      setLists((prevLists) => {
        const sourceListIndex = prevLists.findIndex(
          (list) => list.id === sourceListId
        );
        const destinationListIndex = prevLists.findIndex(
          (list) => list.id === destinationListId
        );

        if (sourceListIndex === -1 || destinationListIndex === -1) {
          console.error("List not found");
          return prevLists;
        }

        const sourceList = prevLists[sourceListIndex];
        const destinationList = prevLists[destinationListIndex];

        const cardIndex = sourceList.cards.findIndex(
          (card) => card.id === cardId
        );
        if (cardIndex === -1) {
          console.error("Card not found in source list");
          return prevLists;
        }

        const [movedCard] = sourceList.cards.splice(cardIndex, 1);
        destinationList.cards.splice(destinationIndex, 0, movedCard);

        const updatedLists = [...prevLists];
        updatedLists[sourceListIndex] = { ...sourceList };
        updatedLists[destinationListIndex] = { ...destinationList };

        return updatedLists;
      });
    },
    []
  );

  const handleTitleChange = useCallback((e) => {
    setNewTitle(e.target.value);
  }, []);

  const handleTitleBlur = useCallback(
    (listId) => {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId ? { ...list, title: newTitle } : list
        )
      );
      setEditingListId(null);
      setNewTitle("");
    },
    [newTitle]
  );

  const handleTitleKeyDown = useCallback(
    (e, listId) => {
      if (e.key === "Enter") {
        handleTitleBlur(listId);
      }
    },
    [handleTitleBlur]
  );

  const handleCardTextChange = useCallback((e) => {
    setNewCardText(e.target.value);
  }, []);

  const handleCardTextBlur = useCallback(
    (listId, cardId) => {
      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? {
                ...list,
                cards: list.cards.map((card) =>
                  card.id === cardId ? { ...card, text: newCardText } : card
                ),
              }
            : list
        )
      );
      setEditingCardId(null);
      setNewCardText("");
    },
    [newCardText]
  );

  const handleCardTextKeyDown = useCallback(
    (e, listId, cardId) => {
      if (e.key === "Enter") {
        handleCardTextBlur(listId, cardId);
      }
    },
    [handleCardTextBlur]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-wrap p-4">
        {lists.map((list) => (
          <List
            key={list.id}
            list={list}
            addCard={addCard}
            moveCard={moveCard}
            editingListId={editingListId}
            setEditingListId={setEditingListId}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            handleTitleChange={handleTitleChange}
            handleTitleBlur={handleTitleBlur}
            handleTitleKeyDown={handleTitleKeyDown}
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
          className="bg-blue-500 text-white rounded p-4 cursor-pointer"
          onClick={addList}
        >
          + Add another list
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
