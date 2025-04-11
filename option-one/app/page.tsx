"use client"

import { useState } from "react";
import { Item, initialItems } from  "@/data/item"

export default function ItemSorterPage() {
  const [mainList, setMainList] = useState<Item[]>(initialItems);

  const [fruitList, setFruitList] = useState<Item[]>([]);
  const [vegetableList, setVegetableList] = useState<Item[]>([]);

  const timers: { [key: string]: NodeJS.Timeout } = {};

  const moveToType = (item: Item) => {
    setMainList((prev) => prev.filter((i) => i.name !== item.name));
    if (item.type === "Fruit") setFruitList((prev) => [...prev, item]);
    else setVegetableList((prev) => [...prev, item]);

    timers[item.name] = setTimeout(() => {
      removeFromType(item);
    }, 5000);
  };

  const removeFromType = (item: Item) => {
    if (item.type === "Fruit")
      setFruitList((prev) => prev.filter((i) => i.name !== item.name));
    else
      setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
  
    setMainList((prev) => {
      const exists = prev.find((i) => i.name === item.name);
      return exists ? prev : [...prev, item];
    });
  
    if (timers[item.name]) {
      clearTimeout(timers[item.name]);
      delete timers[item.name];
    }
  };

  return (
    <main className="grid grid-cols-3 gap-4 p-8 min-h-screen w-full">
      <div className="space-y-2">
        {mainList.map((item) => (
          <button
            key={`${item.type}-${item.name}`}              
            onClick={() => moveToType(item)}
            className="w-full border rounded p-2 transition duration-300 ease-in-out hover:bg-gray-100 hover:scale-105"
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="border rounded-xl p-4 shadow-md bg-white">
          <h2 className="text-xl font-semibold text-center mb-4 border-b pb-2">Fruit</h2>
          <div className="space-y-2">
            {fruitList.map((item) => (
              <div
                key={`${item.type}-${item.name}`}              
                onClick={() => removeFromType(item)}
                className="border rounded p-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-green-100 hover:scale-105"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-xl p-4 shadow-md bg-white">
          <h2 className="text-xl font-semibold text-center mb-4 border-b pb-2">Vegetable</h2>
          <div className="space-y-2">
            {vegetableList.map((item) => (
              <div
                key={`${item.type}-${item.name}`}              
                onClick={() => removeFromType(item)}
                className="border rounded p-2 cursor-pointer transition duration-300 ease-in-out transform hover:bg-yellow-100 hover:scale-105"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
    </main>
  );
}