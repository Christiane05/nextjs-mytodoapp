import { Dispatch, SetStateAction } from "react";
import { Task } from "@/lib/type";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateTaskPositions } from "@/lib/queries";
import {  useState } from "react";
//import {setDescription , description} from "@/app/tasks/page";
import { Pencil, CheckCircle, XCircle, Trash2, MessageCircleMore } from "lucide-react";

interface Props {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
  handleStatusChange: (id: string, newStatus: boolean) => void;
  handleDelete: (id: string) => void;
  setRefreshPosition: Dispatch<SetStateAction<number>>;
  handleEditTask: (id: string, newDescription: string) => void;
  editingTaskId: string | null;
  setEditingTaskId: Dispatch<SetStateAction<string | null>>;
  newDescription: string;
  setNewDescription: Dispatch<SetStateAction<string>>;
}

function SortableTask({
  task,
  handleStatusChange,
  handleDelete,
  handleEditTask,
  editingTaskId,
  setEditingTaskId,
  newDescription,
  setNewDescription,
}: {
  task: Task;
  handleStatusChange: (id: string, newStatus: boolean) => void;
  handleDelete: (id: string) => void;
  handleEditTask: (id: string, newDescription: string) => void;
  editingTaskId: string | null;
  setEditingTaskId: Dispatch<SetStateAction<string | null>>;
  newDescription: string;
  setNewDescription: Dispatch<SetStateAction<string>>;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isEditing = editingTaskId === task.id;

  return (
    <div className="grid grid-flow-row-dense grid-cols-4">
      <div
        ref={setNodeRef}
        style={style}
        {...(isEditing ? {} : { ...attributes, ...listeners })}
        className="col-span-3 rounded transition-all hover:bg-muted bg-card text-card-foreground border border-border"
      >
        {isEditing ? (
          <div className="w-full p-1">
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEditTask(task.id, newDescription);
                  setEditingTaskId(null);
                }
              }}
              onBlur={() => {
                handleEditTask(task.id, newDescription);
                setEditingTaskId(null);
              }}
              className="w-full border border-border bg-background text-foreground  focus:ring-primary rounded-md focus:ring-2 "
              autoFocus
            />
          </div>
        ) : (
          <div className="flex justify-between items-center p-2 cursor-move">
            <span>{task.description}</span>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => handleStatusChange(task.id, !task.status)}
          className="focus:outline-none"
        >
          {task.status ? <CheckCircle className="w-6 h-6 ml-1 mr-1 mt-1 text-green-500" /> : <XCircle className="w-6 h-6 ml-1 mr-1 mt-1 text-red-500" />}
        </button>
        {isEditing ? (
          <button
            onClick={() => {
              handleEditTask(task.id, newDescription);
              setEditingTaskId(null);
            }}
          >
            <MessageCircleMore className= "w-6 h-6 ml-1 mr-1 mt-1 text-blue-500"/>
          </button>
        ) : (
          <button
            onClick={() => {
              setEditingTaskId(task.id);
              setNewDescription(task.description);
            }}
          >
             <Pencil className="w-6 h-6 ml-1 mr-1 mt-1 text-blue-500" />
          </button>
        )}
        <button
          onClick={() => handleDelete(task.id)}
          className="focus:outline-none"
        >
          <Trash2 className="w-6 h-6 ml-1 mr-1 mt-1 text-muted-foreground"/>
        </button>
      </div>
    </div>
  );
}

export default function TestDragAndDrop({
  tasks,
  setTasks,
  handleStatusChange,
  handleDelete,
  setRefreshPosition,
  handleEditTask,
  editingTaskId,
  setEditingTaskId,
  newDescription,
  setNewDescription,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTasks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newTasks = arrayMove(items, oldIndex, newIndex);

        updateTaskPositions(newTasks).catch(console.error);

        return newTasks;
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-2">
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              handleStatusChange={handleStatusChange}
              handleDelete={handleDelete}
              handleEditTask={handleEditTask}
              editingTaskId={editingTaskId}
              setEditingTaskId={setEditingTaskId}
              newDescription={newDescription}
              setNewDescription={setNewDescription}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}