import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "./store/store";
import {
  addTodo,
  removeTodo,
  toggleTodo,
  editTodo,
  setFilter,
  type Filter,
  loadFromLocalStorage,
} from "./store/slice/todo";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/ui/button";
import { Modal } from "./components/ui/modal";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const filter = useSelector((state: RootState) => state.todo.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

    const openAddModal = () => {
    setEditingId(null);
    setInputValue("");
    setModalOpen(true);
  };

  const openEditModal = (id: string, currentTitle: string) => {
    setEditingId(id);
    setInputValue(currentTitle);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;
    if (editingId) {
      dispatch(editTodo({ id: editingId, title: inputValue }));
    } else {
      dispatch(addTodo(inputValue));
    }
    setModalOpen(false);
  };


  const filteredTodos =
    filter === "all"
      ? todos
      : todos.filter((t) => (filter === "completed" ? t.completed : !t.completed));

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <div className="flex justify-between mb-4">
        <Button onClick={openAddModal} size="sm">Thêm</Button>
        <div className="space-x-2">
         {(["all", "completed", "active"] as Filter[]).map((f) => (
            <Button
              key={f}
              onClick={() => dispatch(setFilter(f))}
              variant={filter === f ? "secondary" : "outline"}
              size="sm"
            >
              {f === "all" ? "Tất cả" : f === "completed" ? "Đã hoàn thành" : "Đang xử lý"}
            </Button>
          ))}
        </div>
      </div>

      <ul className="space-y-2">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white p-3 rounded shadow flex justify-between items-center"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
                     >
                  {todo.title}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                variant="default"
                 onClick={() => openEditModal(todo.id, todo.title)}
              >Sửa</Button>
              <Button
                onClick={() => dispatch(removeTodo(todo.id))}
                variant="destructive"
              >
                Xóa
              </Button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
       <Modal
        open={isModalOpen}
        onOpenChange={setModalOpen}
        title={editingId ? "Chỉnh sửa việc" : "Thêm việc mới"}
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
