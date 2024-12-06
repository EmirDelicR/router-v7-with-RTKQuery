import { LoaderFunctionArgs, useNavigation } from "react-router";
import TodoList from "@/feature/todo/TodoList";
import { getPaginatedTodosLoader } from "@/feature/todo/store/todoApiSlice";

export default function WorkPage() {
  return <TodoList />;
}

export function itemsLoader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page");
  return getPaginatedTodosLoader({ page: Number(page || 1) });
}
