import { LoaderFunctionArgs } from "react-router";
import TodoItem from "@/feature/todo/TodoItem";
import { getTodoLoader } from "@/feature/todo/store/todoApiSlice";

export default function ItemPage() {
  return <TodoItem />;
}

export function itemApiLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  return getTodoLoader({ todoId: id! });
}
